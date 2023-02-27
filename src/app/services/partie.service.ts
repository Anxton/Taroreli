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
      joueurs:[
        {
          "nom": "Albert",
          "score": -11
        },
        {
          "nom": "Jean",
          "score": -11
        },
        {
          "nom": "Philippe",
          "score": 33

        },
        {
          "nom": "Vincent",
          "score": -11
        }
      ]
    },
    {
      id: 2,
      date: new Date(),
      joueurs: [
        {
          "nom": "A",
          "score": -555
        },
        {
          "nom": "B",
          "score": 125
        },
        {
          "nom": "C",
          "score": 1222
        },
        {
          "nom": "D",
          "score": 1
        }  
      ]
    },
    {
      id: 3,
      date: new Date(),
      joueurs: [
        {
          "nom": "1",
          "score": -999
        },
        {
          "nom": "2",
          "score": -234
        },
        {
          "nom": "3",
          "score": 52
        },
        {
          "nom": "4",
          "score": 1
        }
      ]
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
