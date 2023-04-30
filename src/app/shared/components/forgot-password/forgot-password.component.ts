import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private accountService: AccountService){

  }
  email: string = ''

  error$ = new Subject<string>()
  success$ = new Subject<string>()

  closeAlert(){
    this.error$.next('')
  }

  closeSuccessAlert(){
    this.success$.next('')
  }
  sendEmail(form: NgForm){
    this.accountService.sendEmailForgotPassword(form.value.email).subscribe({
      next: data => {
        this.error$.next('')
        this.success$.next('Email has been sent')
        this.email = ''
      },
      error: err => {
        this.error$.next(err.message)
        this.success$.next('')
      }
    })
  }
}
