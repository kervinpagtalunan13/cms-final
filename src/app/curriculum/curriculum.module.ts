import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumListComponent, curriculumDialog } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YearDropdownComponent } from './components/year-dropdown/year-dropdown.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CurriculumCreateContainerComponent } from './components/curriculum-create-container/curriculum-create-container.component';
import { CurriculumViewContainerComponent } from './components/curriculum-view-container/curriculum-view-container.component';
import { CurriculumCreateRevisionContainerComponent } from './components/curriculum-create-revision-container/curriculum-create-revision-container.component';
import { CurriculumViewRevisionContainerComponent } from './components/curriculum-view-revision-container/curriculum-view-revision-container.component';
import { CurriculumEditContainerComponent } from './components/curriculum-edit-container/curriculum-edit-container.component';
import { CurriculumEditRevisionContainerComponent } from './components/curriculum-edit-revision-container/curriculum-edit-revision-container.component';
import { ElectiveSubjectDialogComponent } from './components/elective-subject-dialog/elective-subject-dialog.component';
// import { DialogContentExampleDialog} from './components/curriculum-list/curriculum-list.component'



@NgModule({
  declarations: [
    CurriculumContainerComponent,
    CurriculumListComponent,
    CurriculumViewComponent, 
    curriculumDialog, 
    YearDropdownComponent, 
    CommentsComponent, 
    CurriculumCreateContainerComponent, CurriculumViewContainerComponent, CurriculumCreateRevisionContainerComponent, CurriculumViewRevisionContainerComponent, CurriculumEditContainerComponent, CurriculumEditRevisionContainerComponent, ElectiveSubjectDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CurriculumRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CurriculumModule { }
