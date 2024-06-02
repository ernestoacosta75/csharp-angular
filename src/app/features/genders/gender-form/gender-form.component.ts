import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUpperCase } from '../../../utilities/validators-utils';
import { GenderDto } from '../models/gender';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrl: './gender-form.component.css'
})
export class GenderFormComponent implements OnInit {

  @Input()
  model: GenderDto;

  @Input()
  action: string;

  @Input()
  errors: string[] = [];

  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    
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

  onSave = () => {
    toConsole('Emitting event with action:', this.action);
    this.eventService.emitEvent(Events.GENDER, this.form.value, this.action);
  };
}
