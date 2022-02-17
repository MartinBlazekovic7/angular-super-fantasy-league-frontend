import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUsers = 'http://localhost:8081/api/users';
  apiPlayers = 'http://localhost:8081/api/players';
  apiTeams = 'http://localhost:8081/api/teams';
  apiUserTeams = 'http://localhost:8081/api/userteam';
  apiLeagues = 'http://localhost:8081/api/leagues';
  apiUserLeagues = 'http://localhost:8081/api/userleagues';
  apiAllPlayers = 'http://localhost:8081/api/allPlayers';
  apiClubs = 'http://localhost:8081/api/clubs';
  apiRealLeagues = 'http://localhost:8081/api/realleagues';

  constructor(private http:HttpClient) { }

  getUsers(){

    return this.http.get(this.apiUsers)
        .pipe(map(res => {
          const users=[];
          for (let key in res){
            users.push({...res[key], id:key});
          }
          return users;
        }));
  }

  addUser(user){
    return this.http.post(this.apiUsers,user);
  }

  getTeams(){
    return this.http.get(this.apiTeams)
        .pipe(map(res => {
          const allTeams=[];
          for (let key in res){
            allTeams.push({...res[key], id:key});
          }
          return allTeams;
        }));
  }

  getTeam(id){

    return this.http.get(this.apiTeams)
        .pipe(map(res => {
          const teams=[];
          for (let key in res){
            teams.push({...res[key], id:key});
          }
          let teams2 = teams.filter(t => parseInt(t.userId) == id);
          return teams2;
        }));
  }

  getAllPlayers(){

    return this.http.get(this.apiPlayers)
        .pipe(map(res => {
          const players=[];
          for (let key in res){
            players.push({...res[key], id:key});
          }
          return players;
        }));
  }

  getTeamPlayers(){
    return this.http.get(this.apiUserTeams)
        .pipe(map(res => {
          const teamPlayers=[];
          for (let key in res){
            teamPlayers.push({...res[key], id:key});
          }
          return teamPlayers;
        }));
  }

  addTeam(team){
    return this.http.post(this.apiTeams,team);
  }

  addUserTeam(userTeam){
    console.log(userTeam);
    return this.http.post(this.apiUserTeams,userTeam);
  }


  getLeagues(){

    return this.http.get(this.apiLeagues)
        .pipe(map(res => {
          const leagues=[];
          for (let key in res){
            leagues.push({...res[key], id:key});
          }
          return leagues;
        }));
  }

  getUserLeagues(user){

    return this.http.get(this.apiUserLeagues)
        .pipe(map(res => {
          const userLeagues=[];
          for (let key in res){
            userLeagues.push({...res[key], id:key});
          }
          let userLeagues2 = userLeagues.filter(l => l.userId == user.idUser);
          return userLeagues2;
        }));
  }

  addLeague(league){
    return this.http.post(this.apiLeagues,league);
  }

  addUserToLeague(userLeague){
    return this.http.post(this.apiUserLeagues,userLeague);
  }

  getLeagueTable(id){
    return this.http.get(`http://localhost:8081/api/leagues/${id}`)
        .pipe(map(res => {
          const table=[];
          for (let key in res){
            table.push({...res[key], id:key});
          }
          return table;
        }));
  }

  getUsersTeam(name){
    return this.http.get(`http://localhost:8081/api/teams/${name}`)
        .pipe(map(res => {
          const usersTeam=[];
          for (let key in res){
            usersTeam.push({...res[key], id:key});
          }
          return usersTeam;
        }));
  }

  getAllPlayers2(){
    return this.http.get(this.apiAllPlayers)
        .pipe(map(res => {
          const players=[];
          for (let key in res){
            players.push({...res[key], id:key});
          }
          return players;
        }));
  }

  getPlayerById(id){
    return this.http.get(`http://localhost:8081/api/allPlayers/${id}`)
        .pipe(map(res => {
          const player=[];
          for (let key in res){
            player.push({...res[key], id:key});
          }
          return player;
        }))
  }

  getRleagues(){

    return this.http.get(this.apiRealLeagues)
        .pipe(map(res => {
          const rleagues=[];
          for (let key in res){
            rleagues.push({...res[key], id:key});
          }
          return rleagues;
        }));
  }

  getClubs(){

    return this.http.get(this.apiClubs)
        .pipe(map(res => {
          const clubs=[];
          for (let key in res){
            clubs.push({...res[key], id:key});
          }
          return clubs;
        }));
  }

  addPlayer(player){
    return this.http.post(this.apiPlayers,player);
  }

  editPlayer(player){
    return this.http.put(this.apiPlayers,player);
  }

  deletePlayer(id){
    return this.http.delete(`http://localhost:8081/api/players/${id}`);
  }

  


}
