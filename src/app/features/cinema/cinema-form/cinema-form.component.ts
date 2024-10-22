import { CinemaService } from '@apis/cinema.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatesDto } from '@shared/components/map/models/coordinates';
import { Events } from '@shared/utilities/events';
import { filter, map, Observable, Subscription, switchMap, take } from 'rxjs';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { CinemaDto } from '../../../types/cinema/cinema-dto';
import { EntityActions, parseApiErrors, toConsole } from '@shared/utilities/common-utils';
import { Router } from '@angular/router';
import { CinemaFormValue, CinemaState, cinemaFeature } from '@store/cinema/cinema.reducer';
import { FormGroupState } from 'ngrx-forms';
import * as CinemaSelectors from '@store/cinema/cinema.selectors';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { Store } from '@ngrx/store';

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

  constructor(private store: Store<CinemaState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(cinemaFeature.selectLoading);
    this.errors$ = this.store.select(cinemaFeature.selectErrors);

    const mapCoordinates = this.eventService.onEvent(Events.COORDINATES)
    .subscribe((mapCoordinatesEvent: any) => {
      const latitudeLens = R.lensPath(['latitude']);
      const longitudeLens = R.lensPath(['longitude']);
      
      this.form.patchValue(R.set(latitudeLens, R.path(['payload', 'latitude'], mapCoordinatesEvent), this.form.value));
      this.form.patchValue(R.set(longitudeLens, R.path(['payload', 'longitude'], mapCoordinatesEvent), this.form.value));
    });

    this.cinemaSubscription.add(mapCoordinates);
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
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
