import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor( private userService: UserServiceService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localToken = localStorage.getItem('token');
    if (localToken) {
      let parsedInfo= JSON.parse(localToken as string);
      let token = parsedInfo.token;
      request = request.clone( {
        headers: request.headers.set (
          "Authorization", token
        )
      })
    }
    return next.handle(request).pipe(
      catchError( (Response: HttpErrorResponse) => {
        if (Response.status == 401) {
          localStorage.removeItem("token");
          this.userService.userSubject.next(false);
          console.log("THIS IS THE RESPONSE IN INTERCEPTOR", Response)
          this.router.navigateByUrl("/Login");
        }
        return throwError(() => Response)
      })
    );
  }
}
