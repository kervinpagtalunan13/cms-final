import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';
import { CurriculumCreateContainerComponent, canDeactivateFn } from './components/curriculum-create-container/curriculum-create-container.component';
import { CurriculumViewContainerComponent } from './components/curriculum-view-container/curriculum-view-container.component';
import { CurriculumCreateRevisionContainerComponent } from './components/curriculum-create-revision-container/curriculum-create-revision-container.component';
import { CurriculumViewRevisionContainerComponent } from './components/curriculum-view-revision-container/curriculum-view-revision-container.component';
import { CurriculumEditContainerComponent } from './components/curriculum-edit-container/curriculum-edit-container.component';
import { CurriculumEditRevisionContainerComponent } from './components/curriculum-edit-revision-container/curriculum-edit-revision-container.component';
import { AuthGuardGuard } from '../core/guard/auth-guard.guard';
import { AuthGuard } from '../core/guard/auth.guard';


const routes: Routes = [
  { path: '', component: CurriculumContainerComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: CurriculumListComponent},
      // { path: 'create', component: CurriculumViewComponent },
      

      // creating curriculum -done
      { path: 'create', component: CurriculumCreateContainerComponent, data: {type: 'create', action: 'curr'}},
      // view curriculum -done
      { path: ':id', component: CurriculumViewContainerComponent, data: {type: 'view', action: 'curr'} },
      // editing the pending curriculum
      { path: 'edit/:id', component: CurriculumEditContainerComponent, data: {type: 'edit', action: 'curr'} },

 
      // view revision -done
      { path: 'revisions/:id', component: CurriculumViewRevisionContainerComponent, data: {type: 'view', action: 'revise'} },
      // creating revision -done
      { path: 'revise/create/:id', component: CurriculumCreateRevisionContainerComponent, data: {type: 'create', action: 'revise'} },
      //editing the pending revision
      { path: 'revision/edit/:id', component: CurriculumEditRevisionContainerComponent, data: {type: 'edit', action: 'revise'} },




      // { path: ':id', component: CurriculumViewComponent },
      { path: 'revise/:id', component: CurriculumViewComponent },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }