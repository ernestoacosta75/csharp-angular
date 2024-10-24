import { actorFeature } from '@store/actor/actor.reducer';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActorService } from "@apis/actor.service";
import * as ActorActions from '@store/actor/actor.actions';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ActorDto } from '@models/actor/actor-dto';

@Injectable()
export class ActorEffects {

    constructor(private actions$: Actions, 
                private actorsService: ActorService, 
                private router: Router,
                private store: Store) {

    }

    loadActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.loadActors),
        switchMap(action => this.actorsService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const actors = R.path<any>(['body'], response);
                const recordsTotalCount = +R.path<any>(['headers'], response).get("recordsTotalCount");
                return ActorActions.loadActorsSucess({ actors, recordsTotalCount })
            }),
            catchError(errors => of(ActorActions.loadActorsFailure( { errors })))
        ))
    ));

    loadActor$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.loadActor),
        switchMap(action => this.actorsService.getById(action.id)
        .pipe(
            map(response => {
                const actor = R.path<any>(['body'], response);
                return ActorActions.loadActorSucess({ actor })
            }),
            catchError(errors => of(ActorActions.loadActorFailure( { errors })))
        ))
    ));

    saveActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.saveActor),
        withLatestFrom(this.store.select(actorFeature.selectSubmittedValue)),
        switchMap(([ action, submittedValue ]) => {
            // Creating the ActorDto instance from the submittedValue
            const actor: ActorDto = {
                id: submittedValue?.id || null,
                name: submittedValue.name,
                dateOfBirth: new Date(submittedValue.dateOfBirth),
                biography: submittedValue.biography,
                picture: submittedValue.picture
            };

            if(!actor.id) {
                return this.actorsService.create(actor, submittedValue.name.concat('_image.png'))
                .pipe(
                    map(() => {
                        this.router.navigate(['/actors']);
                        return ActorActions.saveActorSuccess();     
                    }),
                    catchError(errors => of(ActorActions.saveActorFailure( { errors })))
                );
            }
            else {
                return this.actorsService.update(actor.id, actor)
                .pipe(
                    map(() => {
                        this.router.navigate(['/actors']);
                        return ActorActions.updateActorSuccess();     
                    }),
                    catchError(errors => of(ActorActions.updateActorFailure( { errors })))
                );
            }
            
        })
    ));

    deleteActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.deleteActor),
        switchMap(({ id }) => this.actorsService.delete(id)
        .pipe(
            map(() =>{ 
                this.router.navigate(['/actors']);
                return ActorActions.deleteActorSuccess({ id });
            }),
            catchError(errors => of(ActorActions.deleteActorFailure( { errors })))
        ))
    ));
}