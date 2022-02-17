import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MyteamComponent } from './myteam/myteam.component';
import { RegisterComponent } from './register/register.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { AuthGuard } from './auth.guard';
import { PlayerModule } from './player/player.module';
import { AdministrationComponent } from './administration/administration.component';

const routes: Route[] = [
  {path:'',component:HomeComponent},
  {path:'myteam',component:MyteamComponent, canActivate:[AuthGuard]},
  {path:'leagues',component:LeaguesComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'player', loadChildren: () => PlayerModule},
  {path:'administration', component: AdministrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
