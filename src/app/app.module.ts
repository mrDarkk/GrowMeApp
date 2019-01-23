import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { environment } from '../environments/environment';
// import { CodePush } from '@ionic-native/code-push/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from './services/auth.service';
import { SubscriptionService } from './services/subscription.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GooglePlus,
    Geolocation,
    // CodePush,
    BarcodeScanner,
    AuthService,
    SubscriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
