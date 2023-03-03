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

  @HostBinding('class.w-75') private b: boolean = true

  public partie: Partie = new Partie()
  public manches: Manche[] = []

  public loading: boolean = true


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
    this.manches.push(new Manche())
  }

  public onSubmit(): void {
    let observable: Observable<Partie>
    if (this.partie.id) {
      observable = this.partieService.updatePartie(this.partie)
    } else {
      observable = this.partieService.addPartie(this.partie)
    }
    observable.subscribe({
      next:  partie=> {
        console.log("Enregistrement OK : ", partie)
        this.router.navigateByUrl("")
      },
      error: err  => {
        console.log("ERREUR de sauvegarde : ", err)
      }
    })
  }


}
