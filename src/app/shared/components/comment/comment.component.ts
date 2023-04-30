import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment'
import { NgForm } from '@angular/forms';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnChanges, OnInit{
  constructor(private commentService: CommentService){}

  // @Input() comments:any
  @Input() type: string = ''
  @Input() action: string = ''
  @Input() role: string = ''
  
  @Input() comments: Comment[] = []
  @Output() addComment = new EventEmitter()

  height:number = 700

  comment = {
    subject: '',
    body: ''
  }

  ngOnInit(): void {
    this.commentService.commentSuccess.subscribe(
      data => {
        this.comment.subject = ''
        this.comment.body = ''
      }
    )
  }

  ngOnChanges(){
    if(this.type == 'view' && this.role == 'reviewer') 
      this.height = 450
  }

  submit(commentForm: NgForm){
    this.addComment.emit(commentForm.value)
  }
}
