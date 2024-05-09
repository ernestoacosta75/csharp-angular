import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActorDto, ActorEditDto } from '../models/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as R from 'ramda';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit {

  @Input()
  model: ActorEditDto;

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
      }],
      archive: ''
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onArchiveSelected = (file: File) => {
    const archiveLens = R.lensPath(['archive']);
    this.form.patchValue(R.set(archiveLens, file, this.form.value));
  };

  onSave = () => this.submitForm.emit(this.form.value);

}
