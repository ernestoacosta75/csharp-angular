import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { CinemaEditDto } from '../models/cinema-dto';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css'
})
export class EditCinemaComponent implements OnInit, OnDestroy {

  model: CinemaEditDto = {
    name: 'Cityplex',
    latitude: 41.42048699577697,
    longitude: 14.23828125
  };

  cinemaSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) { 

  }
  ngOnInit(): void {
    const onCinemaEdited = this.eventService.onEvent(Events.CINEMA)
    .subscribe((cinemaEvent: any) => {
      this.router.navigateByUrl('/cinemas');
    });

    this.cinemaSubscription.add(onCinemaEdited);
  }
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
