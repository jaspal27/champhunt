import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { FirebaseAuthenticationService } from './services/firebase/firebase-authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
   
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public FirebaseAuthenticationProvider: FirebaseAuthenticationService
   
  ) {
    //firebase.initializeApp(environment.firebase);
    this.router.navigate(['login']);
   // this.router.navigate(['tabs']);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
