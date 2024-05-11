import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderDto } from '@features/genders/models/gender';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { Subscription } from 'rxjs';
import { Events } from '@utilities/events';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent implements OnInit, OnDestroy {

  model: GenderDto = {
    name: 'Coco'
  };

  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) {
    
  }
  ngOnInit(): void {
    const onGenderEdited = this.eventService.onEvent(Events.GENDER)
    .subscribe((genderEvent: any) => {
      toConsole('Gender edited: ', R.path<GenderDto>(['payload'], genderEvent));
      this.router.navigateByUrl('/genders');
    });

    this.genderSubscription.add(onGenderEdited);
  }
  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
