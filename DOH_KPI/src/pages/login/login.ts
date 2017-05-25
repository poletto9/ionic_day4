import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user_val: any;

  username: any
  password: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public rest: RestProvider, // ประกาศตัวแปร rest แทน class RestProvider
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // alert(localStorage.getItem('dohphone-token'));
  }

  doSubmit() {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'dots',
      // duration: 3000
    });
    loader.present();


    // request data
    this.rest.doPostLogin(this.username, this.password)
      .subscribe((data: any) => {
        this.user_val = data
        console.log(data);
        if (data.login == true) { // เข้าถึง key object
          // alert('success')
          localStorage.setItem('dohkpi-username', data.username)
          localStorage.setItem('dohkpi-token', data.token)
          this.navCtrl.setRoot('HomePage')
        } else {
          // alert('login fail')
          let alert = this.alertCtrl.create({
            title: 'Failure Login!',
            subTitle: 'username or password inavaiable!',
            buttons: ['OK']
          });
          alert.present();
        }

        loader.dismiss();
      }, (err) => {
        console.log(err);
        loader.dismiss();
      })


  }


}
