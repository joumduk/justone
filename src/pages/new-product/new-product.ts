import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Facebook } from '@ionic-native/facebook';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HTTP,public transfer: FileTransfer,
    public camera: Camera,public loadingCtrl:LoadingController,public httpNavtive:HttpNativeProvider, 
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
      this.imageURI=imageData;
      // alert(JSON.stringify(imageData));
      // this.imageFileName=imageData.file;
      // alert(imageData);
      // this.imageFileName= 'data:image/jpeg;base64,'+imageData;
      // this.base64.encodeFile(imageData).then((base64File: string) => {
      //   alert(base64File);
      // }, (err) => {
      //   console.log(err);
      // });
    }, (err) => {
      console.log(err);
      alert(err);
    });

    
  }
  uploadFile() {
   
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://api.nextobe.co.th/products/uploadImg', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      let respone=JSON.parse(data.response);
      this.imageFileName=respone.file;
      this.submit();
      // alert("Image uploaded successfully");
    }, (err) => {
      console.log(err);
    });
  }
  
  submit(){
    // alert(JSON.stringify(this.product));
    let loader = this.loadingCtrl.create({
      content: "Loading"
    });
    loader.present();
    let url = 'http://api.nextobe.co.th/products/newProduct';
      let postParams = {'name':this.product.name,'price':this.product.price,'sale_price':this.product.sale_price,'description':this.product.description,'facebook':this.product.facebook,'instagram':this.product.instagram,'line':this.product.line,'id_user':this.product.id_user,
    'image':this.imageFileName};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        alert(data.message);
        if(data.status ==200){
          // this.navCtrl.push(ProductsPage)
          this.navCtrl.setRoot(ProductsPage);
          loader.dismiss();
          if(this.product.instagram){
            if(this.instagram){
              this.btninstagram();
            }else{
              loader.dismiss()
            }
          }
        }
      });
      
      
    // this.http.uploadFile("http://api.nextobe.co.th/auth/uploadfile",{},{},this.file.name,"file").then( (x)=>alert(1));
  }
  btninstagram(){
    if(this.instagram.isInstalled()){
      this.instagram.shareAsset(this.imageFileName)
      .then(() => {
        console.log('Shared!');})
      .catch((error: any) => console.error(error));  
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

}
