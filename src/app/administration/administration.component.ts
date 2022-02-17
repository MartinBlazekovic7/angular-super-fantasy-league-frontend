import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Club } from '../models/club.model';
import { League } from '../models/league.model';
import { Player } from '../models/player.model';
import { RealLeague } from '../models/real-league.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { ClubService } from '../services/club.service';
import { LeagueService } from '../services/league.service';
import { PlayerService } from '../services/player.service';
import { RealLeagueService } from '../services/real-league.service';
import { TeamService } from '../services/team.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  showingUsers : boolean = false;
  users : User[] = [];
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject(null);
  subscriptionUser : Subscription = null;

  showingTeams : boolean = false;
  teams : Team[] = [];
  teamSubject : BehaviorSubject<Team[]> = new BehaviorSubject(null);
  subscriptionTeam : Subscription = null;

  showingFleagues : boolean = false;
  fleagues : League[] = [];
  fleagueSubject : BehaviorSubject<League[]> = new BehaviorSubject(null);
  subscriptionFleague : Subscription = null;

  showingRleagues : boolean = false;
  rleagues : RealLeague[] = [];
  rleagueSubject : BehaviorSubject<RealLeague[]> = new BehaviorSubject(null);
  subscriptionRleague : Subscription = null;

  showingClubs : boolean = false;
  clubs : Club[] = [];
  clubSubject : BehaviorSubject<Club[]> = new BehaviorSubject(null);
  subscriptionClub : Subscription = null;

  showingPlayers : boolean = false;
  players : Player[] = [];
  playerSubject : BehaviorSubject<Player[]> = new BehaviorSubject(null);
  subscriptionPlayer : Subscription = null;

  showingAddPlayer : boolean = false;

  addForm : FormGroup;
  editForm : FormGroup;
  tempPlayer : Player = {
    idPlayer : 0,
    firstName :'',
    lastName : '',
    clubId : 0,
    position : '',
    playerPrice : 0,
    goals :0,
    assists :0,
    avg_rating :0,
    cleanSheets :0,
    totalPoints :0,
  };

  tempEditPlayer : Player = {
    idPlayer : 0,
    firstName :'',
    lastName : '',
    clubId : 0,
    position : '',
    playerPrice : 0,
    goals :0,
    assists :0,
    avg_rating :0,
    cleanSheets :0,
    totalPoints :0,
  };

  showingEditPlayer : boolean = false;

  constructor(private userService : UserService, private teamService : TeamService, private playerService : PlayerService, 
    private leagueService : LeagueService, private clubService : ClubService, private realLService : RealLeagueService, private router : Router) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      'firstName' : new FormControl(null, [Validators.required]),
      'lastName' : new FormControl(null, [Validators.required]),
      'clubId' : new FormControl(null, [Validators.required]),
      'position' : new FormControl(null, [Validators.required]),
      'playerPrice' : new FormControl(null, [Validators.required])
    });

    
  }

  getUsers(){
    this.showingUsers = !this.showingUsers;
    this.userSubject=this.userService.getUsers();
    this.subscriptionUser=this.userSubject
        .subscribe(res => {
            this.users=res;
        });
  }

  getTeams(){
    this.showingTeams = !this.showingTeams;
    this.teamSubject=this.teamService.getAllTeams();
    this.subscriptionTeam=this.teamSubject
        .subscribe(res => {
            this.teams=res;
        });
  }

  getFleagues(){
    this.showingFleagues = !this.showingFleagues;
    this.fleagueSubject=this.leagueService.getAllLeagues();
    this.subscriptionFleague=this.fleagueSubject
        .subscribe(res => {
            this.fleagues=res;
        });
  }

  getRleagues(){
    this.showingRleagues = !this.showingRleagues;
    this.rleagueSubject=this.realLService.getRleagues();
    this.subscriptionFleague=this.rleagueSubject
        .subscribe(res => {
            this.rleagues=res;
        });
  }

  getClubs(){
    this.showingClubs = !this.showingClubs;
    this.clubSubject=this.clubService.getClubs();
    this.subscriptionClub=this.clubSubject
        .subscribe(res => {
            this.clubs=res;
        });
  }

  getPlayers(){
    this.showingPlayers = !this.showingPlayers;
    this.playerSubject=this.playerService.getAllPlayers();
    this.subscriptionPlayer=this.playerSubject
        .subscribe(res => {
            this.players=res;
        });
  }

  onSubmit(){
    this.tempPlayer.idPlayer = this.players.length + 1;
    this.tempPlayer.firstName = this.addForm.value.firstName;
    this.tempPlayer.lastName = this.addForm.value.lastName;
    this.tempPlayer.clubId = this.addForm.value.clubId;
    this.tempPlayer.playerPrice = this.addForm.value.playerPrice;
    this.tempPlayer.position = this.addForm.value.position;
    this.addForm.reset();
    this.showingAddPlayer = !this.showingAddPlayer;
    this.playerService.addPlayer(this.tempPlayer);
  }

  edit(player){
    this.showingEditPlayer = !this.showingEditPlayer;
    this.tempEditPlayer.idPlayer = player.idPlayer;
    this.tempEditPlayer.firstName = player.firstName;
    this.tempEditPlayer.lastName = player.lastName;
    this.tempEditPlayer.clubId = player.clubId;
    this.tempEditPlayer.position = player.position;
    this.tempEditPlayer.playerPrice = player.playerPrice;
    this.editForm = new FormGroup({
      'firstName' : new FormControl(this.tempEditPlayer.firstName, [Validators.required]),
      'lastName' : new FormControl(this.tempEditPlayer.lastName, [Validators.required]),
      'clubId' : new FormControl(this.tempEditPlayer.clubId, [Validators.required]),
      'position' : new FormControl(this.tempEditPlayer.position, [Validators.required]),
      'playerPrice' : new FormControl(this.tempEditPlayer.playerPrice, [Validators.required])
    });
  }

  onSubmitEdit(){ 
    this.tempEditPlayer.clubId = this.editForm.value.clubId;
    this.tempEditPlayer.playerPrice = this.editForm.value.playerPrice;
    this.tempEditPlayer.position = this.editForm.value.position;
    this.editForm.reset();
    this.showingEditPlayer = !this.showingEditPlayer;
    this.playerService.editPlayer(this.tempEditPlayer);
    this.playerSubject=this.playerService.getAllPlayers();
    this.subscriptionPlayer=this.playerSubject
        .subscribe(res => {
            this.players=res;
        });
    // this.router.navigate(['/administration']).then(() => {
    //  window.location.reload();
    // });
  }

  delete(id){
    this.playerService.deletePlayer(id);
  }



}
