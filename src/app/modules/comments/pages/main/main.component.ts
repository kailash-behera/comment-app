import { Component, OnInit } from '@angular/core';
import { CommentApiService } from '../../services/comment-api.service';
import { IComment, IFormValue } from '../../models/comment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  comment!: IFormValue;
  comments: IComment[] = [];

  constructor(private apiService: CommentApiService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.apiService.getComments().subscribe(comments => this.comments = comments);
  }

  onFormEmit(event: { reload: boolean }) {
    if (event.reload) {
      this.getComments()
    }
  }

  onCommentEmit(comment: IFormValue) {
    if (comment.type == 'reply') {
      this.comment = {
        id: comment.id,
        name: '',
        comment_text: '',
        type: 'reply',
        action: 'post',
        comment: comment.comment
      }
    }
    else {
      if (comment.action == 'edit') {
        this.comment = comment;
      }

      if (comment.action == 'delete') {
        this.apiService.deleteComment(comment.id).subscribe((res: any) => {
          this.getComments();
          alert(res.message);
        });
      }
    }
  }
}
