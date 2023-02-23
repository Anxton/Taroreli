import { Partie } from './../models/partie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  readonly partieAPI = environment.apiUrl + "/parties"

  constructor(
    private http : HttpClient
  ) {}

  public getParties(): Observable<Partie[]> {
    return new Observable<Partie[]>(obs => {
      obs.next([new Partie(), new Partie()])
      obs.complete()
    })
    // return this.http.get<Partie[]>(this.partieAPI)
  }

  public getPartie(id: number): Observable<Partie> {
    return this.http.get<Partie>(this.partieAPI+'/'+id)
  }

  public addPartie(newPartie: Partie): Observable<Partie> {
    return this.http.post<Partie>(this.partieAPI, newPartie)
  }

  public updatePartie(partie: Partie): Observable<Partie> {
    return this.http.put<Partie>(this.partieAPI+'/'+partie.id, partie)
  }

  public deletePartie(partie: Partie): Observable<Partie> {
    return this.http.delete<Partie>(this.partieAPI+'/'+partie.id)
  }
}