import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { HomeService } from '../../services/resolvers/home/home.service';
import { NavController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginMethod = 'email';
  user: User = {
    ConfirmPassword: null,
    Email: null,
    FullName: null,
    IsActive: null,
    Password: null,
    PhoneNumber: null,
    Pincode: null
  };
  error = '';
  prefix = "+91";
  phoneNumber = '';
  verificationCode = '';
  confirmationResult = null;

  constructor(private loggingService: LoggingService, private platform: Platform, private router: Router, private homeService: HomeService, private googlePlus: GooglePlus, private authService: AuthService) { }
  ngOnInit() {
    this.authService.angularFireAuth.authState.subscribe(user => {
      if (user != null) {
        this.router.navigateByUrl("\home");
      }
    })
  }
  login() {
    this.authService.signInWithEmailAndPassword(this.user.Email, this.user.Password, this.onSucess, this.onError);
  }
  onSucess(data, navController) {
    // navController.navigateRoot('home');
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle(this.platform, this.onSucess, this.onError);
  }
  onError(error) {
    this.loggingService.log(error);
  }
  logout() {
    this.authService.logout();
  }

  async sendOTP() {
    // this.authService.angularFireAuth.auth.settings.appVerificationDisabledForTesting = true;
    var recaptcha = new auth.RecaptchaVerifier('recaptcha-container');
    // recaptcha.render();
    this.authService.signInWithPhoneNumber(this.prefix, this.user.PhoneNumber, recaptcha).then(confirmationResult => {
      this.confirmationResult = confirmationResult;
    }).catch(e => this.loggingService.log(e));
  }
  async verifyNumber() {
    this.authService.verifyNumber(this.confirmationResult, this.verificationCode, function (data, navController) {
      // navController.navigateRoot('home');
    }, this.onError);
  }

  resendOTP() {
    this.confirmationResult = null;
    this.sendOTP();
  }
}
