import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  Allbooks: Books[]=[];
  currentBooks: any[] = [];
  searchBook: string = "";

  onClickSearch() {
    debugger;
    if(this.searchBook.trim() === "") {
      this.currentBooks = this.Allbooks;
    } else {
      this.currentBooks = this.Allbooks.filter ( (book) => book.name.toLowerCase().includes(this.searchBook.toLowerCase() ));
      console.log("ALL BOOKS ARR", this.Allbooks);
      console.log("CUR BOOKS ARR", this.currentBooks);
    }
  }

  constructor ( private bookService: BookServiceService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe( (books) => {
      console.log(books, "HERE ARE THE BOOKS");
      this.Allbooks = books
      this.currentBooks = books
    })
  }
}

