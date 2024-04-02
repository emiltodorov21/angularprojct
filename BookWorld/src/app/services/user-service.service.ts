import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/Users';
import { BehaviorSubject , Observable, tap , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private http: HttpClient ) { 
    // this.userObservable.subscribe ( (user) => {
    //   this.user = user;
    // })
  }

  userSubject = new BehaviorSubject<boolean>(this.existingToken);
  userObservable = this.userSubject.asObservable();
  // user:any = undefined;

  // get getUserId():string{
  //   return this.user.userId;
  // }

  // get userToken():string {
  //   return this.user.token;
  // }

  private get existingToken():boolean {
    debugger;
    let doesExist = localStorage.getItem("token");
    if (doesExist) {
      return true
    } else {
      return false;
    }
  }

  checkLoggedIn():Observable<boolean> {
    return this.userObservable
  }

  // loginUser(loginInfo:Users) {
  //   debugger;
  //   const loginURL = "http://localhost:3030/Users/Login";
  //   return this.http.post(loginURL,loginInfo).pipe
  //   (tap( (token) => {
  //     this.userSubject.next(token);
  //     })
  //   )

  // }

  loginUser(loginInfo:Users) {
    debugger;
    const loginURL = "http://localhost:3030/Users/Login";
    return this.http.post(loginURL,loginInfo).pipe
    (tap( (token) => {
      this.userSubject.next(true);
      })
    )

  }

  registerUser(loginInfo:Users) {
    const loginURL = "http://localhost:3030/Users/Register";
    return this.http.post(loginURL,loginInfo)

  }

  logoutUser() {
    this.userSubject.next(false);
  }

  get getToken() {
    let userData= (localStorage.getItem('token'))
    let parsedInfo= JSON.parse(userData as string);
    return parsedInfo.token;

  }

  get getUserId() {
    let userData= (localStorage.getItem('token'))
    let parsedInfo= JSON.parse(userData as string);
    if (parsedInfo) {
      return parsedInfo.userId;
    }
    else {
      return null
    }
  }

  get getUsername() {
    let userData= (localStorage.getItem('token'))
    let parsedInfo= JSON.parse(userData as string);
    if (parsedInfo) {
      return parsedInfo.username;
    }
    else {
      return null
    }
  }

}
