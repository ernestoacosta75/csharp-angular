import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

interface FieldConfig {
  label: string;
  controlName: string;
  placeholder: string;
  required?: boolean;
  type?: string; // Use 'text' for inputs or 'date' for date pickers  
}

/**
 * To make this form reusable, the ControlValueAccessor is used to map
 * the form to the parent form and relay updates such as value changes and
 * validation updates.
 */
@Component({
  selector: 'app-namedate-form',
  templateUrl: './namedateform.component.html',
  styleUrl: './namedateform.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NamedateformComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NamedateformComponent),
      multi: true
    }
  ]
})
export class NamedateformComponent implements ControlValueAccessor, OnDestroy {

  @Input() form!: FormGroup;
  @Input() fields!: FieldConfig[];
  subscriptions: Subscription[] = [];

  get value(): FieldConfig {
    return this.form.value;
  }

  set value(value: FieldConfig) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }  

  constructor(private formBuilder: FormBuilder) {
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );        
  }

  onChange: any = () => {};
  onTouched: any = () => {};
  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } };
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
