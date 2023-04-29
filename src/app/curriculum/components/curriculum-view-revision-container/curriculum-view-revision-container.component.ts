import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, catchError, combineLatest, map, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { Comment } from 'src/app/core/models/comment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/core/models/user';


@Component({
  selector: 'app-curriculum-view-revision-container',
  templateUrl: './curriculum-view-revision-container.component.html',
  styleUrls: ['./curriculum-view-revision-container.component.css']
})
export class CurriculumViewRevisionContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
              private commentService: CommentService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router
  ){}
  
  isLoading:boolean = true
  error: boolean = false
  currUserId:any = 0
  userId:any = 0
  currentUser!:User
  electiveSubjects:any[] = []
  curriculumDepartment:any = ''

  neededData$ = combineLatest([
    this.route.data,
    this.authService.getCurrentUser(),
    this.curriculumService.revisions$,
    this.commentService.comments$,
    this.route.params.pipe(
      map(({id}) => id)
    )
  ]).pipe(
    tap(([data, user, revisions, comments, id]) => {
      this.type = data['type']
      this.action = data['action']

      this.curriculum = revisions.find((curriculum:any) => curriculum.id == id)
      this.currUserId = this.curriculum.user_id

      this.currentUser = user
      this.userId = this.currentUser.id
      this.role = this.currentUser.role
      this.comments = comments.filter(comment => comment.curriculum_revision_id == id)

      this.title = `CICT ${this.curriculum.curriculum.department.department_code} Curriculum version ${this.curriculum.version}`
      

      this.subjects = JSON.parse(this.curriculum.metadata).subjects
      this.electiveSubjects = JSON.parse(this.curriculum.metadata).electiveSubjects
      this.curriculumDepartment = this.curriculum.curriculum.department_id

      this.status = this.curriculum.status   
      this.author = this.curriculum?.user?.profile?.name || 'has not set his/her name yet'
      this.isLoading = false

    }),
    catchError(err => {
      this.error = true
      this.isLoading = false
      return EMPTY
    })
  )

  canEdit():boolean{
    return this.curriculum.user_id == this.currentUser.id
  }

  role:any = ''

  type:string = ''
  action:string = ''
  comments:Comment[] = []
  created_at: string = ''
  author: string = ''


  curriculum: any
  subjects:any[] = []
  title = ''
  status = ''
  curriculum$ = new Observable()

  addComment(data:any){
    const comment = {...data, curriculumRevisionId: this.curriculum.id}
    this.commentService.addComment(comment).subscribe({
      next: data => {
        this.comments.unshift(data)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  approve(){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Approve Revision',
        message: 'Are you sure you want to approve this revision?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.curriculumService.approveRevision(this.curriculum.id).subscribe({
          next: response => {
            this.curriculum.status = 'a'
            this.status = 'a'
          },
          error: err => {
            
          }
        })
      } else {
      }
    });

  }
  // revision/edit/:id
  edit(){
    this.router.navigate(['/curriculums', 'revision', 'edit', this.curriculum.id])
    console.log('edit');
  }
 

  ngOnInit(): void {
    // this.route.data.subscribe((data:any) => {
    //   this.type = data.type
    //   this.action = data.action
    // })

    // this.route.params.subscribe(({id}) => {
    //   this.curriculum$ = this.curriculumService.getRevisionCurriculum(+id).pipe(
    //     tap((curriculum:any) => {
    //       this.curriculum = curriculum
    //       console.log(curriculum);
          
    //       this.subjects = JSON.parse(curriculum.metadata)
    //       this.title = `CICT ${curriculum.curriculum.department.department_code} Curriculum version ${curriculum.curriculum.version}`
    //       this.status = curriculum.status    
    //       this.author = curriculum.user.profile.name
    //       this.created_at = curriculum.created_at

    //       this.commentService.getRevisionComments(this.curriculum.id).pipe(
    //         tap(comments => this.comments = comments)
    //       ).subscribe()
    //     })
    //   )
    // })
  }


}