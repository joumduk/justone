import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'; 
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 

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
  firstname:any;
  lastname:any;
  email:any;
  isLoggedIn=false;
  id_user:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public fb:Facebook,
    public httpNavtive:HttpNativeProvider) {
      fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connected") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
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
    });
    
  }
  synFacebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
    this.facebooklink(res.authResponse.accessToken,res.authResponse.userID);
    console.log('Logged into Facebook!', res);
  })
  .catch(e => {console.log('Error logging into Facebook', e);alert("error")});
  }
  facebooklink(accesstoken,social_id){
    let url = 'http://api.nextobe.co.th/auth/facebookConnction';
    let postParams = {'id_user':this.id_user,'accesstoken':accesstoken,'social_id': social_id};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      alert(data.message);
    });
  }
  logout(){
    this.storage.remove('id_user');
    this.navCtrl.setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
