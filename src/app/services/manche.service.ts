import { Manche } from './../models/manche';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Partie } from '../models/partie';

@Injectable({
  providedIn: 'root'
})
export class MancheService {

  public manches: Manche[] = [
    {
      id: 1,
      idPartie: 1,
      scores: [0, 0, 0, 0]
    },
    {
      id: 2,
      idPartie: 1,
      scores: [-11, -11, 33, -11]
    },
    {
      id: 3,
      idPartie: 2,
      scores: [0, 0, 0, 0]
    },

  ]

  readonly mancheAPI = environment.apiUrl + "/manches"

  constructor(
    private http : HttpClient
  ) {}

  public getManchesFromPartie(idPartie: number): Observable<Manche[]> {
    // this.manches.forEach(p => {
    //   this.http.put<Manche>(this.mancheAPI+'/'+p.id, p).subscribe({})
    // })
    return this.http.get<Manche[]>(this.mancheAPI+'?idPartie='+idPartie)

  }

  public getManche(id: number): Observable<Manche> {
    return this.http.get<Manche>(this.mancheAPI+'/'+id)
  }

  public addManche(newManche: Manche): Observable<Manche> {
    return this.http.post<Manche>(this.mancheAPI, newManche)
  }

  public updateManche(manche: Manche): Observable<Manche> {
    return this.http.put<Manche>(this.mancheAPI+'/'+manche.id, manche)
  }

  public deleteManche(manche: Manche): Observable<Manche> {
    return this.http.delete<Manche>(this.mancheAPI+'/'+manche.id)
  }

  public deleteManchesFromPartie(idPartie: number): Observable<Manche[]> {
    return this.http.delete<Manche[]>(this.mancheAPI+'?idPartie='+idPartie)
  }
}
