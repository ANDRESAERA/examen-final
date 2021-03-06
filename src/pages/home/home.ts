import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Camera, CameraOptions} from '@ionic-native/camera';
import { ImagenPage } from '../imagen/imagen';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imagen = ImagenPage;
  user: firebase.User;
  db: firebase.firestore.Firestore;

  items = [];

  constructor(public navCtrl: NavController,
              public camera: Camera) {
                this.user = firebase.auth().currentUser;
                this.db = firebase.firestore();

                this.db.collection('imagenes').onSnapshot(query => {
                  this.items = [];
                  query.forEach(imagen => {
                    if(imagen.data().user == this.user.uid){
                      this.items.push(imagen.data());
                    }
                  });
                });
  }
  getpicture(){
    console.log('tomar foto');

    const options: CameraOptions ={
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
    .then(imagen =>{
      console.log('imagen capturada');
      this.navCtrl.push(this.imagen, {imagen:'data:image/jpeg;base64,' + imagen});
    }, error => {
      console.log(JSON.stringify(error));
    })
  }

}
