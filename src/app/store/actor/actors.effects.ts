import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActorService } from "@apis/actor.service";
import * as ActorActions from 'src/app/store/actor/actors.actions';
import { catchError, map, of, switchMap } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";

@Injectable()
export class ActorsEffects {

    constructor(private actions$: Actions, private actorsService: ActorService, private router: Router) {

    }

    loadActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.loadActors),
        switchMap(action => this.actorsService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const actors = R.path<any>(['body'], response);
                return ActorActions.loadActorsSucess({ actors })
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

    addActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.addActor),
        switchMap(({ actor }) => this.actorsService.create(actor)
        .pipe(
            map(() => {
                this.router.navigate(['/actors']);
                return ActorActions.addActorSuccess({ actor })
            }),
            catchError(errors => of(ActorActions.addActorFailure( { errors })))
        ))
    ));

    updateActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.updateActor),
        switchMap(({ id, actor }) => this.actorsService.update(id, actor)
        .pipe(
            map(() => {
                this.router.navigate(['/actors']);
                return ActorActions.updateActorSuccess({ actor });
            }),
            catchError(errors => {
                return of(ActorActions.updateActorFailure( { errors }))
            })
        ))
    ));

    deleteActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorActions.deleteActor),
        switchMap(({ id }) => this.actorsService.delete(id)
        .pipe(
            map(() => ActorActions.deleteActorSuccess({ id })),
            catchError(errors => of(ActorActions.updateActorFailure( { errors })))
        ))
    ));
}