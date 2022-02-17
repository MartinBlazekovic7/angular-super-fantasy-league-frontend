import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {path: '', component:PlayersComponent},
  {path: ':id', component:PlayerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
