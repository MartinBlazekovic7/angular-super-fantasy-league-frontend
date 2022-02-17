import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  userLogged : User = null;
  authenticated=false;
  authChangeSubscription : Subscription;

  constructor(private http: HttpClient, private authentication : AuthService, private userService: UserService, private router: Router) { 
    
  }

  ngOnInit() {

    this.userLogged = this.authentication.getUser();
    this.authenticated=this.authentication.isAuthenticated();
    this.authChangeSubscription=this.authentication.authChange
        .subscribe(res => {
          this.authenticated=this.authentication.isAuthenticated();
        });
  }

  checkLogin(){
    if(this.userLogged.username){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.authentication.logout();
  }

  ngOnDestroy(){
    this.authChangeSubscription.unsubscribe();
  }

}
