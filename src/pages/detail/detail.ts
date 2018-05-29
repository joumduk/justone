import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
import { NewOrderPage } from '../new-order/new-order';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item={'id_product' :"",'name':"",'price':0,'sale_price':0,'description':"",'image_link':""};
  facebook={'id':"",'name':"","des":"","date":"","comments":[]}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,   
    public httpNavtive:HttpNativeProvider) {
      let id = this.navParams.get('id');
      let url = 'http://api.nextobe.co.th/products/getproductdetail';
      let postParams = {'id_product':id};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // // alert(data);
        this.item.id_product = data.product.id_product;
        this.item.name = data.product.name;
        this.item.price = data.product.price;
        this.item.sale_price = data.product.sale_price;
        this.item.description = data.product.description;
        this.item.image_link = data.product.image_link;
      });
      let url2 = 'http://api.nextobe.co.th/products/getComments';      
      this.httpNavtive.post(url2, postParams, options).subscribe(data2=> {
        this.facebook.id=data2.media_id;
        this.facebook.date=data2.date;
        this.facebook.name=data2.name;
        this.facebook.comments=data2.comments.data;
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  addNewOrder(){
    this.navCtrl.push(NewOrderPage,{
      item:this.item
    });
  }
  addNewOrderFaceoobk(comment){
    this.navCtrl.push(NewOrderPage,{
      item:this.item,
      comment:comment
    });
  }
}