import { EtatChargement } from './../models/loader';
import { Manche } from './../models/manche';
import { Observable } from 'rxjs';
import { MancheService } from './../services/manche.service';
import { Component, Input } from '@angular/core';
import { Partie } from '../models/partie';

@Component({
  selector: 'app-partie-item',
  templateUrl: './partie-item.component.html',
  styleUrls: ['./partie-item.component.css']
})
export class PartieItemComponent {
  
  @Input() partie!: Partie

  public collapsed: boolean = true

  public manches!: Observable<Manche[]>

  public mancheLoadEtat: EtatChargement = EtatChargement.LOADING
  readonly etatChargement = EtatChargement

  constructor(
    private mancheService: MancheService
  ) { }

  public loadManches() {
    console.log(this.collapsed);
    this.collapsed = !this.collapsed
    if (!this.collapsed) {
      this.mancheLoadEtat = EtatChargement.LOADING
      this.manches = this.mancheService.getManchesFromPartie(this.partie.id)
      this.manches.subscribe({
        next: manches => this.mancheLoadEtat = EtatChargement.LOADED,
        error: err => this.mancheLoadEtat = EtatChargement.ERROR
      })
    }
  }
}
