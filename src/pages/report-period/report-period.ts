import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpNativeProvider } from '../../providers/http-native/http-native'; 
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ReportPeriodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-period',
  templateUrl: 'report-period.html',
})
export class ReportPeriodPage {
  report={'period_sale':'','period_revenue':'','period_product':''}
  period={start:'',end:''};
  id_user='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,   
    public httpNavtive:HttpNativeProvider) {
      var dateObj = new Date();
      this.period.start= dateObj.getFullYear() +"-" + this.twodigits(Number(dateObj.getMonth() + 1)) + '-01' ;
      var lastDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth()+1, 0);
      this.period.end= lastDayOfMonth.getFullYear() +"-" + this.twodigits(Number(lastDayOfMonth.getMonth() + 1)) + '-' +this.twodigits(Number(lastDayOfMonth.getDate()));
      storage.get('id_user').then((val) => {
        this.id_user=val;
        this.changeDate();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPeriodPage');
  }
  twodigits(number) {
    return (number < 10 ? '0' : '') + number
  }
  changeDate(){
    let url = 'http://api.nextobe.co.th/orders/getReportsByPeriod';
    let postParams = {
      'id_user':this.id_user,
      'start_date':this.period.start,
      'end_date':this.period.end
    };
    let options = {'Content-Type': 'application/json'};
    this.httpNavtive.post(url, postParams, options).subscribe(data=> {
      // alert(JSON.stringify(data));
      // alert(data);
      this.report.period_sale=data.report.period_sale;
      this.report.period_revenue=data.report.period_revenue;
      this.report.period_product=data.report.period_product;
    });
  }
}
