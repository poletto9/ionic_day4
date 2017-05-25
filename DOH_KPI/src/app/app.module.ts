import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from  '@angular/http'; //เพิ่มขึ้นมาใหม่

import { MyApp } from './app.component';

import { RestProvider } from '../providers/rest/rest';

import { ChartModule } from 'angular2-highcharts'; //เพิ่ม
import { KpiPage } from '../pages/kpi/kpi';

declare var require : any

@NgModule({
  declarations: [
    MyApp,
    KpiPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, // เพิ่มขึ้นมาใหม่
    ChartModule.forRoot(require('highcharts')) //เพิ่ม
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    KpiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
