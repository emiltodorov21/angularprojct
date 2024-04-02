import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { faCalendarDays, faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { trimValidator } from '../add-book-page/AddBookCustomVal';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit{
  faCalendarDays = faCalendarDays;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  currentBook: Books|undefined;
  isLoaded: boolean = false;
  bookId: string = "";
  summary:string = "";
  currentUserId:string|null = "";
  seeMore:boolean = false;
  hasWatched:boolean = false;
  hasError:boolean = false;

  constructor(private route:ActivatedRoute , 
    private bookService:BookServiceService , 
    private router: Router , 
    private userService:UserServiceService,
    private fb: FormBuilder) {
  }

  seeMoreClickFunction() {
    console.log("Button Clicked");
    this.seeMore = !this.seeMore;
    console.log("CHECK THE USER ID", this.currentUserId)
  }

  deleteBookFunction() {
    const deleteId = this.currentBook?._id as string;
    this.bookService.deleteBook(deleteId).subscribe();
    this.router.navigateByUrl("/Catalog")
  }

  addToWatchFunc() {
    const currentBookId:string = this.bookId;
    const currentUserId:string = this.currentUserId as string;
    this.bookService.addToWatched(currentBookId, currentUserId).subscribe();
    this.hasWatched = !this.hasWatched;
  }

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserId;
    const currentId = this.route.snapshot.params["id"];
    this.bookService.getOneBook(currentId).subscribe ( (book) => {
      if(book === null) {
        console.log("THERE WAS ERROR, NO BOOK NAME")
        this.hasError = true;
      }
      this.currentBook = book;
      this.summary = this.currentBook.summary as string
      this.bookId = this.currentBook._id as string
      if (book.watchedCounter?.includes(this.currentUserId as string)) {
        this.hasWatched = true
      } else {
        this.hasWatched = false
      }
      
    },(error) => {
      console.log("THERE WAS ERROR")
      this.isLoaded = true;
      this.hasError = true;
    }
    )
  }
}
