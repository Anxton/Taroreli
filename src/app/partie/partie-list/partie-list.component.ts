import { PartieService } from './../../services/partie.service';
import { EtatChargement } from './../../models/loader';
import { Partie } from './../../models/partie';
import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-partie-list',
  templateUrl: './partie-list.component.html',
  styleUrls: ['./partie-list.component.css']
})
export class PartieListComponent {

  @HostBinding('class.w-75') class: boolean = true

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
