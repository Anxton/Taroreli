import { Partie } from '../../models/partie';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partie-edit',
  templateUrl: './partie-edit.component.html',
  styleUrls: ['./partie-edit.component.css']
})
export class PartieEditComponent {
  public partie: Partie = new Partie()
}
