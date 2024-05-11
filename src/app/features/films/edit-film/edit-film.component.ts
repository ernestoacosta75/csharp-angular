import { Component, OnDestroy, OnInit } from '@angular/core';
import * as R from 'ramda';
import { FilmDto } from '../models/film-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrl: './edit-film.component.css'
})
export class EditFilmComponent implements OnInit, OnDestroy {

  model: FilmDto = {
    title: 'Pulp Fiction',
    resume: 'Pulp Fiction',
    onCinemas: false,
    trailer: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
    releaseDate: new Date(),
    poster: ''
  };

  filmSubscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) {
    
  }
  ngOnInit(): void {
    const onFilmEdited = this.eventService.onEvent(Events.FILM)
    .subscribe((filmEvent: any) => {
      toConsole('Gender edited: ', R.path<FilmDto>(['payload'], filmEvent));
      this.router.navigateByUrl('/');
    });

    this.filmSubscription.add(onFilmEdited);
  }
  ngOnDestroy(): void {
    this.filmSubscription.unsubscribe();
  }
}
