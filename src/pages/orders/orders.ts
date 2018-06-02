import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';
import { OrderDetailPage } from '../order-detail/order-detail';

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
  id_user :string;
  status_list="pending";
  status:Number = 0;
  next_btn=["Paid","Packing","complete"];  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,    
    public storage:Storage,   
    public loadingCtrl:LoadingController,
    public httpNavtive:HttpNativeProvider) {
    // Let's populate this page with some filler content for funzies
    storage.get('id_user').then((val) => {
      this.id_user=val;
      this.orderlist(0);
    });
  }
  orderlist(id){
    this.status=id;
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'http://api.nextobe.co.th/orders/getOrders/'+id;
    let postParams = {'id_user':this.id_user};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      this.orders = [];
      if (data.orders.length > 0){
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
      }
      loader.dismiss();
    });
  }
  orderDatail(item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(OrderDetailPage, {
      id_order: item.id_order
    });
  }
  pushNewOrder(){
    this.navCtrl.push(NewOrderPage);
  }
  passnextlevel(item){
    if(confirm('are you sure?')){
      let loader = this.loadingCtrl.create({
        content: "Loading"
      });
      loader.present();
      let url = 'http://api.nextobe.co.th/orders/nextlevel/';
      let postParams = {'id_user':this.id_user,
      'id_order':item.id_order
    };
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // alert(data);
        this.orderlist(this.status);
        loader.dismiss();
      });
    }
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
