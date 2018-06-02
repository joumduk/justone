import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';

import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
import { AddShippingPage } from '../add-shipping/add-shipping';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order=new Order();
  items=new Array<Product>();
  shippings=new Array<Shipping>();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,   
    private iab: InAppBrowser,
    public events:Events,
    private clipboard: Clipboard,
    public httpNavtive:HttpNativeProvider) {
     this.calldata();
     this.listenEvents();
  }
  calldata(){
    this.items=[];
    let id = this.navParams.get('id_order');
    let url = 'http://api.nextobe.co.th/orders/getorderdetail';
    let postParams = {'id_order':id};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // // alert(data);
      this.order.id_order = data.order.id_order;
      this.order.date = data.order.date;
      this.order.reference = data.order.reference;
      this.order.payment = data.order.payment;
      this.order.customer_name = data.order.customer_name;
      this.order.customer_phone = data.order.customer_phone;
      this.order.customer_social = data.order.customer_social;
      this.order.customer_social_id = data.order.customer_social_id;
      this.order.address = data.order.address;
      this.order.product_total = data.order.product_total;
      this.order.grand_total = data.order.grand_total;
      if(data.shippings.length>0){
        for (let e of data.items) {
          this.items.push({
            name: e.product_name,
            price: e.price,
            sale_price: e.sale_price,
            image_link: e.image_link,
            quantity: e.quantity
          });
        }
      }
      
      if(data.shippings.length>0){
        for (let e of data.shippings) {
          this.shippings.push({
            delivery: e.name,
            shipping_fee: e.shipping_fee,
            tracking_link:e.link,
            tracking_code:e.tracking_code
          });
        }
      }
    });
  }
  listenEvents(){
    this.events.subscribe('reloadDetails',() => {
      this.calldata();
    });
 }
  openTracking(shipping:Shipping) {
    // Opening a URL and returning an InAppBrowserObject
    let browser = this.iab.create(shipping.tracking_link,'_blank',{location:'no'}); 
    browser.show();
  // Inject scripts, css and more with browser.X
  }
  copytoclipboard(item:Shipping){
    this.clipboard.copy(item.tracking_link+item.tracking_code);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  addshipping(){
    this.navCtrl.push(AddShippingPage,{
      id_order:this.order.id_order
    });
  }

}
export class Shipping{
  delivery:string;
  shipping_fee:Number;
  tracking_link:string;
  tracking_code:string;
}
export class Product {
  name: string;
  price: Number;
  sale_price: Number;
  image_link:string;
  quantity:Number;
}
export class Order{
  id_order:string;
  date: string;
  reference:string;
  payment:string;
  customer_name:string;
  customer_phone:string;
  customer_social:string;
  customer_social_id:string;
  address:string;
  product_total:Number;
  grand_total:Number;
}
