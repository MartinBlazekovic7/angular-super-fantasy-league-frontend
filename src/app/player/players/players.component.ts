import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players : Player[] = [];
  playerSubject : BehaviorSubject<Player[]> = new BehaviorSubject(null);
  subscriptionPlayers : Subscription = null;

  search = '';
  pos = '';
  league = '';



  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.playerSubject=this.playerService.getPlayers();
      this.subscriptionPlayers=this.playerSubject
        .subscribe(res => {
            this.players=res;
            if(this.players == null) return null;
            else console.log(this.players);
        });
  }

}
