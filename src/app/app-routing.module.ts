import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, 
  canActivate:[LoginGuard]
},
  { path: 'curriculums', loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule)},
  { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  { path: 'subjects', loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'departments', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
