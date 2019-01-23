import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomeService } from './services/resolvers/home/home.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private homeService: HomeService,
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.initializeApp();
    homeService.getAppPages().subscribe(data => {
      this.appPages = data;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logOut() {
    this.userService.logout();
  }
}
