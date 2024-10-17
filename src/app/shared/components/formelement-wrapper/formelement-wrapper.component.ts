import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formelement-wrapper',
  templateUrl: './formelement-wrapper.component.html',
  styleUrl: './formelement-wrapper.component.css'
})
export class FormelementWrapperComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
}
