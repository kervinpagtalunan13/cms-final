import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentContainerComponent } from './components/department-container/department-container.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: DepartmentContainerComponent, canActivate:[AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
