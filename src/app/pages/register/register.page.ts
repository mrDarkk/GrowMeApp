import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase';
import { StaticresourcesService } from '../../services/staticresources.service';
import { LoggingService } from '../../services/logging.service';
import { Gender } from '../../models/business';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loggingService: LoggingService, private authService: AuthService, private navController: NavController, private staticResourceService: StaticresourcesService) {
  }
  confirmationResult = null;
  user: User = {
    ConfirmPassword: null,
    Email: null,
    Pincode: null,
    IsActive: null,
    FullName: null,
    Password: null,
    PhoneNumber: null
  };
  prefix = "+91";
  message = '';
  gender: Gender;
  ngOnInit() {
    this.staticResourceService.getResource("Gender").subscribe(d => {
      this.loggingService.log(d);
      this.gender = d;
    });
  }
  onClick() {
    alert(this.user.DateOfBirth);
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
    this.authService.verifyNumber(this.confirmationResult, this.user.Password, function (data) {
      this.loggingService.log('logged in sucessfully...');
      this.loggingService.log(data);
    }, function (error) {
      this.loggingService.log(error);
    });
  }

  GetDateOfBirth() {

  }
}