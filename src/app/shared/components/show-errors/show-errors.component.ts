import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.css'
})
export class ShowErrorsComponent {

  @Input() 
  errors: string [] = [];
}
