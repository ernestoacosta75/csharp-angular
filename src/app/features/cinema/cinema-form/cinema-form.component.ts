import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoordinatesDto } from '@shared/components/map/models/coordinates';
import { filter, map, Observable, Subscription, take } from 'rxjs';
import { toConsole } from '@shared/utilities/common-utils';
import { CinemaFormValue, CinemaState, cinemaFeature } from '@store/cinema/cinema.reducer';
import { FormGroupState } from 'ngrx-forms';
import * as CinemaSelectors from '@store/cinema/cinema.selectors';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit, OnDestroy {

  vm$ = this.store.select(CinemaSelectors.selectCinemaListViewModel);
  cinemaFormState$: Observable<FormGroupState<CinemaFormValue>>;
  submittedValue$: Observable<CinemaFormValue | undefined>;
  errors$: Observable<string[]>;
  loading$!: Observable<boolean>;

  initialCoordinates: CoordinatesDto[] = [];
  cinemaSubscription: Subscription = new Subscription();

  constructor(private store: Store<CinemaState>, private router: Router) {
    this.cinemaFormState$ = this.store.select(cinemaFeature.selectCinemaForm);
    this.submittedValue$ = this.store.select(cinemaFeature.selectSubmittedValue);
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(cinemaFeature.selectLoading);
    this.errors$ = this.store.select(cinemaFeature.selectErrors);
  }

  onSave = () => {
    this.cinemaFormState$
    .pipe(
      take(1),
      filter(f => {
        toConsole('Form valid: ', f.isValid);
        return f.isValid;
      }),
      map((formState: any) => {
        toConsole('Form: ', formState.value);
        this.store.dispatch(CinemaActions.setSubmmittedValue({ submittedValue: formState.value }));
        this.store.dispatch(CinemaActions.saveCinema());
      })
    )
    .subscribe();    
  }; 

  back = () => {
    this.store.dispatch(CinemaActions.resetCinemaForm());
    this.router.navigate(['/cinemas']);
  }

  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
