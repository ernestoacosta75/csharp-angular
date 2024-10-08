import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderDto } from '../../../types/gender/gender';
import { EventService } from 'src/app/event-service';
import { Events } from '@shared/utilities/events';
import { EntityActions, parseApiErrors, toConsole } from '@shared/utilities/common-utils';
import { Subscription, filter, switchMap, tap } from 'rxjs';
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
  
  constructor(private formBuilder: FormBuilder, private eventService: EventService, 
              private genderService: GenderService, private router: Router) {
    
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

    const onGenderEvent = this.eventService.onEvent(Events.GENDER)
    .pipe(      
      switchMap((genderEvent: any) => {
        if(genderEvent.action === EntityActions.ADD) {
          return this.genderService.create(R.path<GenderDto>(['payload'], genderEvent));
        }
        else if(genderEvent.action === EntityActions.UPDATE) {
          return this.genderService.update(this.model.id, R.path<GenderDto>(['payload'], genderEvent));
        }
      })
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/genders'),
      error: (err) => this.errors = parseApiErrors(err)
    });
 
    this.genderSubscription.add(onGenderEvent);
  }

  onSave = () => {
    if(R.isNotNil(this.form)) {
      this.eventService.emitEvent(Events.GENDER, this.form.value, this.action);
    }
  };

  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
