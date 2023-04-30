import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboard } from './dashboard.component';
import { AuthGuard } from '../core/guard/auth.guard';


const routes: Routes = [
  { path: '', component: dashboard,
  canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }