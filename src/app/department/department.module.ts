import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentContainerComponent } from './components/department-container/department-container.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';


@NgModule({
  declarations: [
    DepartmentContainerComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DepartmentModule { }
