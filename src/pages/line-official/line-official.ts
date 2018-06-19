import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile'; 

/**
 * Generated class for the LineOfficialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-line-official',
  templateUrl: 'line-official.html',
})
export class LineOfficialPage {
  offical_line={'message_client_id':'','message_client_secret':'','message_token':'','login_client_id':'','login_client_secret':'','line_id':'','id_user':''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpNavtive:HttpNativeProvider,public loadingCtrl:LoadingController,public storage:Storage) {
    storage.get('id_user').then((val) => {
      this.offical_line.id_user=val;
      if(val){
        let loader = this.loadingCtrl.create({
          content: "Loading"
        });
        loader.present();
        let url = 'https://justone-social-marketing.000webhostapp.com/auth/OfficialLine/'+val;
        let postParams = {};
        let options = {'Content-Type': 'application/json'};
        this.httpNavtive.get(url, postParams, options).subscribe(data=> {
          // alert(JSON.stringify(data));
          // alert(data);
          if(data.state==100){
            this.offical_line.message_client_id = data.user_social.message_client_id
            this.offical_line.message_client_secret = data.user_social.message_client_secret
            this.offical_line.message_token = data.user_social.message_token
            this.offical_line.login_client_id = data.user_social.login_client_id
            this.offical_line.login_client_secret = data.user_social.login_client_secret
            this.offical_line.line_id = data.user_social.line_id
          }
          loader.dismiss();
        });
      }
    });
  }
  backprofile(){
    this.navCtrl.setRoot(ProfilePage);
  }
  register(){
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'https://justone-social-marketing.000webhostapp.com/auth/addOfficialLine';
    let postParams = this.offical_line;
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      if(data.status){
        this.navCtrl.setRoot(ProfilePage);
      }
      loader.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LineOfficialPage');
  }

}
