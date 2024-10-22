import { Component } from '@angular/core';
import { EntityActions } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-new-cinema',
  templateUrl: './new-cinema.component.html',
  styleUrl: './new-cinema.component.css'
})
export class NewCinemaComponent {

  errors: string [] = [];

  constructor() {

  }
}
