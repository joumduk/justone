import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  product = {description:'',facebook:false,instagram:false,line:false,id_user:''};
  imageURI:any;
  imageFileName:any;
  loader;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HTTP,public transfer: FileTransfer,
    public camera: Camera,public loadingCtrl:LoadingController,public httpNavtive:HttpNativeProvider,  
    public fb:Facebook, public storage:Storage,private socialSharing: SocialSharing
  ) {
    storage.get("id_user").then(val=>{
      this.product.id_user=val;
      // alert(val);
    });
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI=imageData; 

    }, (err) => {
      console.log(err);
      alert(err);
    });

    
  }
  uploadFile() {
    this.loader = this.loadingCtrl.create({
      content: "Loading"
    });
    this.loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'https://justone-social-marketing.000webhostapp.com/products/uploadImg', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      let respone=JSON.parse(data.response);
      this.imageFileName=respone.file;
      // alert(JSON.stringify(data));
      // this.loader.dismiss();
      this.submit();
      // alert("Image uploaded successfully");
    }, (err) => {
      console.log(err);
    });
  }
  submit(){
    // alert(JSON.stringify(this.product));
    let url = 'https://justone-social-marketing.000webhostapp.com/products/newPost';
      let postParams = {'description':this.product.description,'facebook':this.product.facebook,'instagram':this.product.instagram,'line':this.product.line,
    'id_user':this.product.id_user,'image':this.imageFileName};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        if(data.status ==200){
          // this.navCtrl.push(ProductsPage)
          if(this.product.instagram){
           
          }
        }
        this.loader.dismiss();
      });
    // this.http.uploadFile("https://justone-social-marketing.000webhostapp.com/auth/uploadfile",{},{},this.file.name,"file").then( (x)=>alert(1));
  }
  btninstagram(){
    this.socialSharing.shareViaInstagram(this.product.description, this.imageURI).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

}

