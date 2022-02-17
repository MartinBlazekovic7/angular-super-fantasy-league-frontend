import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { RealLeague } from '../models/real-league.model';

@Injectable({
  providedIn: 'root'
})
export class RealLeagueService {

  rleagues : RealLeague[] = [];
  rleagueSubject : BehaviorSubject<RealLeague[]> = new BehaviorSubject(null);

  constructor(private http:HttpClient, private dataService:DataService) {
    this.init()
}

init(){

    this.dataService.getRleagues()
        .subscribe(res => {
            this.rleagues=res;
            this.rleagueSubject.next([...this.rleagues]);
        })

}

getRleagues(){
    return this.rleagueSubject;
}


}
