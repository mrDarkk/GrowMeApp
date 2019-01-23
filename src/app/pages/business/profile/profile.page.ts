import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { CodePush, SyncStatus } from '@ionic-native/code-push/ngx';
import { AuthService } from '../../../services/auth.service';
import { BusinessService } from '../../../services/business.service';
import { Business } from '../../../models/business';
import { LoggingService } from '../../../services/logging.service';
import { NavController} from '@ionic/angular';
import { HomePage } from '../../../home/home.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
  businessCollection: Business[];
  value: '0';
  
 
  // business: Business = {
  //   Address: { MapLocation: {} },
  //   Timings: []
  // };


 
 
  constructor(public navCtrl: NavController, private businessService: BusinessService, private platform: Platform, private authService: AuthService, private ngZone: NgZone) {
    this.platform.ready().then(() => { });
    this.businessService.getBusinesss().subscribe(d => this.businessCollection = d);
    
    }

    
    
    // async openModal() {
    //   const modal = await this.modalController.create({
    //     component: HomePage,
    //     componentProps: {
    //       custom_id: this.value
    //     }
    //   });
    //   await modal.present();
    // }


  update(){

    
    this.navCtrl.push(HomePage, {
      data: "dsjjfs"
    });

   
      
// this.businessService.addBusiness(this.businessCollection);
 
  //  this.businessService.addBusiness(this.businessCollection,"ENqbOnaMv0rjQGOT6d25");
 
  //console.log(this.businessCollection);
  console.log(this.value);
   //this.businessService.updateBusiness(this.businessCollection);
  }
}
