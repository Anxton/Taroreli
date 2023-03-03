import { MancheService } from './../../services/manche.service';
import { PartieService } from './../../services/partie.service';
import { Router } from '@angular/router';
import { EtatChargement } from './../../models/loader';
import { Manche } from './../../models/manche';
import { Observable } from 'rxjs';
import { Partie } from './../../models/partie';
import { Component, Input, AfterViewChecked, AfterViewInit, Renderer2, OnInit } from '@angular/core';

declare var $: any
@Component({
  selector: 'app-partie-item',
  templateUrl: './partie-item.component.html',
  styleUrls: ['./partie-item.component.css']
})
export class PartieItemComponent implements AfterViewInit {
  
  @Input() partie!: Partie

  public collapsed: boolean = true

  public manches!: Observable<Manche[]>

  public manchesLoadEtat: EtatChargement = EtatChargement.LOADING
  readonly etatChargement = EtatChargement

  public confirmDelete: boolean = false

  constructor(
    private router: Router,
    private partieService: PartieService,
    private mancheService: MancheService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    // Clic en dehors du composant
    this.renderer.listen('window', 'click',(e:Event)=>{
      this.confirmDelete = false
      $('#btnSuppr'+this.partie.id).tooltip('hide')
    })
  }

  public loadManches() {
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

  onSupprime(event: MouseEvent): void {
    event.stopPropagation()
    if (!this.confirmDelete) {
      $('#btnSuppr'+this.partie.id).tooltip('show')
      this.confirmDelete = true
    } else if ( this.confirmDelete ) {
      $('#btnSuppr'+this.partie.id).tooltip('dispose')
      this.mancheService.deleteManchesFromPartie(this.partie.id).subscribe({
        next: t => { },
        error: err => { console.log("Erreur suppression manches : ", err) }
      })
      this.partieService.deletePartie(this.partie).subscribe({
        next: t => {
          this.router.navigateByUrl('/').then(()=>this.router.navigateByUrl('/history'))
        },
        error: err => { console.log("Erreur suppression partie : ", err) }
      })
    }
  }
}
