import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GenderService } from "@apis/gender.service";
import * as GenderActions from '@store/gender/gender.actions';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { genderFeature } from './gender.reducer';
import { GenderDto } from "@models/gender/gender";

@Injectable()
export class GenderEffects {

    constructor(private actions$: Actions, 
                private genderService: GenderService, 
                private router: Router,
                private store: Store) {

    }

    loadGenders$ = createEffect(() => this.actions$.pipe(
        ofType(GenderActions.loadGenders),
        switchMap(action => this.genderService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const genders = R.path<any>(['body'], response);
                return GenderActions.loadGendersSucess({ genders })
            }),
            catchError(errors => of(GenderActions.loadGendersFailure( { errors })))
        ))
    ));

    loadGender$ = createEffect(() => this.actions$.pipe(
        ofType(GenderActions.loadGender),
        switchMap(action => this.genderService.getById(action.id)
        .pipe(
            map(response => {
                const gender = R.path<any>(['body'], response);
                return GenderActions.loadGenderSucess({ gender })
            }),
            catchError(errors => of(GenderActions.loadGenderFailure( { errors })))
        ))
    ));

    saveGender$ = createEffect(() => this.actions$.pipe(
        ofType(GenderActions.saveGender),
        withLatestFrom(this.store.select(genderFeature.selectSubmittedValue)),
        switchMap(([ action, submittedValue ]) => {
            // Creating the GenderDto instance from the submittedValue
            const gender: GenderDto = {
                id: submittedValue?.id || null,
                name: submittedValue.name
            };

            if(!gender.id) {
                return this.genderService.create(gender)
                .pipe(
                    map(() => {
                        this.router.navigate(['/genders']);
                        return GenderActions.saveGenderSuccess();     
                    }),
                    catchError(errors => of(GenderActions.saveGenderFailure( { errors })))
                );
            }
            else {
                return this.genderService.update(gender.id, gender)
                .pipe(
                    map(() => {
                        this.router.navigate(['/genders']);
                        return GenderActions.updateGenderSuccess();     
                    }),
                    catchError(errors => of(GenderActions.updateGenderFailure( { errors })))
                );
            }
            
        })
    ));

    deleteGender$ = createEffect(() => this.actions$.pipe(
        ofType(GenderActions.deleteGender),
        switchMap(({ id }) => this.genderService.delete(id)
        .pipe(
            map(() =>{ 
                this.router.navigate(['/genders']);
                return GenderActions.deleteGenderSuccess({ id });
            }),
            catchError(errors => of(GenderActions.deleteGenderFailure( { errors })))
        ))
    ));
}