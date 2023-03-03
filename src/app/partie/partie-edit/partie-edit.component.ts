import { Observable } from 'rxjs';
import { Manche } from './../../models/manche';
import { MancheService } from './../../services/manche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartieService } from './../../services/partie.service';
import { Partie } from '../../models/partie';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-partie-edit',
  templateUrl: './partie-edit.component.html',
  styleUrls: ['./partie-edit.component.css']
})
export class PartieEditComponent {

  @HostBinding('class.w-75') class1: boolean = true

  public partie: Partie = new Partie()
  public manches: Manche[] = []

  public selectedManche!: Manche

  public loading: boolean = true

  private newManches: Manche[] = []

  constructor(
    private partieService : PartieService,
    private mancheService : MancheService,
    private router        : Router,
    private route         : ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idPartie = this.route.snapshot.params["id"]
    if ( idPartie ) {
      this.partieService.getPartie(idPartie).subscribe({
        next: partie => {
          this.partie = {...partie}
        },
        // error:err   => this.router.navigateByUrl('')
      })

      this.mancheService.getManchesFromPartie(idPartie).subscribe({
        next: manches => {
          this.manches = [...manches]
        }
      })
      this.loading = false
    } else {
      this.loading = false
    }
  }

  public onNewManche(): void {
    const manche = new Manche(this.partie.id)
    this.manches.push(manche)
    this.newManches.push(manche)
  }

  public onSubmit(): void {
    let observablePartie: Observable<Partie>
    if (this.partie.id) {
      observablePartie = this.partieService.updatePartie(this.partie)
    } else {
      observablePartie = this.partieService.addPartie(this.partie)
    }
    // Enregistrement partie
    observablePartie.subscribe({
      next:  partie => {
        console.log("Enregistrement partie OK : ", partie)
        // récupération de l'id de la partie
        this.partie = partie

        // Enregistrement des manches ensuite, avec l'id de la nouvelle partie créée
        let observableManche: Observable<Manche>
        this.newManches.forEach(manche => {
          manche.idPartie = this.partie.id
          if (manche.id) {
            observableManche = this.mancheService.updateManche(manche)
          } else {
            observableManche = this.mancheService.addManche(manche)
          }
          observableManche.subscribe({
            next:  manche => {
              console.log("Enregistrement manche OK : ", manche)
            },
            error: err  => {
              console.log("ERREUR de sauvegarde manche : ", err)
            }
          })
        })
      },
      error: err  => {
        console.log("ERREUR de sauvegarde partie : ", err)
      }
    })

    
    
    this.router.navigateByUrl("history")
  }


}
