import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,Events } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
/**
 * Generated class for the AddShippingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-shipping',
  templateUrl: 'add-shipping.html',
})
export class AddShippingPage {
  shipping=new Shipping();
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public httpNavtive:HttpNativeProvider,public events:Events) {
    this.shipping.id_order=this.navParams.get('id_order');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingPage');
  }
  submit(){
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'http://api.nextobe.co.th/orders/addShipping';
      let postParams = {
        'id_order':this.shipping.id_order,
        'delivery_option':this.shipping.delivery_option,
        'shipping_fee':this.shipping.shipping_fee,
        'tracking_code':this.shipping.tracking_code
      };
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        if(data.status ==200){
          // this.navCtrl.push(ProductsPage)
          this.events.publish('reloadDetails');
          this.navCtrl.pop();
        }
        loader.dismiss();
      });
  }
}
export class Shipping{
  id_order:string;
  delivery_option:Number=1;
  shipping_fee:Number;
  tracking_code:string;
}