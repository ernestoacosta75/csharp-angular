import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface FieldConfig {
  label: string;
  controlName: string;
  placeholder: string;
  required?: boolean;
  type?: string; // Use 'text' for inputs or 'date' for date pickers  
}

@Component({
  selector: 'app-namedateform',
  templateUrl: './namedateform.component.html',
  styleUrl: './namedateform.component.css'
})
export class NamedateformComponent {
  @Input() form!: FormGroup;
  @Input() fields!: FieldConfig[];
}
