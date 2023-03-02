import { MancheService } from './../../services/manche.service';
import { PartieService } from './../../services/partie.service';
import { Router } from '@angular/router';
import { EtatChargement } from './../../models/loader';
import { Manche } from './../../models/manche';
import { Observable } from 'rxjs';
import { Partie } from './../../models/partie';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-partie-item',
  templateUrl: './partie-item.component.html',
  styleUrls: ['./partie-item.component.css']
})
export class PartieItemComponent {
  
  @Input() partie!: Partie

  public collapsed: boolean = true

  public manches!: Observable<Manche[]>

  public manchesLoadEtat: EtatChargement = EtatChargement.LOADING
  readonly etatChargement = EtatChargement

  constructor(
    private router: Router,
    private partieService: PartieService,
    private mancheService: MancheService
  ) { }

  public loadManches() {
    console.log(this.collapsed);
    this.collapsed = !this.collapsed
    if (!this.collapsed) {
      this.manchesLoadEtat = EtatChargement.LOADING
      this.manches = this.mancheService.getManchesFromPartie(this.partie.id)
      this.manches.subscribe({
        next: manches => this.manchesLoadEtat = EtatChargement.LOADED,
        error: err => this.manchesLoadEtat = EtatChargement.ERROR
      })
    }
  }

  onSupprime() : void {
    if ( confirm("Voulez-vous réellement supprimer cette partie ?") ) {
      this.partieService.deletePartie(this.partie).subscribe({
        next: t => {
          this.router.navigateByUrl('/').then(()=>this.router.navigateByUrl('/history'))
        }
      })
    }
  }
}
