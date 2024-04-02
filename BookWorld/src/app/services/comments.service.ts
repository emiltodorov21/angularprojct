import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../interfaces/Comments';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getAllComments(bookId:string):Observable<Comments[]> {
    let id = bookId;
   const URL = `http://localhost:3030/Books/Comments/${id}/All`
    return this.http.get<Comments[]>(URL);
  }

  addComment(comment:string, bookId:string, ownerId:string){
    console.log("BOOK ID IS", bookId)
    let id = bookId;
    let username = this.userService.getUsername;
    const URL = `http://localhost:3030/Books/Comments/${id}/Add`
    debugger;
    const body = {
      comment:comment,
      owner:ownerId,
      username:username,
    }
    return this.http.post(URL, body);
  }

  deleteComment(commentId:string, bookId:string) {
    debugger;
    let id = bookId;
    const URL = `http://localhost:3030/Books/Comments/${id}/Delete`
    return this.http.put(URL, {commentId:commentId})
  }
}
