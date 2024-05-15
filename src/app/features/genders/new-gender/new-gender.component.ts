import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';

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
      this.router.navigateByUrl('/genders');
    });

    this.genderSubscription.add(onNewGenderCreated);
  }
  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
