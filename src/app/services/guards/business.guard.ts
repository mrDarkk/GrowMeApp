import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  constructor(private loggingService: LoggingService, private alertController: AlertController, private navController: NavController, private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let flag = false;
    if (this.authService.angularFireAuth.auth.currentUser != null) {
      flag = false;
    }

    this.loggingService.log("BusinessGuard ", flag);
    if (!flag) {
      this.alertController.create({
        header: 'Permission Denied!',
        buttons: ['OK']
      }).then(alert => alert.present());
      // this.navController.goBack();
    }
    return flag;
  }
}
