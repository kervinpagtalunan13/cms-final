import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EMPTY, Subject, catchError, combineLatest, tap } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-container-shell',
  templateUrl: './profile-container-shell.component.html',
  styleUrls: ['./profile-container-shell.component.css']
})
export class ProfileContainerShellComponent {
  disableChangePass:boolean = true
  disableChangeProfile:boolean = true
  isLoading:boolean = true
  error:boolean = false
  messageProfileSuccess$ = new Subject<string>()
  messageProfileError$ = new Subject<string>()

  user!:User | any

  neededData$ = combineLatest([
    this.authService.getCurrentUser(),
    this.authService.currentUser$
  ]).pipe(
    tap(([user, obsUser]) => {
      this.user = user
      if(user.profile){
        this.profileForm.patchValue({
          name: user.profile.name,
          phoneNo: user.profile.phone_no,
          address: user.profile.address,
          birthDate: user.profile.birth_date,
        })
      }

      if(obsUser){
        this.user = obsUser
      if(obsUser.profile){
        this.profileForm.patchValue({
          name: obsUser.profile.name,
          phoneNo: obsUser.profile.phone_no,
          address: obsUser.profile.address,
          birthDate: obsUser.profile.birth_date,
        })
      }
      }

      this.isLoading = false

    }),
    catchError(err => {
      this.isLoading = false
      this.error = true
      return EMPTY
    })
  )

  profileForm: FormGroup
  constructor(private authService: AuthService, 
              private fb: FormBuilder,
              private userService: UserService
              ){
    this.profileForm = fb.group({
    name: [{ value: '', disabled: true }, Validators.required],
    address: [{ value: '', disabled: true }, Validators.required],
    birthDate: [{ value: '', disabled: true }, Validators.required],
    phoneNo: [{ value: '', disabled: true }, Validators.required],
    })
  }

  clickEditProfile(){
    this.disableChangeProfile = !this.disableChangeProfile    
    Object.values(this.profileForm.controls).forEach(
      fc => fc.disabled ? fc.enable() : fc.disable()  
    )
  }


  submit(){
    this.userService.updateCurrentUser(this.profileForm.value)
      .subscribe({
        next: data => {
          this.authService.updateProfile(data)
          // console.log(data);
          this.clickEditProfile()
          this.messageProfileSuccess$.next('Profile change successfuly')
          this.messageProfileError$.next('')
        },
        error: err => {
          this.messageProfileError$.next(err.message)
          this.messageProfileSuccess$.next('')
        }
      }
    )
  }

  // change pass
  passwords = {
    currentPassword: '',
    password: '',
    password_confirmation: ''
  }

  clickEditPass(){
    if(!this.disableChangePass){
      this.passwords.password_confirmation = ''
      this.passwords.password = ''
      this.passwords.currentPassword = ''
    }
    this.disableChangePass = !this.disableChangePass
  }

  messagePassSuccess$ = new Subject<string>()
  messagePassError$ = new Subject<string>()

  changePass(form: NgForm){
    this.userService.changePass(form.value).subscribe({
      next: data => {
        this.messagePassSuccess$.next('Password change successfuly')
        this.messagePassError$.next('')
        this.clickEditPass()
      },
      error: err => {
        this.messagePassError$.next(err.message)
        this.messagePassSuccess$.next('')
      }
    })
  }


  // change picture

  messagePicSuccess$ = new Subject<string>()
  messagePicError$ = new Subject<string>()

  selectedFile:any 
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }
  
  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.userService.onUpload(formData).subscribe({
      next: (response:any) => {
        this.authService.updateProfile(response.profile)
        this.messagePicError$.next('')
        this.messagePicSuccess$.next('Profile picture change successfully')
      },
      error: (err: AppError) => {
        console.log(err);
        
        this.messagePicError$.next(err.message)
        this.messagePicSuccess$.next('')
      }
    })
  }
}
