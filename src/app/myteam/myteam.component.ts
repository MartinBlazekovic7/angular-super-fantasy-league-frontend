import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Player } from '../models/player.model';
import { TeamPlayers } from '../models/team-players.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {

  teams : Team[] = [];
  teamSubject : BehaviorSubject<Team[]>=null;
  subscriptionUser : Subscription = null;
  userLogged : User = null;
  
  allPlayers : Player[] = [];
  playerSubject : BehaviorSubject<Player[]>=null;
  subscriptionPlayer : Subscription = null;

  allTeams : Team[] = [];
  allTeamsSubject : BehaviorSubject<Team[]>=null;
  subscriptionAllTeams : Subscription = null

  teamPlayersAll : TeamPlayers[] = [];
  teamPlayerSubject : BehaviorSubject<TeamPlayers[]>=null;
  subscriptionTeamPlayer : Subscription = null;

  playerIds : TeamPlayers[] = [];

  teamPlayers : Player[] = [];

  fullPrice : number = 0;

  teamExist : boolean = false;


  showingTeam : boolean = false;
  showingCreateTeamName : boolean = false;
  createTeamForm: FormGroup;
  createdEmptyTeam : Team = {
    idTeam : 0,
    name : '',
    userId : 0,
    points : 0
  };

  showingChoosingPlayers : boolean = false;

  ply = '';


  budget : number = 68;
  fwd : number = 0;
  mid : number = 0;
  def : number = 0;
  gk : number = 0;

  chosenPlayers : Player[] = [];
  clicked : boolean = false;
  
  chosenTeamPlayers: TeamPlayers[] = [];



  constructor(private teamService : TeamService, private authentication : AuthService, private playerService : PlayerService, private router : Router) {  }

  ngOnInit() {
    
    this.userLogged = this.authentication.getUser();

      this.playerSubject=this.playerService.getAllPlayers();
      this.subscriptionUser=this.playerSubject
        .subscribe(res => {
            this.allPlayers=res;
            if(this.allPlayers == null) return null;
            else console.log(this.allPlayers);
        });

    this.allTeamsSubject=this.teamService.getAllTeams();
    this.subscriptionAllTeams=this.allTeamsSubject
        .subscribe(res => {
            this.allTeams=res;
            if(this.allTeams == null) return null;
            else {
              console.log(this.allTeams);
              this.allTeams.map(t => {
                if(t.userId == this.userLogged.idUser) this.teamExist = true;
                console.log(this.teamExist);
              });
            }
            
        });
      
        
      this.teamSubject=this.teamService.getTeam(this.userLogged.idUser);
      this.subscriptionUser=this.teamSubject
        .subscribe(res => {
            this.teams=res;
            if(this.teams == null) return null;
            else console.log(this.teams);
        });
    
      this.teamPlayerSubject=this.playerService.getTeamPlayers();
      this.subscriptionUser=this.teamPlayerSubject
        .subscribe(res => {
            this.teamPlayersAll=res;
            if(this.teamPlayersAll == null) return null;
            else {
              console.log(this.teamPlayersAll);
              this.playerIds = this.teamPlayersAll.filter(tp => tp.teamId == this.teams[0].idTeam);
              console.log(this.playerIds);
                for(let i = 0; i<this.playerIds.length; i++){
                  this.teamPlayers.push(this.allPlayers[this.playerIds[i].playerId - 1]);
                }
                this.teamPlayers.map(tp => {
                  this.fullPrice += tp.playerPrice;
                });
                console.log(this.teamPlayers);
                console.log(this.fullPrice)
            }
          });

        this.createTeamForm = new FormGroup({
          'name' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
        });
    
        
  }

  showTeam(){

    if(this.teamExist){
      this.showingTeam = !this.showingTeam;
      
      
    } else {
      alert("You don't have a team yet, create one!");
    }
  }

  showCreateTeam(){
    if(this.teamExist){
      alert("You already have a team, click show to expand it!");
    } else {
      this.showingCreateTeamName = !this.showingCreateTeamName;
      
    }
    
  }

  formSubmitCreateTeam(){
    this.createdEmptyTeam.userId = this.userLogged.idUser;
    this.createdEmptyTeam.name = this.createTeamForm.value.name;
    this.createdEmptyTeam.points = 0;
    this.createdEmptyTeam.idTeam = this.allTeams.length+1;
    this.showingCreateTeamName = false;
    this.showingChoosingPlayers = true;
    this.teamService.addTeam(this.createdEmptyTeam);
    console.log(this.createdEmptyTeam);
  }

  addPlayer(player){
    if(this.chosenPlayers.includes(player)){
      alert("This player is already in the team.");
    } else {
      if(this.budget - player.playerPrice >= 0){
        if(player.position == 'FWD'){
          if(this.fwd < 2){
            this.chosenPlayers.push(player);
            this.budget -= player.playerPrice;
            this.fwd++;
          } else {
            alert("You already have 2 forwards.");
          }
        } else if (player.position == 'MID'){
          if(this.mid < 2){
            this.chosenPlayers.push(player);
            this.budget -= player.playerPrice;
            this.mid++;
          } else {
            alert("You already have 2 midfielders.");
          }
  
        } else if(player.position == 'DEF'){
          if(this.def < 2){
            this.chosenPlayers.push(player);
            this.budget -= player.playerPrice;
            this.def++;
          } else {
            alert("You already have 2 defenders.");
          }
        } else {
          if(this.gk < 1){
            this.chosenPlayers.push(player);
            this.budget -= player.playerPrice;
            this.gk++;
          } else {
            alert("You already have a goalkeeper.");
          }
        }
  
      } else {
        alert("You are over your budget. Please choose another player or remove a previous one.");
      }
    }
    
    
  }

  removePlayer(p, i){
    this.chosenPlayers.splice(i, 1);
    if(p.position == 'FWD') this.fwd--;
    else if(p.position == 'MID') this.mid--;
    else if(p.position == 'DEF') this.def--;
    else this.gk--;
    this.budget += p.playerPrice;
  }


  addTeamPlayers(){
    
    for(let i = 0; i<this.chosenPlayers.length; i++){
      let onePlayerTeam : TeamPlayers = {
        playerId : 0,
        teamId : 0,
      };
      onePlayerTeam.teamId = this.createdEmptyTeam.idTeam;
      onePlayerTeam.playerId = this.chosenPlayers[i].idPlayer;
      this.chosenTeamPlayers.push(onePlayerTeam);
    }
    console.log(this.chosenTeamPlayers);
    this.teamService.addUserTeam(this.chosenTeamPlayers);
    this.router.navigate(['/myteam']).then(() => {
      window.location.reload();
    });
  }

}
