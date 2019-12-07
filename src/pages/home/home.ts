import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { ConnectProvider } from '../../providers/connect/connect';
import { InitNavigateProvider } from '../../providers/init-navigate/init-navigate';
import { ChangeStateProvider } from '../../providers/change-state/change-state';
import { ChangeWayProvider } from '../../providers/change-way/change-way';
import { AngularFireDatabase } from '@angular/fire/database';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  background: string;
  contentEle: any;
  textEle: any;
  nickname : any = null;
  connected: boolean = false;
  navigated: boolean = false;
  uid: any;
  user = {} as User;
  fbUser = this.afAuth.auth.currentUser
  way : boolean = true;
  ref : any;
  public name : any = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public connect: ConnectProvider,
    public navigate: InitNavigateProvider,
    public chState: ChangeStateProvider,
    public chWay: ChangeWayProvider,
    public viewCtrl: ViewController,
    public afDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    private afProvider: AngularFireProvider
    ) {

      
      //this.connected = this.connect.connectState;
      //this.navigated = this.navigate.navigateState;
      //this.uid = this.fbUser.uid;
      //this.way = this.chWay.wayState;

  }

  /*logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
    });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //this.connect.toDiscconect(this.uid, this.user);
    /*this.navigate.toStopNavigate();
    this.chWay.toWayOne();
    this.ref = this.afProvider.actualiceData(this.uid);
    this.afProvider.getUserData(this.uid).valueChanges().subscribe(usr=>{
      let user: any = usr
      if(user){
        this.name = user.name;
      };
    });*/
  };

  selectWayOne(){
    //this.chWay.toWayOne();
    //this.viewCtrl.dismiss();
    this.way=true;
    const toast = this.toastCtrl.create({
      message: 'Dirección de servicio Plan - Cerro',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();

    console.log(this.way)
  };

  selectWayCero(){
    //this.chWay.toWayCero();
    //this.viewCtrl.dismiss();
    this.way=false;
    const toast = this.toastCtrl.create({
      message: 'Dirección de servicio Cerro - Plan',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log(this.way)

  };

  logout(){
    this.nickname = this.fbUser.displayName;
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
      console.log('Chofer',this.nickname,'ha cerrado sesión');
      //this.toDisconnectUser();
      this.stopNav();
      this.user.sesion = 0;
      this.afDb.object('Choferes/'+this.uid).update(this.user);
    }).catch(error =>{
      console.log('Error de cierre de sesión');
    })
  }

  toConnectUser(){
    this.connect.toConnect(this.uid, this.user);
    this.connected=true;
    console.log(this.connected)
    //this.viewCtrl.dismiss();
    //this.chState.resolveState();
  }

  toDisconnectUser(){
    this.connect.toDiscconect(this.uid, this.user);
    this.connected=false;
    console.log(this.connected)
    //this.viewCtrl.dismiss();
    //this.chState.resolveState();
  }

  initNav(){
    this.navigate.toNavigate();
    this.navigated = true;
    //this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

  stopNav(){
    this.navigate.toStopNavigate();
    this.navigated = false;
    //this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

}
