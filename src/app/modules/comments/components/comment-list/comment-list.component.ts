import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment, IFormValue } from '../../models/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments: IComment[] = [];
  @Output() commentEvent: EventEmitter<IFormValue> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickEdit(comment: IComment) {
    this.commentEvent.emit({
      id: comment.id,
      name: comment.name,
      comment_text: comment.comment_text,
      type: 'comment',
      action: 'edit',
      comment: comment
    });
  }

  onClickDelete(comment: IComment) {
    if (confirm('Are you sure to delete ?')) {
      this.commentEvent.emit({
        id: comment.id,
        name: comment.name,
        comment_text: comment.comment_text,
        type: 'comment',
        action: 'delete',
        comment: comment
      });
    }
  }

  onClickReply(comment: IComment) {
    this.commentEvent.emit({
      id: comment.id,
      name: comment.name,
      comment_text: comment.comment_text,
      type: 'reply',
      action: 'post',
      comment: comment
    });
  }
}
