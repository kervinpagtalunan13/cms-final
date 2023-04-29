import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';
import { dashboard } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    dashboard
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChartModule,
    // NgChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }