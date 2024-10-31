import { filmFeature } from '@store/film/film.reducer';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FilmActions from '@store/film/film.actions';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { extractFriendlyErrorMessage } from '@shared/utilities/common-utils';
import { FilmService } from '@apis/film.service';
import { FilmDto } from '@models/film/film-dto';

@Injectable()
export class FilmEffects {

    constructor(private actions$: Actions, 
                private filmService: FilmService, 
                private router: Router,
                private store: Store) {

    }

    loadFilms$ = createEffect(() => this.actions$.pipe(
        ofType(FilmActions.loadFilms),
        switchMap(action => this.filmService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const films = R.path<any>(['body'], response);
                const recordsTotalCount = +R.path<any>(['headers'], response).get("recordsTotalCount");
                return FilmActions.loadFilmsSucess({ films, recordsTotalCount })
            }),
            catchError(errors => of(FilmActions.loadFilmsFailure( { errors })))
        ))
    ));

    loadFilm$ = createEffect(() => this.actions$.pipe(
        ofType(FilmActions.loadFilm),
        switchMap(action => this.filmService.getById(action.id)
        .pipe(
            map(response => {
                const film = R.path<any>(['body'], response);
                return FilmActions.loadFilmSucess({ film })
            }),
            catchError(errors => of(FilmActions.loadFilmFailure( { errors })))
        ))
    ));

    saveFilm$ = createEffect(() => this.actions$.pipe(
        ofType(FilmActions.saveFilm),
        withLatestFrom(this.store.select(filmFeature.selectSubmittedValue)),
        switchMap(([ action, submittedValue ]) => {
            const film: FilmDto = {
                id: submittedValue?.id || null,
                title: submittedValue.title,
                resume: submittedValue.resume,
                onCinemas: submittedValue.onCinemas,
                trailer: submittedValue.trailer,
                releaseDate: new Date(submittedValue.releaseDate),
                poster: submittedValue.poster
            };

            const actions$ = !film.id
                ? this.filmService.update(film.id, film)
                : this.filmService.create(film, submittedValue.title.concat('_image.png'));

            return actions$
            .pipe(
                map(() => {
                    this.router.navigate(['/films']);
                    return FilmActions.saveFilmSuccess();     
                }),
                catchError((errorResponse) => {
                    const errorMessage = extractFriendlyErrorMessage(errorResponse);
                    return of(FilmActions.saveFilmFailure( { errors: [errorMessage] }))
                })
            );            
        })
    ));

    deleteFilm$ = createEffect(() => this.actions$.pipe(
        ofType(FilmActions.deleteFilm),
        switchMap(({ id }) => this.filmService.delete(id)
        .pipe(
            map(() =>{ 
                this.router.navigate(['/films']);
                return FilmActions.deleteFilmSuccess({ id });
            }),
            catchError(errors => of(FilmActions.deleteFilmFailure( { errors })))
        ))
    ));
}