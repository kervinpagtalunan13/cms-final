import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { TimeDifferencePipePipe } from '../core/pipe/time-difference-pipe.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import { ReloadPageComponent } from './components/reload-page/reload-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { AppComponent } from '../app.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    SpinnerComponent,
    TimeDifferencePipePipe,
    ConfirmDialogComponent,
    NotAllowedComponent,
    ReloadPageComponent,
    NotificationComponent,
    ViewProfileComponent,
    PdfViewerComponent,
    ForgotPasswordComponent,
    CommentComponent,
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    SidenavComponent,
    SpinnerComponent,
    TimeDifferencePipePipe,
    NotAllowedComponent,
    ReloadPageComponent,
    NotificationComponent,
    CommentComponent,
    EmptyStateComponent
  ]
})
export class SharedModule { }
