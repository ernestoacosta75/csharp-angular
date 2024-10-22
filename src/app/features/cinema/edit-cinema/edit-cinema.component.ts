import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { CinemaEditDto } from '../../../types/cinema/cinema-dto';
import * as R from 'ramda';
import { toConsole } from '@shared/utilities/common-utils';
import { CinemaState } from '@store/cinema/cinema.reducer';
import { Store } from '@ngrx/store';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { selectCinemaById } from '@store/cinema/cinema.selectors';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css'
})
export class EditCinemaComponent implements OnInit, OnDestroy {

  model: CinemaEditDto;
  cinemaSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private store: Store<CinemaState>) { 

  }

  ngOnInit(): void {
    const editCinema = this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const cinemaId = R.path(['id'], params);

        this.store.dispatch(CinemaActions.loadCinema({ id: cinemaId }));

        return this.store.select(selectCinemaById(cinemaId))
        .pipe(
          map(cinema => {
            if(cinema) {
              this.model = {...cinema};
              toConsole('Cinema: ', cinema);
            }
            else {
              this.router.navigate(['/cinemas']);
            }
          })
        );
      })
    )
    .subscribe();

    this.cinemaSubscription.add(editCinema);
  }
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
