import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './models/player.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allPlayers: Player[], firstName: string, lastName: string, ply: string): Player[] {
    if(!allPlayers) return allPlayers;

    ply = ply.toLowerCase();

    if(ply){
      return allPlayers.filter(function(item){
        return JSON.stringify(item).toLowerCase().includes(ply);
      });
    } else {
      return allPlayers;
    }
  }
}
