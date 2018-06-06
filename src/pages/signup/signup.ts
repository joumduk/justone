import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { ProfilePage } from '../profile/profile'; 
import { LoginPage } from '../login/login'; 
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user={firstname:'',lastname:'',phone:'',email:'',password:'',conpasswd:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpNavtive:HttpNativeProvider,public loadingCtrl:LoadingController,public storage:Storage) {
  }
  signup(){
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    if(this.user.conpasswd==this.user.password){
      let url = 'https://justone-social-marketing.000webhostapp.com/auth/signup';
      let postParams = {'firstname':this.user.firstname,'lastname':this.user.lastname,'phone':this.user.phone,'email':this.user.email,'password':this.user.password};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        if(data.status ==200){
          this.storage.set('id_user', data.id_user);
          this.storage.set('firstname', this.user.firstname);
          this.storage.set('lastname', this.user.lastname);
          this.storage.set('email', this.user.email);
          this.storage.set('phone', this.user.phone);
          this.navCtrl.setRoot(ProfilePage);
        }
        loader.dismiss();
      });
    }else{
      alert("mis-metch between Password and Retyped password");
    }
    
  }
  backLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
