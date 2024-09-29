import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityActions } from '@utilities/common-utils';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-new-cinema',
  templateUrl: './new-cinema.component.html',
  styleUrl: './new-cinema.component.css'
})
export class NewCinemaComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;
  cinemaSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService) {

  }
  ngOnInit(): void {
    const onNewCinemaCreated = this.eventService.onEvent(Events.CINEMA)
    .subscribe((cinemaEvent: any) => {
      this.router.navigateByUrl('/cinemas');
    });

    this.cinemaSubscription.add(onNewCinemaCreated);
  }
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }

}
