import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'; // เพิ่มขึ้นมาใหม่ตอน get ค่าจาก json

import { KpiPage } from '../kpi/kpi';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  kpi_val: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public rest: RestProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    //call function
    this.feedKpiAll();
  }

  doLogout() {

    let confirm = this.alertCtrl.create({
      title: 'Confirmation?',
      message: 'Do you agree to exit?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            localStorage.removeItem('dohkpi-username');
            localStorage.removeItem('dohkpi-token');
            // this.navCtrl.setRoot('LoginPage');
            this.app.getRootNav().setRoot('LoginPage'); // กรณ๊เพจเป็นแบบ TAB
            console.log('Agree clicked');
          }
        }
      ]
    });
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    confirm.present();

  }

  feedKpiAll() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'dots'
    });
    loader.present()

    this.rest.doGetKpiAll()
      .subscribe((data: any) => {
        console.log(data)
        this.kpi_val = data.result
        loader.dismiss()
      }, (err) => {
        console.log(err)
        loader.dismiss()
        alert('Connection problem')
      })
  }

  goKPI(id) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    // alert(id);
    this.navCtrl.push(KpiPage, { kpi_id: id });
    
    loader.dismiss()
  }

}
