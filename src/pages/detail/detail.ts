import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
import { NewOrderPage } from '../new-order/new-order';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  item={'id_product' :"",'name':"",'price':0,'sale_price':0,'description':"",'facebook':false,'instagram':false,'line':false,'image_link':"",'id_user':''};
  facebook={'id':"",'name':"","des":"","date":"","comments":[]}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,   
    public loadingCtrl:LoadingController,
    private socialSharing: SocialSharing, 
    public httpNavtive:HttpNativeProvider) {
      let loader = this.loadingCtrl.create({
        content: "Loading"
      });
      loader.present();
      let id = this.navParams.get('id');
      let url = 'https://justone-social-marketing.000webhostapp.com/products/getproductdetail';
      let postParams = {'id_product':id};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // // alert(data);
        this.item.id_product = data.product.id_product;
        this.item.id_user = data.product.id_user;
        this.item.name = data.product.name;
        this.item.price = data.product.price;
        this.item.sale_price = data.product.sale_price;
        this.item.description = data.product.description;
        if(data.product.facebook==1){
          this.item.facebook =true;  
        }
        if(data.product.instagram==1){
          this.item.instagram =true;  
        }
        if(data.product.line==1){
          this.item.line =true;  
        }
        this.item.image_link = data.product.image_link;
        loader.dismiss();
        if(this.item.facebook){
          this.loadComment()
        }
        // this.checkSyn();
      });
      
      
  }
  loadComment(){
    let loader2 = this.loadingCtrl.create({
      content: "Loading"
    });
    loader2.present();
    let postParams = {'id_product':this.item.id_product};
      let options = {'Content-Type': 'application/json'};
    let url2 = 'https://justone-social-marketing.000webhostapp.com/products/getComments';      
      this.httpNavtive.post(url2, postParams, options).subscribe(data2=> {
        if(Object.keys(data2).length !==0){
          this.facebook.id=data2.media_id;
          this.facebook.date=data2.date;
          this.facebook.name=data2.name;
          this.facebook.comments=data2.comments.data;
        }
      loader2.dismiss();
    });
  }
  uploadToFacebook(){
    if(this.item.facebook){
      let loader2 = this.loadingCtrl.create({
        content: "Loading"
      });
      loader2.present();
      let postParams = {'id_product':this.item.id_product};
        let options = {'Content-Type': 'application/json'};
        let url2 = 'https://justone-social-marketing.000webhostapp.com/products/FacebookPostByProduct/'+this.item.id_product;      
          this.httpNavtive.get(url2, postParams, options).subscribe(data2=> {
            alert(data2.message);
            loader2.dismiss();
        });
    }else{
      alert("Already Upload to facebook");
    }
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  addNewOrder(){
    this.navCtrl.push(NewOrderPage,{
      item:this.item
    });
  }
  btninstagram(){
    this.socialSharing.shareViaInstagram(this.item.description,'https://justone-social-marketing.000webhostapp.com/img/'+this.item.image_link).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  addNewOrderFaceoobk(comment){
    this.navCtrl.push(NewOrderPage,{
      item:this.item,
      comment:comment
    });
  }
}