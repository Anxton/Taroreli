import { Component, Input } from '@angular/core';
import { Partie } from '../models/partie';

@Component({
  selector: 'app-partie-item',
  templateUrl: './partie-item.component.html',
  styleUrls: ['./partie-item.component.css']
})
export class PartieItemComponent {
  @Input() partie!: Partie
}
