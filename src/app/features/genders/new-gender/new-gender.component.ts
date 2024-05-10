import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenderDto } from '../models/gender';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import * as R from 'ramda';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent implements OnInit, OnDestroy {

  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService) {

  }

  ngOnInit(): void {
    const onNewGenderCreated = this.eventService.onEvent(Events.GENDER)
    .subscribe((genderEvent: any) => {
      toConsole('Gender created: ', R.path<GenderDto>(['payload'], genderEvent));
      this.router.navigateByUrl('/genders');
    });

    this.genderSubscription.add(onNewGenderCreated);
  }
  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
