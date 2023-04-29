import { Component, OnInit } from '@angular/core';
import { subjects } from '../year-dropdown/year-dropdown.component';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, catchError, combineLatest, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-curriculum-create-container',
  templateUrl: './curriculum-create-container.component.html',
  styleUrls: ['./curriculum-create-container.component.css']
})
export class CurriculumCreateContainerComponent{
  constructor(private curriculumService: CurriculumService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute
              ){}

  
  isLoading:boolean = true
  error:boolean = false
  currentUser!:User

  
  neededData$ = combineLatest([
    this.route.data,
    this.authService.getCurrentUser()
  ]).pipe(
    tap(([data, user]) => {
      this.type = data['type']
      this.action = data['action']
      this.role = user.role
      this.userDeptId = user.department_id
      this.currentUser = user
      this.isLoading = false
    }),
    catchError(err => {
      this.isLoading = false
      this.error = true
      return EMPTY
    })
  )


  canCreate(){
    return this.role != 'reviewer'
  }

  userDeptId:string = ''
  role:any = ''
  subjects = []
  type:string = ''
  action:string = ''
  subject :subjects[] = [{
    firstSem: [],
    secondSem: []
  }]
  buttonTxt = 'Create Curriculum'
 
  submit(subj: any){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Create Curriculum',
        message: 'Are you sure you want to create this curriculum?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {...subj, subjects: {
          subjects: subj.subjects,
          electiveSubjects: subj.electiveSubjects
        }}
        
        this.curriculumService.createCurriculum(data).subscribe({
          next: curriculum => {
            this.router.navigate(['/curriculums', curriculum.id])
          },
          error: err => {
            console.log(err);
          }
        })
        
      } else {
      }
    });

  }

  canDeactivate(){
    return confirm('Are you sure you want to discard your changes?');
  }
}

export function canDeactivateFn(component: CurriculumCreateContainerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  return component.canDeactivate();
}