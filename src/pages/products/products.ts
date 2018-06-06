import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewProductPage } from '../new-product/new-product';
import { DetailPage } from '../detail/detail';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{id:string,title: string, note: string, icon: string,image:string}>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public storage:Storage,   
    public loadingCtrl:LoadingController,
    public httpNavtive:HttpNativeProvider) {
    this.selectedItem = navParams.get('item');
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    storage.get('id_user').then((val) => {
      let loader = this.loadingCtrl.create({
        content: "Loading"
      });
    loader.present();
      let url = 'https://justone-social-marketing.000webhostapp.com/products/getproducts';
      let postParams = {'id_user':val};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // alert(data);
        this.items = [];
        for (let e of data.products) {
          this.items.push({
            id:e.id_product,
            title: e.name,
            note: e.description,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)],
            image: e.image_link
          });
        }
        loader.dismiss();
      });
    });
    
  }
  newProduct(){
    this.navCtrl.push(NewProductPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  itemClicked(item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      id: item.id
    });
  }
}
