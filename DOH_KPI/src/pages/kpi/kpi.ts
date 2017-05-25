import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the KpiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kpi',
  templateUrl: 'kpi.html',
})
export class KpiPage {

  kpi_id : any
  kpi_name: string;
  options: any;
  region: Array<string> = [];
  cdata: Array<number> = [];

  // options: any = {
  //   title: { text: 'simple chart' },
  //   series: [{
  //     data: [29.9, 71.5, 106.4, 129.2],
  //   }]
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public rest: RestProvider,
  public loadingCtrl: LoadingController) {
    this.kpi_id = this.navParams.get('kpi_id')
    this.kpi_name = this.navParams.get('kpi_kname')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KpiPage');
    this.feedKpi()
  }

  feedKpi() {

    let loader = this.loadingCtrl.create({
      // content: "กรุณารอ...",
      spinner:'dots'
    });
    loader.present();    

    this.rest.doGetKpi(this.kpi_id)
      .subscribe((data: any) => {
        // console.log(data)

        // จัดรูปแบบข้อมูลเพื่อส่งให้กับ chart  
        data.result.forEach(v => {
          // console.log(v);
          this.region.push(v.areaname);
          this.cdata.push(parseFloat(v.chart_value));

        });


        this.options = {
          chart: {
            type: 'column'
          },
          yAxis: {
            min: 0,
            title: {
              text: 'ร้อยละ (%)'
            }
          },
          xAxis: {
            categories: this.region
          },
          title: { text: this.kpi_name },
          series: [{
            name: 'ข้อมูล',
            data: this.cdata,
          }]
        };

        loader.dismiss()


      }, (err) => {
        console.log(err)
        loader.dismiss()
        alert('กรุณาตรวจสอบการเชื่อมต่อ')
      })
  }


}
