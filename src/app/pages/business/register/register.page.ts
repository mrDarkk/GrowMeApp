import { Component, OnInit } from '@angular/core';
import { Business } from '../../../models/business';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavParams } from '@ionic/angular';
import { Subscription } from '../../../models/subscription';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loggingService: LoggingService, private geolocation: Geolocation, private navParams: NavParams) {
    this.subscription = navParams.get('subscription');
    this.id = navParams.get('id');
  }
  business: Business = {
    Address: { MapLocation: {} },
    Timings: []
  };
  subscription: Subscription;
  id: string;
  ngOnInit() {
  }
  register() {
    this.loggingService.log(this.business);
    this.loggingService.log(this.id);
    this.loggingService.log(this.subscription);
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
