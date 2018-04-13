import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ProductsPage } from '../products/products'; 
import { Storage } from '@ionic/storage';
import { Instagram } from '@ionic-native/instagram';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  product = {name:'',price:'',sale_price:'',description:'',facebook:false,instagram:false,line:false,id_user:''};
  imageURI:any;
  imageFileName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HTTP,private transfer: FileTransfer,
    private camera: Camera,public loadingCtrl:LoadingController,public httpNavtive:HttpNativeProvider,    
    public fb:Facebook, public storage:Storage,public instagram:Instagram
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
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      alert(err);
    });
  }
  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      alert("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      alert(err);
    });
  }
  
  submit(){
    // alert(JSON.stringify(this.product));
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'http://api.nextobe.co.th/products/newProduct';
      let postParams = {'name':this.product.name,'price':this.product.price,'sale_price':this.product.sale_price,'description':this.product.description,'facebook':this.product.facebook,'instagram':this.product.instagram,'line':this.product.line,'id_user':this.product.id_user};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        
        if(data.status ==200){
          this.navCtrl.push(ProductsPage);
        }
      });
      loader.dismiss();
      if(this.product.instagram){
        if(this.instagram.isInstalled()){
          this.instagram.share(this.product.description)
          .then(() => console.log('Shared!'))
          .catch((error: any) => console.error(error));  
        }
      }
    // this.http.uploadFile("http://api.nextobe.co.th/auth/uploadfile",{},{},this.file.name,"file").then( (x)=>alert(1));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

}
