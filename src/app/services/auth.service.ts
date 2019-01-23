import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public roles: string[];
  constructor(private loggingService: LoggingService, public angularFireAuth: AngularFireAuth, private googlePlus: GooglePlus, private router: Router) {
    this.authStateChange();
  }
  authStateChange() {
    this.angularFireAuth.authState.subscribe(user => {
      this.user = user;
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          let userHasRoles = false;
          if (idTokenResult.claims.Roles) {
            this.loggingService.log(this.roles);
            this.roles = idTokenResult.claims.Roles;
            if (this.roles.length > 0) {
              userHasRoles = true;
            }
          }
          if (userHasRoles) {
            this.router.navigateByUrl('home');
          } else {
            this.router.navigateByUrl("personal/managesubscription");
          }
        });
      } else {
        this.roles = [];
        this.router.navigateByUrl('home');
      }
    })
  }
  signInWithEmailAndPassword(email: string, password: string, resolve, reject) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, email).then(data => {
      this.loggingService.log(data);
      resolve();
    }).catch(error => {
      this.loggingService.log(error);
      reject(error);
    });
  }
  loginWithGoogle(platform, resolve, reject) {
    if (platform.is("cordova")) {
      this.googlePlus.login().then(res => {
        this.loggingService.log(res);
        resolve();
      }).catch(error => {
        this.loggingService.log(error);
        reject(error);
      });
    } else {
      this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
        resolve();
      }).catch(error => {
        reject(error);
      })
    }
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  sendOTP(prefix, phoneNumber, resolve, rejected) {
    this.angularFireAuth.auth.settings.appVerificationDisabledForTesting = true;
    var recaptcha = new auth.RecaptchaVerifier('recaptcha-container');
    recaptcha.render();
    this.angularFireAuth.auth.signInWithPhoneNumber(prefix + phoneNumber, recaptcha).then(confirmationResult => {
      resolve(confirmationResult);
    }).catch(e => {
      rejected(e);
      this.loggingService.log(e)
    });
  }

  signInWithPhoneNumber(prefix, phoneNumber, recaptcha) {
    return this.angularFireAuth.auth.signInWithPhoneNumber(prefix + phoneNumber, recaptcha);
  }

  verifyNumber(confirmationResult: auth.ConfirmationResult, verificationCode: string, resolve, rejected) {
    if (confirmationResult != null) {
      confirmationResult.confirm(verificationCode).catch(e => rejected(e)).then(d => resolve(d));
    } else {
      rejected("Recaptcha not entered");
    }
  }


}
