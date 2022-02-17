import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { League } from '../models/league.model';
import { User } from '../models/user.model';
import { LeagueService } from '../services/league.service';
import { UserLeague } from '../models/user-league.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeagueTable } from '../models/league-table.model';
import { TeamService } from '../services/team.service';
import { FullPlayer } from '../models/full-player.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  subscriptionUser : Subscription = null;
  userLogged : User = null;

  allLeagues : League[] = [];
  allLeagueSubject : BehaviorSubject<League[]> = new BehaviorSubject(null);

  userLeagueIds : UserLeague[] = [];
  userLeagueSubject : BehaviorSubject<UserLeague[]> = new BehaviorSubject(null);

  userLeagues : League[] = [];

  showingLeagues : boolean = false;
  showingCreateLeagues : boolean = false;
  showingJoinLeagues : boolean = false;

  joinedLeague : boolean = false;

  createLeagueForm : FormGroup;
  createdEmptyLeague : League = {
    idFl : 0,
    name : '',
    code : ''
  }

  joinLeagueForm : FormGroup;

  userLeagueTable : LeagueTable[] = [];
  userLeagueTableSubject : BehaviorSubject<LeagueTable[]> = new BehaviorSubject(null);

  showingLeagueTable : boolean = false;

  usersTeam : FullPlayer[] = [];
  usersTeamSubject : BehaviorSubject<FullPlayer[]> = new BehaviorSubject(null);

  showingUserTeam : boolean = false;

  constructor(private leagueService : LeagueService, private authentication : AuthService, private router : Router, private teamService : TeamService) { }

  ngOnInit() {
    this.userLogged = this.authentication.getUser();

    this.allLeagueSubject=this.leagueService.getAllLeagues();
    this.subscriptionUser=this.allLeagueSubject
        .subscribe(res => {
            this.allLeagues=res;
            if(this.allLeagues == null) return null;
            else console.log(this.allLeagues);
        });

    this.userLeagueSubject=this.leagueService.getUserLeagues(this.userLogged);
    this.subscriptionUser=this.userLeagueSubject
        .subscribe(res => {
            this.userLeagueIds=res;
            if(this.userLeagueIds == null) return null;
            else {
              console.log(this.userLeagueIds);
              this.allLeagues.filter(ul => {
                for(let i = 0; i  <this.userLeagueIds.length; i++){
                  if(this.userLeagueIds[i].fleagueId == ul.idFl){
                    this.userLeagues.push(ul);
                  }
                }
              });
              console.log(this.userLeagues);
            }
        });

        
        this.createLeagueForm = new FormGroup({
          'name' : new FormControl(null, [Validators.required, Validators.minLength(3)]),
          'code' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        });

        this.joinLeagueForm = new FormGroup({
          'code' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        });

    
  }

  showLeagues(){
    if(this.userLeagues.length > 0){
      this.showingLeagues = !this.showingLeagues;
      this.showingCreateLeagues = false;
      this.showingJoinLeagues = false;
    } else {
      alert("You haven't joined a league yet.");
    }
  }

  createLeagues(){
    this.showingCreateLeagues = !this.showingCreateLeagues;
    this.showingLeagues = false;
    this.showingJoinLeagues = false;
    this.showingLeagueTable = false;
  }

  joinLeagues(){
    this.showingJoinLeagues = !this.showingJoinLeagues;
    this.showingLeagues = false;
    this.showingCreateLeagues = false;
    this.showingLeagueTable = false;
  }

  formSubmitCreateLeague(){
    this.createdEmptyLeague.idFl = this.allLeagues.length + 1;
    this.createdEmptyLeague.name = this.createLeagueForm.value.name;
    this.createdEmptyLeague.code = this.createLeagueForm.value.code;
    console.log(this.createdEmptyLeague);
    this.leagueService.addLeague(this.createdEmptyLeague);
    let tempUserLeague : UserLeague = {
      userId : this.userLogged.idUser,
      fleagueId : this.createdEmptyLeague.idFl
    }
    this.leagueService.addUserToLeague(tempUserLeague);
    this.router.navigate(['/leagues']).then(() => {
      window.location.reload();
    });
  }

  formSubmitJoinLeague(){
    for(let i = 0; i<this.allLeagues.length; i++){
      if(this.allLeagues[i].code == this.joinLeagueForm.value.code){
        let tempUserLeague : UserLeague = {
          userId : this.userLogged.idUser,
          fleagueId : this.allLeagues[i].idFl
        }
        this.leagueService.addUserToLeague(tempUserLeague);
        break;
      }
    }
    this.router.navigate(['/leagues']).then(() => {
      window.location.reload();
    });
  }

  getLeagueTable(id){
    this.userLeagueTableSubject=this.leagueService.getLeagueTable(id);
    this.subscriptionUser=this.userLeagueTableSubject
        .subscribe(res => {
            this.userLeagueTable=res;
            if(this.userLeagueTable == null) return null;
            else console.log(this.userLeagueTable);
        });
    
        this.showingLeagueTable = !this.showingLeagueTable;
  }


  getUsersTeam(name){
    this.usersTeamSubject=this.teamService.getUsersTeam(name);
    this.subscriptionUser=this.usersTeamSubject
        .subscribe(res => {
            this.usersTeam=res;
            if(this.usersTeam == null) return null;
            else console.log(this.usersTeam);
        });
    
    this.showingUserTeam = true;
    this.showingLeagueTable = false;
  }

  back(){
    this.showingUserTeam = false;
    this.showingLeagueTable = true;
  }

}
