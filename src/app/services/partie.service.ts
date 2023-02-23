import { Partie } from './../models/partie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  private parties: Partie[] = [
    {
      id: 1,
      date: new Date(),
      joueurs: ['Albert', 'Jean', 'Philippe', 'Vincent'],
      scores: [-11, -11, 33, -11]
    },
    {
      id: 2,
      date: new Date(),
      joueurs: ['A', 'B', 'C', 'D'],
      scores: [-555, 125, 1222, 1]
    },
    {
      id: 3,
      date: new Date(),
      joueurs: ['1', '2', '3', '4'],
      scores: [-999, -234, 52, 1]
    }
  ]

  readonly partieAPI = environment.apiUrl + "/parties"

  constructor(
    private http : HttpClient
  ) {}

  public getParties(): Observable<Partie[]> {
    return this.http.get<Partie[]>(this.partieAPI)
    // this.parties.forEach(p => {

    //   this.http.post<Partie>(this.partieAPI, p).subscribe({})
    // })
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
