import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { subjects } from '../curriculum-view/curriculum-view.component';
import { CommentService } from 'src/app/core/services/comment.service';
import { Comment } from 'src/app/core/models/comment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-curriculum-create-revision-container',
  templateUrl: './curriculum-create-revision-container.component.html',
  styleUrls: ['./curriculum-create-revision-container.component.css']
})
export class CurriculumCreateRevisionContainerComponent implements OnInit{

  constructor(private curriculumService: CurriculumService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private dialog: MatDialog,
              private router: Router
    ){}
  
  errorMessage$ = new Subject<string>()

  currentUser!:User
  currentUser$ = this.authService.getCurrentUser().pipe(
    tap(user => {      
      this.role = user.role
      this.currentUser = user
    })
  )

  comments: Comment[] = []
  isLoading:boolean = true
  curriculum!: Curriculum2
  descriptiveTitle:string = 'revising'
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
        console.log('confirm');
        
        const data = { curriculumId: this.curriculum.id, metadata: subjects.subjects, version: subjects.version }
        
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

  ngOnInit(): void {
    this.route.data.subscribe((data:any) => {
        
      this.type = data.type
      this.action = data.action
    })

    this.route.params.subscribe(({id}) => {
      this.curriculumService.getCurriculum(id).subscribe({
        next: curriculum => {
          this.curriculum = curriculum
          
          // console.log(JSON.parse(data.metadata))
          this.subjects = JSON.parse(curriculum.metadata)
          this.title = `CICT ${curriculum.department.department_code} Curriculum version ${curriculum.version}`
          this.author = curriculum.user?.profile?.name

          this.commentService.getCurriculumComments(this.curriculum.id).pipe(
            tap(comments => this.comments = comments)
          ).subscribe()
          
        },
        error: err => {
          this.errorMessage$.next(err.message)
        },
      })
    })
  }
   
}
