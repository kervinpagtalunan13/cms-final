import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AppError } from 'src/app/core/models/app-error';
import { AccountService } from 'src/app/core/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectAddDialogComponent } from 'src/app/subject/components/subject-add-dialog/subject-add-dialog.component';

export interface registerForm{
  // firstName: string,
  // middleName: string,
  // lastName:string,
  password: string,
  email: string,
  // contactNo:string,
  // birthDate:string,
  // address:string,
}

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})

export class AccountRegistrationComponent {
  constructor(private accountService: AccountService, 
              public dialogRef: MatDialogRef<SubjectAddDialogComponent>
    ){}
  srcResult: any;
  showDep=false;
  role='';
  user!:User

  errorMessage$ = new Subject<string>();

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    return inputNode;
  }
  error$ = new Subject<string>();
  success$ = new Subject<string>()
  onCancel() {
    this.dialogRef.close(false);
  }
  closeAlert(){
    this.error$.next('')
  }

  closeSuccessAlert(){
    this.success$.next('')
  }

  isShowDep(){
    if(this.role=='chair'){
      this.showDep=true;
    }
    else if(this.role=='faculty'){
      this.showDep=true;
    }
    else{
      this.showDep=false;
    }
  }

  submitForm(form: NgForm){
    // console.log(form.value);
    this.accountService.register(form.value).subscribe({
      next: data => {
        this.error$.next('')
        this.success$.next('Subject created Successfully')
      },
      error: (err: AppError) => {
        this.error$.next(err.message)
        this.success$.next('')
      }
    })
  }
}
