import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileContainerShellComponent } from './components/profile-container-shell/profile-container-shell.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileContainerShellComponent, canActivate:[AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
