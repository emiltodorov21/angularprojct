import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { minusValidator, trimValidator } from './EditBookCustomVal';
import { Books } from 'src/app/interfaces/Books';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-edit-book-page',
  templateUrl: './edit-book-page.component.html',
  styleUrls: ['./edit-book-page.component.css']
})
export class EditBookPageComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private bookService: BookServiceService,
    private router: Router, private route: ActivatedRoute, private userService: UserServiceService) {
  }

  editBookForm = this.fb.group({
    name: ["", [Validators.required, trimValidator, Validators.maxLength(30)]],
    picture: ["", [Validators.required, trimValidator]],
    genre: ["", [Validators.required, trimValidator, Validators.maxLength(30)]],
    year: [0, [Validators.required, Validators.minLength(4), Validators.maxLength(4), minusValidator]],
    summary: ["", Validators.required],
    actors: "",
    director: ""
  })

  isSubmitted: boolean = false;
  BookId: string = ""
  userId: string = this.userService.getUserId;

  get name() {
    return this.editBookForm.get("name");
  }

  get picture() {
    return this.editBookForm.get("picture");
  }

  get genre() {
    return this.editBookForm.get("genre");
  }

  get year() {
    return this.editBookForm.get("year");
  }

  get summary() {
    return this.editBookForm.get("summary");
  }

  get actors() {
    return this.editBookForm.get("actors");
  }

  get director() {
    return this.editBookForm.get("director");
  }

  onSubmit() {
    debugger;
    this.isSubmitted = true;
    console.log(this.editBookForm.getRawValue());
    if (this.editBookForm.valid) {
      const body: Books = this.editBookForm.value as unknown as Books;
      this.bookService.editBook(body, this.BookId).subscribe((info) => console.log("SUCCESS", info));
      this.router.navigateByUrl(`/Books/${this.BookId}`);
    }
  }

  ngOnInit(): void {
    const currentId = this.route.snapshot.params["id"];
    this.bookService.getOneBook(currentId).subscribe((bookData) => {
      this.editBookForm.patchValue(bookData)
      this.BookId = bookData._id as string;
      if (bookData.ownerId !== this.userId) {
        this.router.navigateByUrl('/Catalog');
      }
    })
  }
}
