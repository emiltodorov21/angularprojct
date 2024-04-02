import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Books } from '../interfaces/Books';
import { HttpClient } from '@angular/common/http';
import { json, text } from 'express';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  baseURL = "http://localhost:3030/Books"

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.baseURL);
  }

  addBook(book:Books) {
    // debugger;
    console.log("SERVICE CHECK BODY", book);

    return this.http.post(this.baseURL + "/Add", book , {responseType:"text"});
  }

  getOneBook ( id:string) {
    const urlBookId = this.baseURL+`/${id}`
    return this.http.get<Books>( urlBookId);
  }

  getOwnedBooks( ownerId: string) {
    const URL = this.baseURL+`/Owned/${ownerId}`
    return this.http.get<Books[]>(URL);
  }

  getWatchList( userId:string) {
    // try with pipe filtration, instead of doing it on the BE
    return this.http.get<Books[]>(this.baseURL).pipe(
      map(books => books.filter( book => book.watchedCounter?.includes(userId)))
    );
  }

  editBook ( book:Books, _id:string) {
    const urlBookId = this.baseURL+`/Edit/${_id}`
    console.log(" THE URL IS" , urlBookId);
    return this.http.put<Books>(urlBookId, book );
  }

  deleteBook (id:string) {
    const urlBookId = this.baseURL+`/Delete/${id}`
    return this.http.delete(urlBookId);
  }

  randomBook() {
    const randomURL = this.baseURL+`/Random`;
    return this.http.get<Books>(randomURL);
  }

  addToWatched(currentBookId:string, currentUserId:string) {
    console.log("CURRENT BOOK ID", currentBookId)
    console.log("CURRENT USER ID", currentUserId)
     const watchedURL =this.baseURL+`/Watched/${currentBookId}`
     return this.http.put(watchedURL, {currentUserId})
  }
}
