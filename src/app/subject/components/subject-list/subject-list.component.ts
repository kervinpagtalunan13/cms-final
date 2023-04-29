import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { EMPTY, Observable, Subject as subject, catchError, combineLatest, filter, tap } from 'rxjs';
import {Subject} from 'src/app/core/models/subject';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
//import {jsPDF} from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
import { ElectiveTrack } from 'src/app/core/models/elective';
import { json } from 'express';
import { AppError } from 'src/app/core/models/app-error';



@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  constructor(public dialog: MatDialog, 
              private subjectService: SubjectService, 
              public viewPdfDialog: MatDialog,
              private authService: AuthService
              ) {}
  openDialog(): void {
    this.dialog.open(SubjectAddDialogComponent);
  }

  clickEditSubject(data:any, type:string){
    this.dialog.open(EditSubject, {
      data: {
        subject: data,
        type: type
      }
    });
  }

  getElectiveSubject(id: number){
    return this.electives.find(sub => sub.id == id)?.description
  }

  getSyllabusSubject(id: number){
    return this.electives.find(sub => sub.id == id)?.syllabus_path
  }

  getAssignedIn(id:number){
    let loc = ''
    this.electiveSubjects.forEach(sub => {
      let indexOf = sub.metadata.indexOf(id)
      if(indexOf + 1){
         loc = `${sub.track} - elective${indexOf + 1}`
      }
    })
    return loc || 'not assigned'
 
  }

  subjects: Subject[]=[]
  role:string = ''
  isLoading:boolean = true
  error:boolean = false
  electiveSubjects:any[] = []

  descriptionList:any[] = []
  originalDescription: any[] = []

  selectedTrack:number | any

  editElected(number: number){
    this.selectedTrack = number
  }

  newElective(){
    this.dialog.open(AddNewElectiveSubject);
  }

  cancelEdit(index: number){
    this.descriptionList[index] = [...this.originalDescription[index]]
    console.log(this.originalDescription[index]);
    
    this.selectedTrack = null
  }

  saveElected(index: number){
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: {
    //     title: 'Edit Elective Subjects',
    //     message: 'Are you sure you want to edit this Elective subject?'
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.subjectService.editElectiveSubject(this.descriptionList[index], index + 1).subscribe({
    //       next: data => {
    //         this.electiveSubjects[index].description = [...this.descriptionList[index]]
    //         this.originalDescription[index] = this.electiveSubjects[index].description
    //         this.descriptionList[index] = this.originalDescription[index]
    //         this.selectedTrack = null
    //       },
    //       error: err => {

    //       }
    //     })


    //   } else {
    //     this.descriptionList[index] = [...this.originalDescription[index]]
    //   }
    // });
  }

  asd = this.subjectService.subjectAdd$.subscribe(
    subject => subject && this.subjects.push(subject)
  )
  electives:any[] = []
  neededData$ = combineLatest([
    this.subjectService.subjects$,
    this.subjectService.electiveSubjects$,
    this.subjectService.electives$,
    this.subjectService.addedElectiveSubject$,
    this.authService.getCurrentUser(),
    this.subjectService.updateSubject$,
    this.subjectService.updateElective$,
  ]).pipe(
    tap(([subjects, electiveSubjects, electives, addedElectiveSubject, user, updatedSubject, updatedElective]) => {
      this.electiveSubjects = electiveSubjects
      this.electives = electives
      
      this.role = user.role
      this.subjects = subjects
      
      if(addedElectiveSubject){
        this.electives = [...this.electives, addedElectiveSubject]
      }

      if(updatedSubject){
        this.subjects = this.subjects.map(sub => sub.id == updatedSubject.id ? updatedSubject : sub)
      }
      if(updatedElective){
        this.electives = this.electives.map(sub => sub.id == updatedElective.id ? updatedElective : sub)
      }
      
      // this.electiveSubjects.forEach(list => {        
      //   this.originalDescription.push([...list.description])
      //   this.descriptionList.push([...list.description])
      // })

      this.isLoading = false
    }),
    catchError(err => {
      this.error = true
      this.isLoading = false
      return EMPTY
    })
  )

  currentSortColumn: string='';
  currentSortDirection: string = 'asc';

  sort(column: string) {
    if (this.currentSortColumn === column) {
      // Reverse the direction if the same column is clicked again
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and direction if a different column is clicked
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }
  }

  removeSubject(id:number){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Subject',
        message: 'Are you sure you want to move this subject to inactive?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.removeSubject(id, {status: 'i'}).subscribe({
          next: data => {
            this.subjects = this.subjects.map(subj => subj.id != id ? subj : data)
          },
          error: err => {

          }
        })
      } else {
      }
    });
  }
  assignElective(id: number){
    const dialogRef = this.dialog.open(AssignElectiveSubject, {
      data: {
        electiveSubjects: this.electiveSubjects,
        selectedElective: id
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.electiveSubjects = this.electiveSubjects.map(sub => {
          return sub.id != result.id ? sub : {...sub, metadata: result.data}
        })
        

      } else {
      }
    });
  }

  

  restoreSubject(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Restore Subject',
        message: 'Are you sure you want to restore this subject?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.removeSubject(id, {status: 'a'}).subscribe({
          next: data => {
            this.subjects = this.subjects.map(subj => subj.id != id ? subj : data)
          },
          error: err => {

          }
        })
      } else {  
      }
    });
  }

  // displayedColumns = ['subjectCode', 'description', 'department']

   private _listFilter: string = '';
   get listFilter(): string{ 
       return this._listFilter;
   }
   set listFilter(value: string){
       this._listFilter=value;
       this.filteredList = this.performFilter(value);
   }
   //pang filter
 
   filteredList: Subject[]=[]; //array ng filtered list

    performFilter(filterBy: string): Subject[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.subjects.filter((courses: Subject)=>
      courses.id.toString().toLowerCase().includes(filterBy)||
      courses.subject_code.toLowerCase().includes(filterBy)||
      courses.description.toLowerCase().includes(filterBy)||
      courses.department_id?.toString().toLowerCase().includes(filterBy)||
      courses.status.toLowerCase().includes(filterBy)||
      courses.department?.id.toString().toLowerCase().includes(filterBy)||
      courses.department?.department_code.toLowerCase().includes(filterBy)||
      courses.department?.description.toLowerCase().includes(filterBy)||
      courses.department?.chairs.toLowerCase().includes(filterBy)||
      // courses.department?.members.toLowerCase().includes(filterBy)||
      courses.department?.created_at.toLowerCase().includes(filterBy)||
      courses.department?.updated_at.toLowerCase().includes(filterBy)
      );
  }

  //paginator
  totalItems = this.subjects.length; // Total number of items in your table
  pageSize = 7; // Number of items to display per page
  pageSizeOptions = [7, 14, 28]; // Options for the number of items per page

  currentPageIndex = 0; // Current page index
  displayedItems: any[] = []; // The items to display on the current page
  //paginator

  //pang filter
  ngOnInit(): void {
    this.listFilter = '';
  }
  //pang filter

  //pang check kung may laman yung search input (para di mawalan ng laman yung table)
  ngDoCheck(): void{
    if(!this.listFilter){
      this.totalItems = this.subjects.length;
      this.loadPageWithoutFilter(this.currentPageIndex);
    }
    else{
      this.totalItems = this.filteredList.length;
      this.loadPageWithFilter(this.currentPageIndex);
    }
  }

  //pang check kung may laman yung search input (para di mawalan ng laman yung table)

  //paginator
  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPageWithoutFilter(this.currentPageIndex);
  }
  
  loadPageWithoutFilter(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.subjects.slice(startIndex, endIndex);
  }
  loadPageWithFilter(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.filteredList.slice(startIndex, endIndex);
  }
//paginator

viewPdf(ref: string){
  const dialogRef = this.viewPdfDialog.open(ViewPdfClass, {
    data: {
      ref
    }
  });
}

@ViewChild('dialogEditContent') EditSubjectDialogComponent!: TemplateRef<any>;
// const dialogRef = this.dialog.open(this.EditSubjectDialogComponent, { pang bukas nung dialog
//   data: subje
// });


}

@Component({
  selector: 'view-pdf',
  templateUrl: 'view-pdf.html',
})
export class ViewPdfClass {
  pdfLoc = 'http://127.0.0.1:8000/api/subjectsGetSyllabus/';
  myUrl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ViewPdfClass>,
    @Inject(MAT_DIALOG_DATA) public data: { ref: string }
  ) {
    this.myUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8000/api/subjectsGetSyllabus/' + data.ref);
  }
}

@Component({
  selector: 'assign-elective-sub',
  templateUrl: './assign-elective-sub.html',
})
export class AssignElectiveSubject {
  constructor(
    public dialogRef: MatDialogRef<AssignElectiveSubject>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private subjectService: SubjectService
  ) {

  }
  // electiveSubjects()
  get selectedElective(){
    return this.data.selectedElective
  }

  get electiveSubjects(){
    return this.data.electiveSubjects
  }


  submit(form: NgForm){
    const {track, index} = form.value

    let allSubject:any[] = []
    this.electiveSubjects.forEach((x:any ) => allSubject = [...allSubject, ...x.metadata])
    allSubject = allSubject.filter(a => a)

    if(allSubject.includes(this.selectedElective)){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Assign Elective',
          message: `This subject is already assigned as elective, do you want to continue?`,
          listMessage: ['this subject will be removed on other track that had it', 'this subject will be assign to selected track']
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let selected = this.electiveSubjects.find((x:any) => x.id == track)

          if(selected){
            selected = selected.metadata.map((x:number, i:number) => i != index ? x : this.selectedElective)
            
            this.subjectService.updateElectiveSubject(selected, track).subscribe(
              (data:any) => {
                this.dialogRef.close({data: JSON.parse(data.metadata), id: track})
              }
            )

          }

        }
      });
    }else{

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Assign Elective',
          message: `Are you sure you want to assign this subject to as Elective ${index + 1} ?`
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let selected = this.electiveSubjects.find((x:any) => x.id == track)

          if(selected){
            selected = selected.metadata.map((x:number, i:number) => i != index ? x : this.selectedElective)

            this.subjectService.updateElectiveSubject(selected, track).subscribe(
              (data:any) => {
                this.dialogRef.close({data: JSON.parse(data.metadata) , id: track})
              }
            )
          }
        }
      });
    }
  }
  onCancel(){
    this.dialogRef.close(false)
  }
}


@Component({
  selector: 'add-elective-subject',
  templateUrl: './add-elective-subject.html',
})


export class AddNewElectiveSubject{
  constructor(private subjectService: SubjectService, 
    public dialogRef: MatDialogRef<AddNewElectiveSubject>){}
  error$ = new subject<string>();
  success$ = new subject<string>()
  submit(form: NgForm){
    const fd = new FormData()

    fd.append('description', form.value.description)
    fd.append('syllabus', this.selectedFile)
    
    this.subjectService.addElective(fd) 
      .subscribe({
        next: data => {
          this.error$.next('')
          this.success$.next('Subject created Successfully')
        },
        error: (err:AppError) => {
          this.error$.next(err.message)
          this.success$.next('')
        }
      })
  }

  onCancel(){    
    this.dialogRef.close(false)
  }

  selectedFile:any 
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  closeAlert(){
    this.error$.next('')
  }

  closeSuccessAlert(){
    this.success$.next('')
  }
}



@Component({
  selector: 'edit-subject',
  templateUrl: './edit-subject.html',
})
export class EditSubject{
  constructor(private subjectService: SubjectService, 
    public dialogRef: MatDialogRef<EditSubject>, 
    @Inject(MAT_DIALOG_DATA) public data: any){}
  error$ = new subject<string>();
  success$ = new subject<string>()

  submit(form: NgForm){
    const fd = new FormData()
    
    if(form.value.description != this.subject.description) fd.append('description', form.value.description)
    if(this.selectedFile) fd.append('syllabus', this.selectedFile)
     
    this.subjectService.updateSubject(fd, this.type, this.subject.id) 
      .subscribe({
        next: data => {
          this.error$.next('')
          this.success$.next('Subject Updated Successfully')
          console.log(data);
          
        },
        error: (err:AppError) => {
          this.error$.next(err.message)
          this.success$.next('')
        }
      })
  }

  get type(){
    return this.data.type
  }

  get subject(){
    return this.data.subject
  }

  onCancel(){    
    this.dialogRef.close(false)
  }

  selectedFile:any 
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  closeAlert(){
    this.error$.next('')
  }

  closeSuccessAlert(){
    this.success$.next('')
  }
}

