import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KpiPage } from './kpi';

@NgModule({
  declarations: [
    KpiPage,
  ],
  imports: [
    IonicPageModule.forChild(KpiPage),
  ],
  exports: [
    KpiPage
  ]
})
export class KpiPageModule {}
