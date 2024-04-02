import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { faInfoCircle, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-watch-list',
  templateUrl: './my-watch-list.component.html',
  styleUrls: ['./my-watch-list.component.css']
})
export class MyWatchListComponent implements OnInit {
 constructor(private bookService: BookServiceService, 
  private userService: UserServiceService, private router:Router
  ){}
watchList:Books[] = [];
 userId:string = "";
 faInfoCircle = faInfoCircle;
 faSquareMinus = faSquareMinus;

 detailPageFuncClick(id:string|undefined) {
  let bookId = id as unknown as string;
  this.router.navigateByUrl(`Books/${bookId}`);
 }

 deleteWatchedFunc(id:string|undefined) {
  let currentBookId = id as unknown as string;
  let currentUserId = this.userId;
  this.bookService.addToWatched(currentBookId, currentUserId ).subscribe();
  let filtered = this.watchList.filter( (book) => {
    return book._id !== currentBookId;
  })
  this.watchList = filtered;
 }

 ngOnInit(): void {
  this.userId = this.userService.getUserId
   this.bookService.getWatchList(this.userId).subscribe( (value => {
    this.watchList  = value;
   }))
 }
}
