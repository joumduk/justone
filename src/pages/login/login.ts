import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { SignupPage } from '../signup/signup'; 
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile'; 

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user={email:'',password:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpNavtive:HttpNativeProvider,public storage:Storage) {
    storage.get('id_user').then((val) => {
      if(val){
        // this.storage.remove('id_user');
        this.navCtrl.setRoot(ProfilePage);
      }
    });
  }
  login(){
    let url = 'http://api.nextobe.co.th/auth/login';
    let postParams = {'email':this.user.email,'password':this.user.password};
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      
      if(data.status ==200){
        let user=data.user;
        // alert(JSON.stringify(user));
        this.storage.set('id_user', user.id_user);
        this.storage.set('firstname', user.firstname);
        this.storage.set('lastname', user.lastname);
        this.storage.set('email', user.email);
        this.storage.set('phone', user.phone);
        this.navCtrl.setRoot(ProfilePage);
      }
    });

  }
  signup(){
    this.navCtrl.setRoot(SignupPage);
  }

}
