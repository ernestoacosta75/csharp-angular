import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActorService } from "@apis/actor.service";
import * as ActorsActions from 'src/app/store/actor/actors.actions';
import { catchError, map, of, switchMap } from "rxjs";
import * as R from 'ramda';

@Injectable()
export class ActorsEffects {

    constructor(private actions$: Actions, private actorsService: ActorService) {

    }

    loadActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorsActions.loadActors),
        switchMap(action => this.actorsService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const actors = R.path<any>(['body'], response);
                return ActorsActions.loadActorsSucess({ actors })
            }),
            catchError(errors => of(ActorsActions.loadActorsFailure( { errors })))
        ))
    ));

    addActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorsActions.addActor),
        switchMap(({ actor }) => this.actorsService.create(actor)
        .pipe(
            map(() => ActorsActions.addActorSuccess({ actor })),
            catchError(errors => of(ActorsActions.addActorFailure( { errors })))
        ))
    ));

    updateActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorsActions.updateActor),
        switchMap(({ id, actor }) => this.actorsService.update(id, actor)
        .pipe(
            map(() => ActorsActions.updateActorSuccess({ actor })),
            catchError(errors => of(ActorsActions.updateActorFailure( { errors })))
        ))
    ));

    deleteActors$ = createEffect(() => this.actions$.pipe(
        ofType(ActorsActions.deleteActor),
        switchMap(({ id }) => this.actorsService.delete(id)
        .pipe(
            map(() => ActorsActions.deleteActorSuccess({ id })),
            catchError(errors => of(ActorsActions.updateActorFailure( { errors })))
        ))
    ));
}