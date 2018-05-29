import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
 payment:string;
 customer_name:string;
 customer_phone:string;
 customer_social:Number;
 customer_social_id:string;
 address:string;
 
 product_total:Number;
 grand_total:Number;
}