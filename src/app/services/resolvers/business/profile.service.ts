import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<any>{
  constructor(private loadingController: LoadingController) { }
  resolve(route: ActivatedRouteSnapshot) {
    let loading: HTMLIonLoadingElement;

    this.loadingController.create({
      message: 'Loading...'
    }).then(res => {
      loading = res;
      loading.present();
    });

    loading.dismiss();
  }
}
