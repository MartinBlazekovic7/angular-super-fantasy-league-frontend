import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { SortPipe } from './sort.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FormsModule
  ]
})
export class PlayerModule { }
