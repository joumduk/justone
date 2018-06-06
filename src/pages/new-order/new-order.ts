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
  selecteditems  = new Array<Product>();
  order :Order = new Order();
  search_keyword="";
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
      this.selecteditems.push(product);
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
    if(this.order.date==''){
      alert("please select date");
    }else if(this.order.payment==''){
      alert("please select Payment");
    }else if(this.order.customer_name==''){
      alert("please input customer name");
    }else if(this.order.customer_phone==''){
      alert("please input customer phone number");
    }else if(this.order.customer_social_id==''){
      alert("please input customer social id");
    }else if(this.selecteditems.length ==0){
      alert("please select Sales item");
    }else{
    // alert(JSON.stringify(this.product));
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'https://justone-social-marketing.000webhostapp.com/orders/newOrder';
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
      };
      for(let e=0;e<this.selecteditems.length;e++){
        postParams['products['+e+']']=this.selecteditems[e];  
      }
      
      
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
  }
  search(event){
    // alert(JSON.stringify(event));
    if(this.search_keyword.length>2){
      let loader = this.loadingCtrl.create({
        content: "Loading"
      });
      loader.present();
      let url = 'https://justone-social-marketing.000webhostapp.com/products/getSearch';
        let postParams = {
          'id_user':this.order.id_user,
          'keyword':this.search_keyword
        };
        let options = {'Content-Type': 'application/json'};
        this.httpNavtive.post(url, postParams, options).subscribe(data=> {
          
          // alert(data.message);
          this.items=[];
          if(data.status ==200){
            // alert(JSON.stringify(data));  
            if(data.products.length>0){
              for (let e of data.products) {
                this.items.push({
                  id:e.id_product,
                  name:e.name,
                  price:e.price,
                  sale_price:e.sale_price,
                  image_link:e.image_link,
                  quantity:1
                });
              }
              
            }
          }
          loader.dismiss();
        });
    }
  }
  selectedproduct(item:Product){
    this.selecteditems.push(item);
    this.change();
  }
  change(){
    let price=0;
    this.selecteditems.forEach(element => {
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
  date: string='';
  id_user:string='';
 payment:string = "Bankwire";
 customer_name:string='';
 customer_phone:string='';
 customer_social:Number=1;
 customer_social_id:string='';
 address:string='';
 
 product_total:Number=0;
 grand_total:Number=0;
}