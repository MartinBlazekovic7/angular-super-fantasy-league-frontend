import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { FullPlayer } from '../models/full-player.model';
import { TeamPlayers } from '../models/team-players.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  allTeams : Team[] = [];
  allTeamSubject : BehaviorSubject<Team[]> = new BehaviorSubject(null);


  teams : Team[] = [];
  teamSubject : BehaviorSubject<Team[]> = new BehaviorSubject(null);

  userTeams : TeamPlayers[] = [];
  userTeamSubject : BehaviorSubject<TeamPlayers[]> = new BehaviorSubject(null);

  usersTeam : FullPlayer[] = [];
  usersTeamSubject : BehaviorSubject<FullPlayer[]> = new BehaviorSubject(null);

  constructor(private http:HttpClient, private dataService:DataService) {
    this.init()
  }

  init(){

    this.dataService.getTeams()
          .subscribe(res => {
              this.allTeams=res;
              this.allTeamSubject.next([...this.allTeams]);
          })
  }

  getAllTeams(){
    return this.allTeamSubject;
}

  getTeam(id){
    this.dataService.getTeam(id)
        .subscribe((res => {
            this.teams = res;
            this.teamSubject.next([...this.teams]);
        }));
    return this.teamSubject;
  }

  addTeam(team){
    this.dataService.addTeam(team)
        .subscribe((res => {
            this.teams.push(team);
            this.teamSubject.next([...this.teams]);
        }));
  }

  addUserTeam(userTeam){
    this.dataService.addUserTeam(userTeam)
        .subscribe((res => {
            this.userTeams.push(userTeam);
            this.userTeamSubject.next([...this.userTeams]);
        }));
  }

  getUsersTeam(name){
    this.dataService.getUsersTeam(name)
        .subscribe((res => {
            this.usersTeam = res;
            this.usersTeamSubject.next([...this.usersTeam]);
        }));
    return this.usersTeamSubject;
  }


}
