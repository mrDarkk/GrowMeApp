import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsersService } from '../../users.service';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoggingService } from '../../logging.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  appPageService = new Subject();
  public defaultPages = [{
    title: 'Home',
    url: '/home',
    icon: 'home'
  },
  // {
  //   title: 'List',
  //   url: '/list',
  //   icon: 'list'
  // }
  ];
  public unAuthorizedPageUsers = [
    {
      title: "Register",
      url: '/register',
      icon: 'person-add'
    },
    {
      title: "Login",
      url: '/login',
      icon: 'contact'
    }
  ];
  authorizedUserPages = [
    {
      title: "Profile",
      url: '/personal/profile',
      icon: 'contact'
    },
    {
      title: "Coupons",
      url: '/personal/coupons',
      icon: 'card'
    },
    {
      title: "Subscriptions",
      url: '/personal/managesubscription',
      icon: 'briefcase'
    }];
  public businessUser = [{
    title: "Business Profile",
    url: '/business/profile',
    icon: 'business'
  },
  {
    title: "Discount",
    url: '/business/coupons',
    icon: 'card'
  },
  {
    title: "Refer & Earn",
    url: '/referandearn',
    icon: 'share'
  }
  ];
  constructor(private loggingService: LoggingService, private angularFireAuth: AngularFireAuth, private authService: AuthService, private angularFireStore: AngularFirestore, private userService: UsersService) {
    this.onAuthChange();
  }
  user = null;
  onAuthChange() {
    this.angularFireAuth.authState.subscribe(user => {
      this.user = user;
      this.onSecurityChange();
      if (user == null) {
        this.appPageService.next(this.defaultPages.concat(this.unAuthorizedPageUsers));
      } else {
        this.getUserClaims(user);
      }
    })
  }

  getUserClaims(user) {
    let roles = null;
    let appPages = this.defaultPages;
    user.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims.Roles) {
        roles = idTokenResult.claims.Roles;
        this.loggingService.log(roles);
      }
      if (roles != null) {
        roles.forEach(function (role) {
          switch (role) {
            case "EndUser":
              //authorized users
              appPages = appPages.concat(this.authorizedUserPages);
              break;
            case "CouponBusinessUser":
              appPages = appPages.concat(this.businessUser);
              break;
          }
        }, this);
      }
      this.appPageService.next(appPages);
    })
  }
  getAppPages() {
    return this.appPageService;
  }
  onSecurityChange() {
    if (this.user != null) {
      let id = this.user.uid;
      this.angularFireStore.doc('metadata/' + id).snapshotChanges().subscribe(data => {
        this.authService.angularFireAuth.auth.currentUser.getIdToken(true).then(() => {
          this.getUserClaims(this.authService.angularFireAuth.auth.currentUser);
        }).catch(error => {
          this.loggingService.log(error);
        })
      });
    }
  }
}