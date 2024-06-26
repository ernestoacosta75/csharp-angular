import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../../../utilities/validators-utils';

@Component({
  selector: '[app-error-message]',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {

  @Input() 
  control!: AbstractControl;

  constructor() {
    
  }

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched) {
        return getValidatorErrorMessage(validatorName, this.control);
      }      
    }

    return null;
  }
}
