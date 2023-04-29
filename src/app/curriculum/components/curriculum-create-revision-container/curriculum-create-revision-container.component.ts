import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, catchError, combineLatest, map, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { Comment } from 'src/app/core/models/comment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';
import { subjects } from '../year-dropdown/year-dropdown.component';

@Component({
  selector: 'app-curriculum-create-revision-container',
  templateUrl: './curriculum-create-revision-container.component.html',
  styleUrls: ['./curriculum-create-revision-container.component.css']
})
export class CurriculumCreateRevisionContainerComponent{

  constructor(private curriculumService: CurriculumService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private dialog: MatDialog,
              private router: Router
    ){}
  
  errorMessage$ = new Subject<string>()

  currentUser!:User

  neededData$ = combineLatest([
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

      this.currentUser = user
      this.userId = this.currentUser.id
      this.role = this.currentUser.role
      this.comments = comments.filter(comment => comment.curriculum_id == id)

      this.title = `CICT ${this.curriculum.department.department_code} Curriculum version ${this.curriculum.version}`

      this.subjects = JSON.parse(this.curriculum.metadata).subjects
      this.electiveSubjects = JSON.parse(this.curriculum.metadata).electiveSubjects
      
      this.curriculumDepartment = this.curriculum.department_id
      this.status = this.curriculum.status   
      this.author = this.curriculum?.user?.profile?.name || 'not set his/her name yet'
      this.isLoading = false
    }),
    catchError(err => {
      console.log(err);
      
      this.error = true
      this.isLoading = false
      return EMPTY
    })
  )
  curriculumDepartment:any = ''
  currUserId:any = 0
  userId:any = 0
  comments: Comment[] = []
  isLoading:boolean = true
  error:boolean = false
  curriculum: Curriculum2 | any
  descriptiveTitle:string = 'revising'
  electiveSubjects:any[] = []
  subjects:subjects[] = [
    {
      firstSem: [],
      secondSem: [],
    }
  ]
  role:any = ''
  type:string = ''
  action:string = ''
  title:string = ''
  author:any = ''
  created_at:string = ''
  status:string = ''
  buttonTxt = 'submit revision'

  canCreateRevision(){
    return this.role !== 'reviewer'
  }

  submit(subjects: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Create Revision',
        message: 'Are you sure you want to create this revision?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {...subjects, metadata: {
          subjects: subjects.subjects,
          electiveSubjects: subjects.electiveSubjects,
          }, 
        curriculumId: this.curriculum.id
        }
        
        // const data = { curriculumId: this.curriculum.id, metadata: subjects.subjects, version: subjects.version }
        
        this.curriculumService.createRevision(data).subscribe({
          next: (data:any) => {
            this.router.navigate(['/curriculums', 'revisions', data.curriculum.id])
          },
          error: err => console.log(err)
        })
      } else {
      }
    });
  }


   
}
