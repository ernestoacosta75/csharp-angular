import { GenderService } from './../services/gender.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, filter, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { EntityActions, toConsole } from '@utilities/common-utils';
import * as R from 'ramda';
import { GenderDto } from '../models/gender';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;
  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService, private genderService: GenderService) {

  }

  ngOnInit(): void {
    const onNewGenderCreated = this.eventService.onEvent(Events.GENDER)
    .pipe(
      filter(genderEvent => genderEvent.action === EntityActions.ADD),
      switchMap(genderEvent => this.genderService.create(R.path<GenderDto>(['payload'], genderEvent)))
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/genders'),
      error: (err) => toConsole('Error saving gender:', err)
    });
 
    this.genderSubscription.add(onNewGenderCreated);
  }

  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
