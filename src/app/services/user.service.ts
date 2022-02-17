import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject(null);


  constructor(private http:HttpClient, private dataService:DataService) {
      this.init()
  }

  init(){

      this.dataService.getUsers()
          .subscribe(res => {
              this.users=res;
              this.userSubject.next([...this.users]);
          })

  }

  getUsers(){
      return this.userSubject;
  }

  addUser(user){
    this.dataService.addUser(user)
        .subscribe((res => {
            this.users.push(user);
            this.userSubject.next([...this.users]);
        }));
  }
}