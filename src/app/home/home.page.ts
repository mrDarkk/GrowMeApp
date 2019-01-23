import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { CodePush, SyncStatus } from '@ionic-native/code-push/ngx';
import { AuthService } from '../services/auth.service';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { ActivatedRoute } from '@angular/router';
import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  status = '';
  progressStatus = '';
  color: string;
  businessCollection: Business[];
  constructor(private navParams: NavParams,private businessService: BusinessService, private platform: Platform, private authService: AuthService, private ngZone: NgZone) {
    this.platform.ready().then(() => { });
    this.businessService.getBusinesss().subscribe(d => this.businessCollection = d);
    
    this.color = navParams.get('data');
  }
  
}
