import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Firebase
import { AngularFireModule } from '@angular/fire';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InscripcionPage } from '../pages/inscripcion/inscripcion';
import { ChangeStateProvider } from '../providers/change-state/change-state';
import { InitNavigateProvider } from '../providers/init-navigate/init-navigate';
import { ConnectProvider } from '../providers/connect/connect';
import { ChangeWayProvider } from '../providers/change-way/change-way';
import { AngularFireProvider } from '../providers/angular-fire/angular-fire';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDaRTTHOVxs0RwAw9baRO6_6JSGiipTQu8",
  authDomain: "coletto-app.firebaseapp.com",
  databaseURL: "https://coletto-app.firebaseio.com",
  projectId: "coletto-app",
  storageBucket: "coletto-app.appspot.com",
  messagingSenderId: "953525692835",
  appId: "1:953525692835:web:985b4ab468d89643c0d216"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    InscripcionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InscripcionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectProvider,
    InitNavigateProvider,
    ChangeStateProvider,
    ChangeWayProvider,
    AngularFireProvider
  ]
})
export class AppModule {}
