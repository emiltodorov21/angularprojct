import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit{
  constructor(private userService:UserServiceService, private bookService:BookServiceService){}
  myBooks:Books[] = [];
  userId:string = this.userService.getUserId;

  ngOnInit(): void {
    this.bookService.getOwnedBooks(this.userId).subscribe( (books)=> {
      this.myBooks = books;
    })
  }
}
