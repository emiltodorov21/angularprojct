import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private bookService:BookServiceService) {}
  randomBook?:Books;

  ngOnInit(): void {
    this.bookService.randomBook().subscribe ( (book)=> {
      this.randomBook = book;
    })
  }
}
