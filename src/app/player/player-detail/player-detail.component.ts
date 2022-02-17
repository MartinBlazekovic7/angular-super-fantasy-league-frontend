import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  id : number;

  player : Player[] = [];
  playerSubject : BehaviorSubject<Player[]>=null;
  subscriptionPlayer : Subscription = null;

  constructor(private route:ActivatedRoute, private playerService : PlayerService, private router : Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.playerSubject=this.playerService.getPlayerById(this.id);
      this.subscriptionPlayer=this.playerSubject
        .subscribe(res => {
            this.player=res;
            if(this.player == null) return null;
            else console.log(this.player);
        });
  }

  back(){
    this.router.navigate(['player']).then(() => {
      window.location.reload();
    });
  }

  isGk(){
    if(this.player[0].position == 'GK') return true;
    else return false;
  }

}
