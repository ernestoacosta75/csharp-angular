import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderDto } from '../models/gender';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { EntityActions, parseApiErrors, toConsole } from '@utilities/common-utils';
import { Subscription, filter, switchMap } from 'rxjs';
import { GenderService } from '../services/gender.service';
import * as R from 'ramda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrl: './gender-form.component.css'
})
export class GenderFormComponent implements OnInit, OnDestroy {

  @Input()
  model: GenderDto;

  @Input()
  action: string;

  @Input()
  errors: string[] = [];

  form: FormGroup;
  genderSubscription: Subscription = new Subscription();
  
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private genderService: GenderService, private router: Router) {
    
  }
  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)/*, firstLetterUpperCase()*/]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onSave = () => {
    this.eventService.emitEvent(Events.GENDER, this.form.value, this.action);

    const onNewGenderCreated = this.eventService.onEvent(Events.GENDER)
    .pipe(
      filter(genderEvent => genderEvent.action === EntityActions.ADD),
      switchMap(genderEvent => this.genderService.create(R.path<GenderDto>(['payload'], genderEvent)))
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/genders'),
      error: (err) => this.errors = parseApiErrors(err)
    });

    const onGenderEdited = this.eventService.onEvent(EntityActions.UPDATE)
    .pipe(
      filter(genderEvent => genderEvent.action === EntityActions.UPDATE),
      switchMap(genderEvent => this.genderService.update(this.model.id, this.model))
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/genders'),
      error: (errors) => this.errors = parseApiErrors(errors)
    });
 
    this.genderSubscription.add(onNewGenderCreated);
    this.genderSubscription.add(onGenderEdited);
  };
}
