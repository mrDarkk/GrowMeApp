import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform, NavController } from '@ionic/angular';
import { SubscriptionService } from '../../../services/subscription.service';
import { Subscription, SubscriptionType } from '../../../models/subscription';
import { AuthService } from '../../../services/auth.service';
import { Business } from '../../../models/business';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { BusinessService } from '../../../services/business.service';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-managesubscription',
  templateUrl: './managesubscription.page.html',
  styleUrls: ['./managesubscription.page.scss'],
})
export class ManagesubscriptionPage implements OnInit {

  constructor(private loggingService: LoggingService, private businessService: BusinessService, private geolocation: Geolocation, private angularFireStore: AngularFirestore, private navController: NavController, private authService: AuthService, private barcodeScanner: BarcodeScanner, private platform: Platform, private subscriptionService: SubscriptionService) { }
  personalSubscriptions = null;
  ngOnInit() {
    // this.subscriptionService.getPersonalSubscription().then(data => {
    //   this.loggingService.log(data);
    //   this.personalSubscriptions = data;
    // }).catch(e => this.loggingService.log(e));
    this.subscriptionService.getPersonalSubscription().subscribe(data => {
      debugger;
      this.personalSubscriptions = data;
    });
  }

  business: Business = {
    Address: { MapLocation: {} },
    Timings: []
  };

  scanningCompleted: boolean;
  barcodeData = null;
  barCodeText = null;
  scannedCode = null;
  subscriptionDetails: Subscription;
  errorMessage = '';
  scanCode() {
    if (this.platform.is("cordova")) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.barCodeText = barcodeData.text;
        this.loggingService.log('Barcode data', barcodeData);
        if (!barcodeData.cancelled && barcodeData.text != '') {
          this.subscriptionService.getSubscription(barcodeData.text).subscribe(record => this.onDataRecieve(record));
        }
      }).catch(err => {
        this.loggingService.log('Error', err);
      });
    } else {
      this.loggingService.log("Cordova is not available");
      this.loggingService.log(this.barCodeText);
      this.subscriptionService.getSubscription(this.barCodeText).subscribe(record => this.onDataRecieve(record));
    }
  }
  onDataRecieve(record) {
    this.subscriptionDetails = record;
    if (this.subscriptionDetails == null && this.subscriptionDetails == undefined) {
      this.errorMessage = "Record not found";
    } else if (this.subscriptionDetails.By != undefined && this.subscriptionDetails.By != null) {
      this.errorMessage = "Subscription is already in use";
    } else {
      this.errorMessage = '';
    }
    this.loggingService.log(this.errorMessage);
    this.loggingService.log(this.subscriptionDetails);
    if (this.errorMessage == '' && this.subscriptionDetails != null) {
      this.loggingService.log(this.subscriptionDetails.SubscriptionType);
      switch (this.subscriptionDetails.SubscriptionType) {
        case SubscriptionType.BusinessDiscountScheme:
          //update the subscription and ask for business details
          this.scanningCompleted = true;
          this.loggingService.log("BusinessDiscountScheme");
          break;
        case SubscriptionType.DiscountCouponCard:
          //update the subscription record
          // this.subscriptionDetails.Name = Math.random().toString();
          this.subscriptionDetails.By = this.authService.user.uid;
          this.subscriptionService.update(this.barCodeText, this.subscriptionDetails).then(record => {
            // this.navController.navigateRoot("personal/profile");
          });
          this.loggingService.log("Update the subscription");
          break;
      }
    }
    this.loggingService.log(this.subscriptionDetails);
  }
  register() {
    this.businessService.addBusiness(this.business).then(business => {
      this.subscriptionDetails.For = business.path;
      this.subscriptionDetails.By = this.authService.user.uid;
      this.subscriptionService.update(this.barCodeText, this.subscriptionDetails).catch(e => this.loggingService.log(e));
    }).catch(e => this.loggingService.log(e));
    this.loggingService.log(this.business);
    this.loggingService.log(this.barCodeText);
    this.loggingService.log(this.subscriptionDetails);
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.business.Address.MapLocation = {
        Latitude: resp.coords.latitude,
        Longitude: resp.coords.longitude
      }
    }).catch((error) => {
      this.loggingService.log('Error getting location', error);
    });
  }
}
