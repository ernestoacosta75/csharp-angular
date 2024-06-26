import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@utilities/events';
import { Subscription, filter } from 'rxjs';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { FilmDto } from '../models/film-dto';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrl: './new-film.component.css'
})
export class NewFilmComponent implements OnInit, OnDestroy {

  filmSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService) {

  }

  ngOnInit(): void {
    const onNewFilmCreated = this.eventService.onEvent(Events.FILM)
    .subscribe((filmEvent: any) => {
      toConsole('Film created: ', R.path<FilmDto>(['payload'], filmEvent));
      // this.router.navigateByUrl('/');
    });

    this.filmSubscription.add(onNewFilmCreated);
  }
  ngOnDestroy(): void {
    this.filmSubscription.unsubscribe();
  }
}
