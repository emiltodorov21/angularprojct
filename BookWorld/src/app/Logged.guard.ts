import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

    constructor(private router: Router) {}
  
    canActivate(): boolean {
      let token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/Catalog']);
        return false;
      } else {
        return true;
      }
    }
  }