import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User[] = null;
  user : User = null;
  userSubject : BehaviorSubject<User[]>=null;
  subscriptionUser : Subscription = null;
  registerForm : FormGroup;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {

    this.userSubject=this.userService.getUsers();
    this.subscriptionUser=this.userSubject
        .subscribe(res => {
            this.users=res;
        });

        this.registerForm = new FormGroup({
          'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'password' : new FormControl(null, [Validators.required]),
          'password2' : new FormControl(null, [Validators.required]),
          'name' : new FormControl(null, [Validators.required]),
          'email' : new FormControl(null, [Validators.required,  Validators.email])
        });
  }

  onSubmit(){
    if(this.registerForm.value.password == this.registerForm.value.password2){
      this.user = this.registerForm.value;
      this.user.idUser = this.users.length;
      this.user.role = 1;
      this.userService.addUser(this.user);
      this.registerForm.reset();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      alert("Registered succesfully.");
    }
    else{
      
      alert("Passwords must match.");
    }
  }

}
