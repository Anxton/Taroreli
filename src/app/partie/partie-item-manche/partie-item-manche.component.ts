import { Manche } from './../../models/manche';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-partie-item-manche',
  templateUrl: './partie-item-manche.component.html',
  styleUrls: ['./partie-item-manche.component.css']
})
export class PartieItemMancheComponent {
  @Input()
  public manche!: Manche
}
