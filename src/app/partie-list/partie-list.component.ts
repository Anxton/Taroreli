import { Observable } from 'rxjs';
import { Partie } from './../models/partie';
import { PartieService } from './../services/partie.service';
import { Component } from '@angular/core';
import { EtatChargement } from '../models/loader';

@Component({
  selector: 'app-partie-list',
  templateUrl: './partie-list.component.html',
  styleUrls: ['./partie-list.component.css']
})
export class PartieListComponent {

  public parties!: Observable<Partie[]>
  public partiesLoadEtat : EtatChargement = EtatChargement.LOADING

  readonly etatChargement = EtatChargement


  constructor(
    public partieService: PartieService
  ) { }

  ngOnInit(): void {
    this.parties = this.partieService.getParties()
    this.parties.subscribe({
      next: p => this.partiesLoadEtat = EtatChargement.LOADED,
      error: err => this.partiesLoadEtat = EtatChargement.ERROR
    })
  }
}
