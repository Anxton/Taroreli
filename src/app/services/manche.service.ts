import { Manche } from './../models/manche';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MancheService {

  public manches: Manche[] = [
    {
      id: 1,
      partieId: 1,
      preneur: 2,
      ptsPreneur: 33,
      ptsDefense: -11
    }

  ]

  readonly mancheAPI = environment.apiUrl + "/manches"

  constructor(
    private http : HttpClient
  ) {}

  public getManchesFromPartie(idPartie: number): Observable<Manche[]> {
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
}
