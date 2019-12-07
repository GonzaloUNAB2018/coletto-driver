import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { InscripcionPage } from '../inscripcion/inscripcion';
import { ConnectProvider } from '../../providers/connect/connect';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private connect: ConnectProvider
  ) {

    
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(user => {
      if(user){
        let uid = this.afAuth.auth.currentUser.uid
        this.connect.toConnect(uid, this.user);
        this.navCtrl.setRoot(HomePage);
      }
    })
    .catch(e=>{
      console.log(e);
      if(e.code === 'auth/user-not-found'){
        alert('Usuario no encontrado, registrese o verifique las credenciales ingresadas.')
      }
    });
  }

  goToSignup(){
    this.navCtrl.push(InscripcionPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        let uid = this.afAuth.auth.currentUser.uid
        this.connect.toConnect(uid, this.user);
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

}
