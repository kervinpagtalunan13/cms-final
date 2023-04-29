import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { AddNewElectiveSubject, AssignElectiveSubject, EditSubject, SubjectListComponent } from './components/subject-list/subject-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';
import { SubjectAddDialogComponent } from './components/subject-add-dialog/subject-add-dialog.component';
import { FormsModule } from '@angular/forms';
import {OrderByPipe} from 'src/app/subject/components/subject-list/subject-list-sort.pipe'
//import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer/ngx-extended-pdf-viewer";
@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectAddDialogComponent,OrderByPipe,
    AssignElectiveSubject,
    AddNewElectiveSubject,
    EditSubject
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class SubjectModule { }
