import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  report= new Report();
  id_user='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage,   
    public httpNavtive:HttpNativeProvider) {
     
    storage.get('id_user').then((val) => {
      this.id_user=val;
      let url = 'http://api.nextobe.co.th/orders/getReports';
      let postParams = {'id_user':val};
      let options = {'Content-Type': 'application/json'};
      this.httpNavtive.post(url, postParams, options).subscribe(data=> {
        // alert(JSON.stringify(data));
        // alert(data);
        this.report.today_sale=data.report.today_sale;
        this.report.today_revenue=data.report.today_revenue;
        this.report.today_product=data.report.today_product;
        this.report.month_sales=data.report.month_sale;
        this.report.month_revenue=data.report.month_revenue;
        this.report.month_product=data.report.month_product;
        this.report.pending_orders=data.report.pending_order;
        this.report.paid_orders=data.report.paid_order;
        this.report.packing_orders=data.report.packing_order;
        this.report.completed_orders=data.report.completed_orders;
      });
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
export class Report{
  today_sale:Number;
  today_revenue:Number;
  today_product:Number;
  month_sales:Number;
  month_revenue:Number;
  month_product:Number;
  pending_orders:Number;
  paid_orders:Number;
  packing_orders:Number;
  completed_orders:Number;
}