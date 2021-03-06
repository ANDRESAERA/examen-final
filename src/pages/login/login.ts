import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import 'firebase/auth'
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  home = HomePage;
  password= '';
  auth: firebase.auth.Auth;
  email='';
  registro = RegistroPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtr: AlertController) {
    this.auth = firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    console.log(this.email, this.password);
    //this.navCtrl.push(this.home);
    this.auth.signInWithEmailAndPassword(this.email,this.password)
    .then(data=> {
      this.navCtrl.setRoot(this.home);

    })
    .catch(error => {

    let alert = this.alertCtr.create({
      title: "Error",
      subTitle: error.message,
      buttons: ['OK']
    })
    alert.present();

    });
  }

  regis(){
    this.navCtrl.push(this.registro);
  }

}
