import { Component, Input } from '@angular/core';
import { toConsole } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.css'
})
export class ShowErrorsComponent {

  @Input() set errors(value: any) {
    this.errorMessages = this.parseErrors(value);
  }
  
  errorMessages: string [] = [];

  private parseErrors(errors: any): string[] {
    const messages: string[] = [];
  
    // Check if there are any errors present
    if (errors) {
      // Iterate through each control in the errors object
      for (const controlName in errors) {
        if (errors.hasOwnProperty(controlName)) {
          const controlErrors = errors[controlName];
  
          // Check for maxLength error
          if (controlErrors.maxLength) {
            messages.push(`The ${controlName} can have a maximum length of ${controlErrors.maxLength.maxLength} characters.`);
          }
  
          // Add more specific error checks for other validations if needed
        }
      }
    }
    toConsole('errors: ', messages);
    return messages;
  }
}
