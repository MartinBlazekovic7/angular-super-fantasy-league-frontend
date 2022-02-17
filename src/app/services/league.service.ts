import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { LeagueTable } from '../models/league-table.model';
import { League } from '../models/league.model';
import { UserLeague } from '../models/user-league.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  allLeagues : League[] = [];
  allLeagueSubject : BehaviorSubject<League[]> = new BehaviorSubject(null);

  userLeagues : UserLeague[] = [];
  userLeagueSubject : BehaviorSubject<UserLeague[]> = new BehaviorSubject(null);

 userLeagueTable : LeagueTable[] = [];
 userLeagueTableSubject : BehaviorSubject<LeagueTable[]> = new BehaviorSubject(null);


  constructor(private http:HttpClient, private dataService:DataService) { 
    this.init();
  }

  init(){
    this.dataService.getLeagues()
          .subscribe(res => {
              this.allLeagues=res;
              this.allLeagueSubject.next([...this.allLeagues]);
          })
  }

  getAllLeagues(){
    return this.allLeagueSubject;
  }

  getUserLeagues(user){
    this.dataService.getUserLeagues(user)
        .subscribe((res => {
            this.userLeagues = res;
            this.userLeagueSubject.next([...this.userLeagues]);
        }));
    return this.userLeagueSubject;
  }

  addLeague(league){
    this.dataService.addLeague(league)
        .subscribe((res => {
            this.allLeagues.push(league);
            this.allLeagueSubject.next([...this.allLeagues]);
        }));
  }

  addUserToLeague(userLeague){
    this.dataService.addUserToLeague(userLeague)
        .subscribe((res => {
            this.userLeagues.push(userLeague);
            this.userLeagueSubject.next([...this.userLeagues]);
        }));
  }

  getLeagueTable(id){
    this.dataService.getLeagueTable(id)
        .subscribe((res => {
            this.userLeagueTable = res;
            this.userLeagueTableSubject.next([...this.userLeagueTable]);
        }));
    return this.userLeagueTableSubject;
  }
}
