import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CinemaService } from "@apis/cinema.service";
import * as CinemaActions from '@store/cinema/cinema.actions';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { cinemaFeature } from './cinema.reducer';
import { CinemaDto } from "@models/cinema/cinema-dto";

@Injectable()
export class CinemaEffects {

    constructor(private actions$: Actions, 
                private cinemaService: CinemaService, 
                private router: Router,
                private store: Store) {

    }

    loadCinemas$ = createEffect(() => this.actions$.pipe(
        ofType(CinemaActions.loadCinemas),
        switchMap(action => this.cinemaService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const cinemas = R.path<any>(['body'], response);
                const recordsTotalCount = +R.path(['headers'], response).get("recordsTotalCount");
                return CinemaActions.loadCinemasSucess({ cinemas, recordsTotalCount })
            }),
            catchError(errors => of(CinemaActions.loadCinemasFailure( { errors })))
        ))
    ));

    loadCinema$ = createEffect(() => this.actions$.pipe(
        ofType(CinemaActions.loadCinema),
        switchMap(action => this.cinemaService.getById(action.id)
        .pipe(
            map(response => {
                const cinema = R.path<any>(['body'], response);
                return CinemaActions.loadCinemaSucess({ cinema })
            }),
            catchError(errors => of(CinemaActions.loadCinemaFailure( { errors })))
        ))
    ));

    saveCinema$ = createEffect(() => this.actions$.pipe(
        ofType(CinemaActions.saveCinema),
        withLatestFrom(this.store.select(cinemaFeature.selectSubmittedValue)),
        switchMap(([ action, submittedValue ]) => {
            const cinema: CinemaDto = {
                id: R.ifElse(R.propSatisfies(R.isNil, 'id'), R.always(null), R.prop('id'))(submittedValue),
                name: R.path<string>(['name'], submittedValue),
                latitude: R.path<number>(['latitude'], submittedValue),
                longitude: R.path<number>(['longitude'], submittedValue)
            };

            if(!cinema.id) {
                return this.cinemaService.create(cinema)
                .pipe(
                    map(() => {
                        this.router.navigate(['/genders']);
                        return CinemaActions.saveCinemaSuccess();     
                    }),
                    catchError(errors => of(CinemaActions.saveCinemaFailure( { errors })))
                );
            }
            else {
                return this.cinemaService.update(cinema)
                .pipe(
                    map(() => {
                        this.router.navigate(['/genders']);
                        return CinemaActions.updateCinemaSuccess();     
                    }),
                    catchError(errors => of(CinemaActions.updateCinemaFailure( { errors })))
                );
            }
            
        })
    ));

    deleteCinema$ = createEffect(() => this.actions$.pipe(
        ofType(CinemaActions.deleteCinema),
        switchMap(({ id }) => this.cinemaService.delete(id)
        .pipe(
            map(() =>{ 
                this.router.navigate(['/genders']);
                return CinemaActions.deleteCinemaSuccess({ id });
            }),
            catchError(errors => of(CinemaActions.deleteCinemaFailure( { errors })))
        ))
    ));
}