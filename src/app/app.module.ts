import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ProductsPage } from '../pages/products/products';
import { OrdersPage } from '../pages/orders/orders';
import { ReportPage } from '../pages/report/report';
import { NewProductPage } from '../pages/new-product/new-product';

import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Instagram } from '@ionic-native/instagram';


@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    OrdersPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    NewProductPage,
    ReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductsPage,
    OrdersPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    NewProductPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    HTTP,
    SplashScreen,
    File,
    Instagram,
    Camera,
    FileTransfer,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpNativeProvider
  ]
})
export class AppModule {}