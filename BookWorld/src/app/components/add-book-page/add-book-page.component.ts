import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Books } from 'src/app/interfaces/Books';
import { BookServiceService } from 'src/app/services/book-service.service';
import { minusValidator, trimValidator } from './AddBookCustomVal';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.css']
})
export class AddBookPageComponent {
 constructor ( private fb:FormBuilder, private bookService: BookServiceService , private router:Router,
  private userService: UserServiceService) {

 }

 addBookForm = this.fb.group({
  name: ["", [Validators.required, trimValidator, Validators.maxLength(30)]],
  picture: ["", [Validators.required, trimValidator]],
  genre:["", [Validators.required, trimValidator,Validators.maxLength(30)]],
  year: ["", [Validators.required, minusValidator, Validators.minLength(4), Validators.maxLength(4)]],
  summary:["", Validators.required],
  actors: "",
  director: ""
 })

 isSubmitted:boolean = false;

 get name(){
  return this.addBookForm.get("name");
 }

 get picture(){
  return this.addBookForm.get("picture");
 }

 get genre(){
  return this.addBookForm.get("genre");
 }

 get year(){
  return this.addBookForm.get("year");
 }

 get summary(){
  return this.addBookForm.get("summary");
 }

 userId = this.userService.getUserId;

 onSubmit() {
  this.isSubmitted = true;
  console.log(this.addBookForm.getRawValue());
  if ( this.addBookForm.valid ) {
    const body:Books = {...this.addBookForm.value as unknown as Books , ownerId: this.userId};
    this.bookService.addBook(body).subscribe( (info)=> console.log("SUCCESS", info));
    this.router.navigateByUrl("/Catalog");
  }
 }

}
