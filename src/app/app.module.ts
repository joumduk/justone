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
import { ReportPeriodPage } from '../pages/report-period/report-period';
import { NewProductPage } from '../pages/new-product/new-product';
import { SelectProductPage } from '../pages/select-product/select-product';
import { DetailPage } from '../pages/detail/detail';
import { NewOrderPage }from '../pages/new-order/new-order';
import { OrderDetailPage }from '../pages/order-detail/order-detail';
import { AddShippingPage }from '../pages/add-shipping/add-shipping';
import { NewPostPage } from '../pages/new-post/new-post';

import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Diagnostic } from '@ionic-native/diagnostic';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    OrdersPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    NewProductPage,
    SelectProductPage,
    OrderDetailPage,
    ReportPeriodPage,
    NewPostPage,
    AddShippingPage,
    NewOrderPage,
    ReportPage,
    DetailPage
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
    SelectProductPage,
    SignupPage,
    NewProductPage,
    AddShippingPage,
    NewPostPage,
    NewOrderPage,
    OrderDetailPage,
    ReportPeriodPage,
    ReportPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    HTTP,
    SplashScreen,
    File,
    Diagnostic,
    SocialSharing,
    PhotoLibrary,
    Camera,
    FileTransfer,
    Clipboard,
    InAppBrowser,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpNativeProvider
  ]
})
export class AppModule {}
