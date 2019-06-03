import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
export const config = {

  apiKey: "AIzaSyDorc9XvQL3SEd8H_dpN8BoU1l-4zCcemk",
    authDomain: "examen-arbol.firebaseapp.com",
    databaseURL: "https://examen-arbol.firebaseio.com",
    projectId: "examen-arbol",
    storageBucket: "examen-arbol.appspot.com",
    messagingSenderId: "30343418679",
    appId: "1:30343418679:web:f522c68075c269c3"
  };

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

