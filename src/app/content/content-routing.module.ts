import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
    { path: '', component: ContentManagementComponent, canActivate: [AuthGuard],  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
