import { PartieEditComponent } from './../partie-edit/partie-edit.component';
import { Partie } from './../../models/partie';
import { Manche } from './../../models/manche';
import { Component, HostBinding, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-partie-manche',
  templateUrl: './partie-manche.component.html',
  styleUrls: ['./partie-manche.component.css']
})
export class PartieMancheComponent {
  @HostBinding('class.w-75') class: boolean = true

  @Input() parent!: PartieEditComponent
  @Input() partie!: Partie
  @Input() manche!: Manche

  readonly contrats = [Contrat.PETITE, Contrat.GARDE, Contrat.GARDE_SANS, Contrat.GARDE_CONTRE]

  // Progression de la création de la manche, va de 0 à 5
  public progression!: number

  // Calcul des points du point de vue du preneur : positif = points preneur | négatif = points défenseur
  public indexPreneur!: number
  public contrat!: Contrat
  public bouts!: number
  public points!: number

  public petitAuBout!: boolean
  public ptsPetitAuBout!: number

  public poignee!: boolean
  public poigneeAuPreneur!: number
  public ptsPoignee!: number

  public erreur!: string

  ngOnInit(): void {
    this.progression = 0
    this.indexPreneur = -1
    this.contrat = Contrat.INIT
    this.bouts = -1
    this.points = 0
    this.petitAuBout = false
    this.ptsPetitAuBout = 0
    this.poignee = false
    this.poigneeAuPreneur = 0
    this.ptsPoignee = -1
    this.erreur = ''
  }

  ngOnChanges(): void {
    this.ngOnInit()
  }

  public previous() {
    this.progression--
  }
  public next() {
    this.progression++
  }

  public setScores(): void {
    let score: number

    // différence avec les points requis pour gagner
    // si diff est positif ou nul, le preneur est gagnant
    const diff: number = this.points - this.bouts
    

    // calcul avant contrat
    score = 25 + Math.abs(diff)

    

    // ajout petit au bout
    if (this.petitAuBout) {
      score += ( (diff >= 0) ? this.ptsPetitAuBout : -this.ptsPetitAuBout)
    }
    

    // ajout contrat
    score = score * this.valeurContrat(this.contrat)
    
    

    // ajout poignee
    if (this.poignee) {
      score += ( (diff >= 0) ? this.ptsPoignee : -this.ptsPoignee)
    }
    


    // attribution des scores
    for (let index = 0; index < this.manche.scores.length; index++) {
      if (index == this.indexPreneur) {
        this.manche.scores[index] = (diff >= 0) ? 3*score : 3*-score
      } else {
        this.manche.scores[index] = (diff >= 0) ? -score : score
      }
    }

    
  }

  private valeurContrat(contrat: Contrat) {
    switch (contrat) {

      case Contrat.PETITE:
        return 1
      case Contrat.GARDE:
        return 2
      case Contrat.GARDE_SANS:
        return 4
      case Contrat.GARDE_CONTRE:
        return 6
    
      default:
        return 0
    }
  }
  public onSubmit(leFormulaire: NgForm) : void {
    if (this.petitAuBout && this.ptsPetitAuBout == 0) {
      this.erreur = 'Erreur petit au bout'
    }
    else if (this.poignee && (this.poigneeAuPreneur == 0 || this.ptsPoignee == -1)) {
      this.erreur = 'Erreur poignée'
    }
    else if (leFormulaire.invalid) {
      this.erreur = 'Erreur formulaire'
    }
    else {
      this.setScores()
      this.manche.idPartie = this.partie.id
      this.parent.changedManches.push(this.manche)
      this.parent.setScoresPartie()
    }
  }

}

export enum Contrat {
  INIT,
  PETITE = 'Petite',
  GARDE = 'Garde',
  GARDE_SANS = 'Garde sans le chien',
  GARDE_CONTRE = 'Garde contre le chien'
}
