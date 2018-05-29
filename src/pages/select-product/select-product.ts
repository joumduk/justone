import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewOrderPage } from '../new-order/new-order';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SelectProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-product',
  templateUrl: 'select-product.html',
})
export class SelectProductPage {
  items = Array<Product>();

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public storage:Storage,   
    public httpNavtive:HttpNativeProvider) {
    storage.get('id_user').then((val) => {
      let url = 'http://api.nextobe.co.th/products/getproducts';
      let postParams = {'id_user':val};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // alert(data);
        this.items = [];
        for (let e of data.products) {
          this.items.push({
            id:e.id_product,
            name: e.name,
            price: e.description,
            sale_price: e.sale_price,
            image_link: e.image_link
          });
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectProductPage');
  }
  clickItems(item){
    this.navCtrl.push(
      NewOrderPage,{
        item:item
      }
    )
  }

}
export class Product {
  id: string;
  name: string;
  price: Number;
  sale_price: Number;
  image_link:string;
}
