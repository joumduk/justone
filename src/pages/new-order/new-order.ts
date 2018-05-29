import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
import { OrdersPage } from '../orders/orders';

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {
  items  = new Array<Product>();
  order :Order = new Order();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,public httpNavtive:HttpNativeProvider,
    public storage:Storage
  ) {
    storage.get('id_user').then((val) => {
      this.order.id_user=val
    });
    let parameter=this.navParams.get('item');
    if(parameter){
      let product=new Product();
      product.id=parameter.id_product;
      product.name =parameter.name;
      product.price=parameter.price;
      product.sale_price=parameter.sale_price;
      product.image_link=parameter.image_link;
      this.order.product_total=parameter.sale_price;
      this.order.grand_total=parameter.sale_price;
      this.items.push(product);
    }
    let parameter2=this.navParams.get('comment');
    if(parameter2){
      this.order.customer_name=parameter2.from.name;
      this.order.customer_social=1;
      this.order.customer_social_id=parameter2.from.name;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOrderPage');
  }
  submit(){
    // alert(JSON.stringify(this.product));
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'http://api.nextobe.co.th/orders/newOrder';
      let postParams = {
        'date':this.order.date,
        'id_user':this.order.id_user,
        'payment':this.order.payment,
        'customer_name':this.order.customer_name,
        'customer_phone':this.order.customer_phone,
        'customer_social':this.order.customer_social,
        'customer_social_id':this.order.customer_social_id,
        'address':this.order.address,
        'product_total':this.order.product_total,
        'grand_total':this.order.grand_total,
        'id_product':this.items[0].id,
        'product_name':this.items[0].name,
        'price':this.items[0].price,
        'sale_price':this.items[0].sale_price,
        'quantity':this.items[0].quantity
      };
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        if(data.status ==200){
          // this.navCtrl.push(ProductsPage)
          this.navCtrl.setRoot(OrdersPage);
          
        }
        loader.dismiss();
      });
    }
  change(){
    let price=0;
    this.items.forEach(element => {
      price += Number(element.sale_price) * Number(element.quantity);
    });
    this.order.product_total=price;
    this.order.grand_total=price;
  }
}
export class Product {
  id: string;
  name: string;
  price: Number;
  sale_price: Number;
  image_link:string;
  quantity:Number =1;
}
export class Order{
  date: string;
  id_user:string;
 payment:string = "Bankwire";
 customer_name:string;
 customer_phone:string;
 customer_social:Number=1;
 customer_social_id:string;
 address:string;
 
 product_total:Number;
 grand_total:Number;
}