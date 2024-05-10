import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { CinemaDto } from 'src/app/feature/cinema/models/cinema-dto';

@Component({
  selector: 'app-new-cinema',
  templateUrl: './new-cinema.component.html',
  styleUrl: './new-cinema.component.css'
})
export class NewCinemaComponent  implements OnInit, OnDestroy {

  cinemaSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService) {

  }
  ngOnInit(): void {
    const onNewCinemaCreated = this.eventService.onEvent(Events.CINEMA)
    .subscribe((cinemaEvent: any) => {
      console.log(R.path<CinemaDto>(['payload'], cinemaEvent));
    });

    this.cinemaSubscription.add(onNewCinemaCreated);
  }
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }

}
