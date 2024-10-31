import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@shared/utilities/events';
import { Subscription, filter } from 'rxjs';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { FilmDto } from '../../../types/film/film-dto';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import { Store } from '@ngrx/store';
import * as CinemaActions from '@store/cinema/cinema.actions';
import * as CategoryActions from '@store/gender/gender.actions';
import { CURRENT_PAGE, RECORDS_AMOUNT_TO_SHOW } from '@models/default-values/default-values';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrl: './new-film.component.css'
})
export class NewFilmComponent implements OnInit, OnDestroy {

  filmSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService, private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(CinemaActions.loadCinemas({ page: CURRENT_PAGE, itemsToShowAmount: RECORDS_AMOUNT_TO_SHOW}));
    this.store.dispatch(CategoryActions.loadGenders({ page: CURRENT_PAGE, itemsToShowAmount: RECORDS_AMOUNT_TO_SHOW}));
    
    const onNewFilmCreated = this.eventService.onEvent(EntityActions.ADD)
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
