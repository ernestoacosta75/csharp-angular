import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUpperCase } from '../../../utilities/validators-utils';
import { GenderDto } from '../models/gender';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrl: './gender-form.component.css'
})
export class GenderFormComponent implements OnInit {

  @Input()
  model: GenderDto;

  @Output()
  submitForm: EventEmitter<GenderDto> = new EventEmitter<GenderDto>();

  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), firstLetterUpperCase()]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onSave = () => this.submitForm.emit(this.form.value);

}
