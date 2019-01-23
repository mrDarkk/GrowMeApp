import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuard implements CanActivate {
  constructor(private loggingService: LoggingService, private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController, private navController: NavController) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loggingService.log(this.authService.angularFireAuth.auth.currentUser);
    // return this.authService.angularFireAuth.auth.currentUser != null;
    return true;
  }
}
