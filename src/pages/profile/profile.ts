import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'; 
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  url: string;
  firstname:any;
  lastname:any;
  email:any;
  isLoggedIn=false;
  id_user:any;
  social_syn = {'facebook':0,'instagram':0,'line':0};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public httpNavtive:HttpNativeProvider,
    public loadingCtrl:LoadingController,
    private iab: InAppBrowser) {
    storage.forEach((value, key, index) => {
      if(key=='firstname'){
        this.firstname=value
      }else if(key=='lastname'){
        this.lastname=value
      }else if(key=='email'){
        this.email=value
      }else if(key=='id_user'){
        this.id_user=value
      }
    }).then((v)=>{
      this.checkSyn();
    })
    

  }
  checkSyn(){
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'https://justone-social-marketing.000webhostapp.com/auth/Check_social_syn/'+this.id_user;
    let postParams = {};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.get(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      this.social_syn.facebook = data.facebook
      this.social_syn.instagram = data.instagram
      this.social_syn.line = data.line
      loader.dismiss();
    });
    
  }
  synFacebook() {
        // Opening a URL and returning an InAppBrowserObject
    let browser = this.iab.create('https://justone-social-marketing.000webhostapp.com/products/fblogin/'+this.id_user,'_blank',{location:'no'}); 
    browser.show();
    browser.on('loadstop').subscribe(event => {
      if(event.url=="https://justone-social-marketing.000webhostapp.com/products/fbback/"+this.id_user){
        browser.close();
      }
   });
   // Inject scripts, css and more with browser.X
  }
  facebooklink(accesstoken,social_id){
    let url = 'https://justone-social-marketing.000webhostapp.com/auth/facebookConnction';
    let postParams = {'id_user':this.id_user,'accesstoken':accesstoken,'social_id': social_id};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      alert(data.message);
    });
  }
  synLine(){
    // Opening a URL and returning an InAppBrowserObject
  let browser = this.iab.create('https://justone-social-marketing.000webhostapp.com/auth/linelogin/'+this.id_user,'_blank',{location:'no'}); 
    browser.show();
  // Inject scripts, css and more with browser.X
  }

  logout(){
    this.storage.remove('id_user');
    this.navCtrl.setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
