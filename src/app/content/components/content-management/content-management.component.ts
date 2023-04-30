import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, combineLatest, tap } from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import { Content } from 'src/app/core/models/content.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentService } from 'src/app/core/services/content.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent {
  constructor(private contentService: ContentService,
              private authService: AuthService,
              private toast: ToastService
              ){}
  
  isEdit:boolean = false
  role:string = ''
  isLoading:boolean = true
    
  error$ = new Subject<string>()
  success$ = new Subject<string>()

  closeAlert(){
    this.error$.next('')
  }

  closeSuccessAlert(){
    this.success$.next('')
  }
  
  content:Content = {
    is_dark_mode_active: false,
    logo_path: '',
    title_text: ''
  }

  src(){
    if(this.imageUrl)
      return this.imageUrl
    if(this.content.logo_path)
      return 'http://127.0.0.1:8000/api/content/logo/' + this.content.logo_path
    else
      return 'http://127.0.0.1:8000/api/content/logo/logo-cict.png' 
  }

  originalContent:any = {}
  neededData$ = combineLatest([
    this.contentService.content$,
    this.authService.getCurrentUser(),
    this.contentService.contentAction$
  ]).pipe(
    tap(([content, user, contentObs]) => {    
      this.originalContent = {...contentObs}  
      this.content.is_dark_mode_active = !!Number(contentObs.is_dark_mode_active)
      this.content.logo_path = contentObs.logo_path || ''
      this.content.title_text = contentObs.title_text || ''
      this.isLoading = false
      this.role = user.role      
      // console.log(contentObs);
      
      console.log(!!Object.keys(contentObs).length);
      
    })
  )

  submit(form: NgForm){
    
    const formData = new FormData()
    if(this.selectedFile){
      formData.append('logo', this.selectedFile)
    }
    
    formData.append('is_dark_mode_active', this.content.is_dark_mode_active ? '1' : '0')
    formData.append('title_text', this.content.title_text)
    
    if(!Object.keys(this.originalContent).length){
       console.log(this.content);
      
      this.contentService.addContent(formData).subscribe({
        next: data => {
          this.toggleIsEdit()      
          this.imageUrl = ''
          // this.error$.next('')
          // this.success$.next('Website Content update successfully')
          this.toast.showToastSuccess('Update Successfuly', 'Website Content has been updated successfully')
          this.selectedFile = ''
        },
        error: err => {
          this.toast.showToastError('Update Failed', err.message)
          // this.error$.next(err.message)
          // this.success$.next('')
        }
      })
    }
    else{
      this.contentService.updateContent(formData).subscribe({
        next: data => {
          this.toggleIsEdit()
          this.imageUrl = ''
          // this.error$.next('')
          // this.success$.next('Website Content update successfully')
          this.selectedFile = ''
          this.toast.showToastSuccess('Update Successfuly', 'Website Content has been updated successfully')
        },
        error: err => {
          // this.error$.next(err.message)
          // this.success$.next('')
          this.toast.showToastError('Update Failed', err.message)

        }
      })
    }
  }
  
  cancelEdit(){
    this.toggleIsEdit()

    this.imageUrl = ''
    this.content.is_dark_mode_active = this.originalContent.is_dark_mode_activate
    this.content.logo_path = this.originalContent.logo_path
    this.content.title_text = this.originalContent.title_text

    this.error$.next('')
  }

  canEdit(){
    return this.role == 'admin'
  }

  toggleTheme(){
    
  }

  selectedFile:any 
  imageUrl = ''
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  toggleIsEdit(){
    this.isEdit = !this.isEdit
  }

//  toggleTheme = new AppComponent();
//  isDark=false;
//  toggle(){
//   if(!this.isDark)
//   {
//     this.toggleTheme.toggleDarkMode();
//   this.isDark = true;
//   console.log(this.isDark);
// }
  
//   else {
//   this.toggleTheme.toggleLightMode();
//     this.isDark = false;
//     console.log(this.isDark);
// }

//  }

}
