import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../../utilities/validators-utils';
import { toConsole } from '@shared/utilities/common-utils';
import { FormControlState } from 'ngrx-forms';

@Component({
  selector: '[app-error-message]',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {

  @Input() 
  control!: FormControlState<any>;

  constructor() {
    
  }

  get errorMessage() {
    if (this.control && this.control.errors) {
      toConsole('this.control?.errors: ', this.control?.errors);
      for (const validatorName in this.control.errors) {
        return getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
      }
    }
    return null;
  }

  // get errorMessage1() {
  //   for (const validatorName in this.control?.errors) {
  //     toConsole('this.control?.errors: ', this.control?.errors);
  //     if (this.control.touched) {        
  //       return getValidatorErrorMessage(validatorName, this.control);
  //     }      
  //   }

  //   return null;
  // }
}
