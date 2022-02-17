import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(players: Player[], search : string, pos : string, league : string): Player[] {
    
    search = search.toLowerCase();

    if(search){
      players = players.filter(function(p){
        return JSON.stringify(p.lastName).toLowerCase().includes(search);
      });
    }

    if(pos){
      if(pos == 'all'){
        return players;
      }
      players = players.filter(p => p.position == pos);
    }

    if(league){
      if(league == 'all'){
        return players;
      }
      players = players.filter(p => p.leagueName == league);
    }


    return players;

  }

}
