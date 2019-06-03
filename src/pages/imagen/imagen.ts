import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {
  imagen;
  tipo;
  anchoc;
  anchot;
  latitud=0;
  longitud=0;
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private geolocation: Geolocation) {
    this.imagen = this.navParams.get('imagen');
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }
  subirimagen(){
    let loading = this.loading.create({
      content: "Subiendo Imagen..."
    })
    loading.present();

    let imagen = {
      tipo: this.tipo,
      anchoc: this.anchoc,
      anchot: this.anchot,
      url:'',
      user: this.user.uid,
      latitud: this.latitud,
      longitud: this.longitud

    };

    this.db.collection('imagenes').add(imagen)
    .then(ref => {
      let imagennombre = ref.id;
      let uploadtask = this.storage.ref('imagenes/'+ imagennombre).putString(this.imagen, 'data_url');

    uploadtask.then(out => {
      loading.dismiss();
      let url = out.downloadURL;
      ref.update({url:url});
      this.navCtrl.pop();
      
    })
    .catch(error=>{
      console.log('error al subir la imagen')
    });
    })

    
  }

}
