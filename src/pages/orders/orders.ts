import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SelectProductPage } from '../select-product/select-product';

import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders= Array<Order>();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,    
    public storage:Storage,   
    public httpNavtive:HttpNativeProvider) {
    // Let's populate this page with some filler content for funzies
    storage.get('id_user').then((val) => {
      let url = 'http://api.nextobe.co.th/orders/getOrders';
      let postParams = {'id_user':val};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // alert(data);
        this.orders = [];
        for (let e of data.orders) {
          this.orders.push({
            date:e.date,
            id_order: e.id_order,
            reference:e.reference,
            payment: e.payment,
            customer_name: e.customer_name,
            grand_total: e.grand_total
          });
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(OrdersPage, {
      item: item
    });
  }
  pushNewOrder(){
    this.navCtrl.push(SelectProductPage);
  }
}
export class Order{
  date: string;
  id_order:string;
  reference:string;
  payment:string;
  customer_name:string;
  grand_total:Number;
}
