import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  isLoggedIn:boolean = false;
  constructor ( private userService: UserServiceService, private router:Router) {
  }


  logoutFunc() {
    console.log(this.isLoggedIn);
    this.userService.logoutUser();
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Catalog")
  }

  ngOnInit(): void {
  this.userService.checkLoggedIn().subscribe ( (log)=> {
    this.isLoggedIn = log 
  })
  }
}
