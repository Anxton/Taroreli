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
export class PartieItemComponent {
  
  @Input() partie!: Partie

  public collapsed: boolean = true

  public manches!: Observable<Manche[]>

  public manchesLoadEtat: EtatChargement = EtatChargement.LOADING
  readonly etatChargement = EtatChargement

  public confirmDelete: boolean = false
  private listenerFn!: () => void;

  constructor(
    private router: Router,
    private partieService: PartieService,
    private mancheService: MancheService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Clic en dehors du composant
    this.listenerFn = this.renderer.listen('window', 'click',(e:Event)=>{
      this.confirmDelete = false
      $('#btnSuppr'+this.partie.id).tooltip('hide')
      $('#btnSuppr'+this.partie.id).tooltip('disable')
    })
  }
  ngAfterViewInit(): void {
    // Initialisation tooltip
    $('#btnSuppr'+this.partie.id).tooltip('disable')
  }
  ngOnDestroy(): void {
    if (this.listenerFn) {
      this.listenerFn()
    }
    
  }

  public loadManches() {
    this.collapsed = !this.collapsed
    if (!this.collapsed) {
      this.manchesLoadEtat = EtatChargement.LOADING
      this.manches = this.mancheService.getManchesFromPartie(this.partie.id)
      this.manches.subscribe({
        next: manches => {
          this.manchesLoadEtat = EtatChargement.LOADED
        },
        error: err => this.manchesLoadEtat = EtatChargement.ERROR
      })
    }
  }

  onSupprime(event: MouseEvent): void {
    event.stopPropagation()
    if (!this.confirmDelete) {
      $('#btnSuppr'+this.partie.id).tooltip('enable')
      $('#btnSuppr'+this.partie.id).tooltip('show')
      this.confirmDelete = true
    } else if ( this.confirmDelete ) {
      $('#btnSuppr'+this.partie.id).tooltip('dispose')

      // suppression manches
      this.mancheService.getManchesFromPartie(this.partie.id).subscribe({
        next: manches => {
          manches.forEach(manche => {
            this.mancheService.deleteManche(manche).subscribe({
              next: manche => { },
              error: err => { console.log("Erreur suppression manches : ", err) }
            })
          })
        },
      })
      // suppression partie
      this.partieService.deletePartie(this.partie).subscribe({
        next: partie => {
        },
        error: err => { console.log("Erreur suppression partie : ", err) }
      })
      this.router.navigateByUrl('/').then(()=>this.router.navigateByUrl('/history'))
    }
  }
}
