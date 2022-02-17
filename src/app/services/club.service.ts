import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  clubs : Club[] = [];
  clubSubject : BehaviorSubject<Club[]> = new BehaviorSubject(null);

  constructor(private http:HttpClient, private dataService:DataService) {
    this.init()
}

init(){

    this.dataService.getClubs()
        .subscribe(res => {
            this.clubs=res;
            this.clubSubject.next([...this.clubs]);
        })

}

getClubs(){
    return this.clubSubject;
}
}
