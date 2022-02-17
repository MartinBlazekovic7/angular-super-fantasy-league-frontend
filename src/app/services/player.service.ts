import { HttpClient } from '@angular/common/http';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Player } from '../models/player.model';
import { TeamPlayers } from '../models/team-players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players : Player[] = [];
  playerSubject : BehaviorSubject<Player[]> = new BehaviorSubject(null);
  
  teamPlayers : TeamPlayers[] = [];
  teamPlayerSubject : BehaviorSubject<TeamPlayers[]> = new BehaviorSubject(null);

  player : Player[] = [];

  constructor(private http:HttpClient, private dataService:DataService) {
      this.init()
  }

  init(){

      this.dataService.getAllPlayers()
          .subscribe(res => {
              this.players=res;
              this.playerSubject.next([...this.players]);
          })

  }

  getAllPlayers(){
      return this.playerSubject;
  }

  getTeamPlayers(){
    this.dataService.getTeamPlayers()
        .subscribe((res => {
            this.teamPlayers = res;
            this.teamPlayerSubject.next([...this.teamPlayers]);
        }));
    return this.teamPlayerSubject;
  }

  addPlayer(player){
    this.dataService.addPlayer(player)
        .subscribe((res => {
            this.players.push(player);
            this.playerSubject.next([...this.players]);
        }));
  }

  editPlayer(player){
    this.dataService.editPlayer(player)
        .subscribe((res => {
            this.players[this.players.findIndex(p => p.idPlayer == player.idPlayer)]=player;
            this.playerSubject.next([...this.players]);
        }));
  }

  deletePlayer(id){
    this.dataService.deletePlayer(id)
            .subscribe((res => {
                this.players=this.players.filter(p => p.idPlayer!=id);
                this.playerSubject.next([...this.players]);
            }));
  }
}
