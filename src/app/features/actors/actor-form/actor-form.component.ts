import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActorDto } from '../models/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit {

  @Input()
  model: ActorDto;

  @Output()
  submitForm: EventEmitter<ActorDto> = new EventEmitter<ActorDto>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      birthDate: ['', {
        validators: [Validators.required]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onSave = () => this.submitForm.emit(this.form.value);

}
