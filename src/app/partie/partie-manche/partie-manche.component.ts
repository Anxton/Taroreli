import { Manche } from './../../models/manche';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-partie-manche',
  templateUrl: './partie-manche.component.html',
  styleUrls: ['./partie-manche.component.css']
})
export class PartieMancheComponent {
  @HostBinding('class.w-75') class: boolean = true

  @Input() manche!: Manche

  // Calcul des points du point de vue du preneur : positif = points preneur | négatif = points défenseur
  public preneur: number = -1
  public contrat: Contrat = Contrat.PETITE
  public bouts: number = -1
  public points: number = -1
  public pointsPetitAuBout: number = 0
  public pointsPoignee: number = 0

  public pointsRequisSelonBouts(bouts: number): number {
    switch (bouts) {
      case 0:
        return 56
      case 1:
        return 51
      case 2:
        return 41
      case 3:
        return 36
      default:
        return 56
    }
  }

  public getScorePreneur(): number {
    let scorePreneur: number

    // différence avec les points requis pour gagner
    const diff: number = this.pointsRequisSelonBouts(this.bouts) - this.points

    // calcul avant contrat
    scorePreneur = 25 + Math.abs(diff) + ( (diff > 0) ? this.pointsPetitAuBout : -this.pointsPetitAuBout)

    // ajout contrat
    scorePreneur = scorePreneur * this.contrat
    
    // ajout poignee
    scorePreneur = scorePreneur + ( (diff > 0) ? this.pointsPoignee : -this.pointsPoignee)

    // x 3
    scorePreneur *= 3

    return (diff > 0) ? scorePreneur : -scorePreneur
  }
}

enum Contrat {
  PETITE = 1,
  GARDE = 2,
  GARDE_SANS = 4,
  GARDE_CONTRE = 6
}
