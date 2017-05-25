import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestProvider {

  strURL: any = 'http://172.17.8.189/dohkpi-api/public/'; // url ของ restful

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  // ส่ง request ไปยัง restful โดยส่ง user & password เพื่อขอ token
  doPostLogin(u: any, p: any) {
    let body: any = { username: u, password: p };
    return this.http.post(this.strURL + 'login', body)
      .map(res => <any>res.json());
  }

  // ดึงข้อมูล kpiall จาก restful
  doGetKpiAll() {
    let header = new Headers({
      'x-token': localStorage.getItem('dohkpi-token')
    })

    let option = new RequestOptions({ headers: header })

    return this.http.get(this.strURL + 'kpi-all', option)
      .map(res => <any>res.json());
  }

  doGetKpi(kpi_id) {

    let header = new Headers({
      'x-token': localStorage.getItem('dohkpi-token')
    })

    let option = new RequestOptions({ headers: header })

    return this.http.get(this.strURL + 'kpi/'+kpi_id+'?y=2559', option)
      .map(res => <any>res.json());
  }
}
