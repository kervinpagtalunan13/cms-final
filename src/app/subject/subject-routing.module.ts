import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: SubjectListComponent, canActivate:[AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
