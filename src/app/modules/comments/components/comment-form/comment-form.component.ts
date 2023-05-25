import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormValue } from '../../models/comment'
import { CommentApiService } from '../../services/comment-api.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input('comment') comment!: IFormValue;
  @Output() formEmit: EventEmitter<{ reload: boolean }> = new EventEmitter();

  btnText: string = 'Submit';

  commentForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    comment: ['', Validators.required],
    type: ['comment']
  });

  ngOnChanges(): void {
    this.commentForm.patchValue({
      id: this.comment?.id || '',
      name: this.comment?.name || '',
      comment: this.comment?.comment_text || '',
      type: this.comment?.type || 'comment'
    });
  }

  constructor(private fb: FormBuilder, private apiService: CommentApiService) { }

  ngOnInit(): void {

  }

  getHeading(): string {
    if (this.commentForm.get('type')?.value == "reply") {
      return `Reply to ${this.comment.comment?.name}`
    }

    return `${this.commentForm.get('id')?.value ? 'Update' : 'Post'} Comment`;
  }

  onSubmit() {
    const { id, type } = this.commentForm.value;

    if (type == 'comment') {
      id ? this.updateComment() : this.postComment();
    }
    else {
      this.postReply()
    }
  }

  onClickCancel() {
    this.commentForm.reset();
    this.commentForm.patchValue({
      id: '',
      name: '',
      comment: '',
      type: 'comment'
    });
  }

  postComment() {
    this.apiService.postComment(this.commentForm.value).subscribe(res => {
      this.formEmit.emit({ reload: true });
      this.onClickCancel();
    });
  }

  updateComment() {
    this.apiService.updateComment(this.commentForm.value).subscribe(res => {
      this.formEmit.emit({ reload: true });
      this.onClickCancel();
    })
  }

  postReply() {
    this.apiService.replyComment(this.commentForm.value).subscribe(res => {
      this.formEmit.emit({ reload: true });
      this.onClickCancel();
    })
  }

}
