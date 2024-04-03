import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trimValidator } from '../add-book-page/AddBookCustomVal';
import { comparePasswords } from './ValidatorComparePass';
import { Users } from 'src/app/interfaces/Users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private fb: FormBuilder, private router: Router, private userService: UserServiceService){

  }

  registerForm = this.fb.group ( {
    name: ["", [Validators.required, trimValidator, Validators.maxLength(20)]],
    password: ["", [Validators.required, trimValidator, Validators.maxLength(30), Validators.minLength(5)]],
    rePassword: ["", [Validators.required, trimValidator]],
  }, { validator: comparePasswords} as AbstractControlOptions)

  isSubmitted:boolean = false;
  serverReturnedError:string ="";

  get name(){
    return this.registerForm.get("name");
   }
  get password(){
    return this.registerForm.get("password")
  }
  get rePassword(){
    return this.registerForm.get("rePassword")
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const regBody: Users = { 
        username: this.name?.value as unknown as string,
        password: this.password?.value as unknown as string
      }
      console.log("FE REG INFO IS", regBody);
      this.userService.registerUser(regBody).subscribe( {
        next: (token) => {
          console.log("RETURNED TOKEN",token)
          this.router.navigateByUrl("/Login");
        },
        error: (err) => {
          console.log("RETURNED ERROR", err.error.message);
          this.serverReturnedError = err.error.message;
        }
       
      })
    }
  }
  
}
