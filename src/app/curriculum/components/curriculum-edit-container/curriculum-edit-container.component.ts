import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, catchError, combineLatest, map, tap } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-curriculum-edit-container',
  templateUrl: './curriculum-edit-container.component.html',
  styleUrls: ['./curriculum-edit-container.component.css']
})
export class CurriculumEditContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private commentService: CommentService,
              private dialog: MatDialog
  ){}
  errorMessage:string = ''
  isLoading:boolean = true
  neededData = combineLatest([
    this.route.data,
    this.authService.getCurrentUser(),
    this.curriculumService.curriculums$,
    this.commentService.comments$,
    this.route.params.pipe(
      map(({id}) => id)
    )
  ]).pipe(
    tap(([data, user, curriculums, comments, id]) => {
      
      this.type = data['type']
      this.action = data['action']

      this.curriculum = curriculums.find(curriculum => curriculum.id == id)
      this.currUserId = this.curriculum.user_id
      this.departmentId = this.curriculum.department_id

      this.currentUser = user
      this.userId = this.currentUser.id
      this.role = this.currentUser.role
      this.comments = comments.filter(comment => comment.curriculum_id == id)
      
      this.subjects = JSON.parse(this.curriculum.metadata).subjects
      this.electiveSubjects = JSON.parse(this.curriculum.metadata).electiveSubjects
      this.title = `CICT ${this.curriculum.department.department_code} Curriculum version ${this.curriculum.version}`
      this.status = this.curriculum.status   
      this.author = this.curriculum?.user?.profile?.name || 'name not set yet'
      this.isLoading = false

    }),
    catchError(err => {
      this.errorMessage = 'something happened, please reload the page'
      this.isLoading = false
      return EMPTY
    })
  )
  departmentId:any = ''
  currentUser!:User
  userId:any = 0
  currUserId:any = 0
  electiveSubjects:any[] = []
  currentUser$ = this.authService.getCurrentUser().pipe(
    tap(user => {      
      this.role = user.role
      this.currentUser = user
      this.userId = user.id
    })
  )

  canEdit():boolean{
    return this.currUserId == this.userId
  }


  submit(data: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Update Curriculum',
        message: 'Are you sure you want to update this curriculum?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(data);
        
        // const body = {subjects: data.subjects, version: data.version, departmentId: result.departmentId}
        const body = {...data, subjects: { subjects: data.subjects, electiveSubjects: data.electiveSubjects }}

        
        this.curriculumService.updateCurriculum(this.curriculum.id, body).subscribe({
          next: (response:any) => {
            this.router.navigate(['/curriculums', response.id])
          },
          error: err => {

          }
        })

      } else {
      }
    });
  }



  role:any = ''
  comments:Comment[] = []
  curriculum:Curriculum2 | any
  type:string = ''
  action:string = ''
  descriptiveTitle:string = 'editing pending curriculum'
  author:any = ''
  subjects:any[] = []
  title = ''
  status = ''
  // curriculum$ = new Observable()
  buttonTxt = 'edit curriculum'

  ngOnInit(): void {

    // this.route.data.subscribe((data:any) => {
    //   this.type = data.type
    //   this.action = data.action
    // })
    // this.route.params.subscribe(({id}) => {
    //   this.curriculum$ = this.curriculumService.getCurriculum(+id).pipe(
    //     tap((curriculum:any) => {
    //     this.curriculum = curriculum
    //     // console.log(curriculum);
    //     this.currUserId = curriculum.user_id

    //     this.subjects = JSON.parse(curriculum.metadata)
    //     this.title = `CICT ${curriculum.department.department_code} Curriculum version ${curriculum.version}`
    //     this.status = curriculum.status   
    //     this.author = curriculum.user.profile.name

    //     this.commentService.getCurriculumComments(this.curriculum.id).pipe(
    //       tap(comments => this.comments = comments)
    //     ).subscribe(
    //       data => console.log(data)
    //     )
    //     })
    //   )
    // })
  }
}
