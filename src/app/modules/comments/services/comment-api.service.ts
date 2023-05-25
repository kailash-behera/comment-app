import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<IComment[]>(`${environment.baseUrl}/comments`);
  }

  postComment(payload: IComment) {
    return this.http.post<IComment>(`${environment.baseUrl}/comments`, payload)
  }

  deleteComment(comment_id: string) {
    return this.http.delete(`${environment.baseUrl}/comments/${comment_id}`);
  }

  updateComment(payload: IComment) {
    return this.http.put(`${environment.baseUrl}/comments/${payload.id}`, payload);
  }

  replyComment(payload: IComment) {
    return this.http.post(`${environment.baseUrl}/comments/${payload.id}/reply`, {
      ...payload
    });
  }
}
