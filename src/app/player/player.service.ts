import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players : Player[] = [];
  playerSubject : BehaviorSubject<Player[]> = new BehaviorSubject(null);


  player : Player[] = [];

  constructor(private http:HttpClient, private dataService : DataService) { 
    this.init();
  }

  init(){
    this.dataService.getAllPlayers2()
          .subscribe(res => {
              this.players=res;
              this.playerSubject.next([...this.players]);
          })
  }

  getPlayers(){
    return this.playerSubject;
  }

  getPlayerById(id){
    this.dataService.getPlayerById(id)
        .subscribe((res => {
            this.player = res;
            this.playerSubject.next([...this.player]);
        }));
    return this.playerSubject;
  }

}
