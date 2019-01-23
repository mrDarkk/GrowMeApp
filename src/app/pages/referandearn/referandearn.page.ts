import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-referandearn',
  templateUrl: './referandearn.page.html',
  styleUrls: ['./referandearn.page.scss'],
})
export class ReferandearnPage  {

  constructor(public navCtrl: NavController) {

  }

  goTo(color) {
    color = color || 'No Color Entered';

    this.navCtrl.goForword(HomePage, {
      data: color
    });
  }

}
