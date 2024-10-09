import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';
import * as ActorActions from '@store/actor/actors.actions';
import { switchMap } from "rxjs";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";

@Injectable()
export class ConfirmationEffects {

    constructor(private actions$: Actions, private store: Store) {

    }

    confirmAction$ = createEffect(() => this.actions$.pipe(
        ofType(ConfirmationActions.confirmAction),
        switchMap(({ entityType, entityId, message}) => 
            Swal.fire({
               title: 'Confirmation',
               text: message,
               icon: 'warning',
               showCancelButton: true 
            }).then((result) => {
                if(result.isConfirmed) {
                    if(entityType === 'actor') {
                        this.store.dispatch(ActorActions.deleteActor({ id: entityId }));
                    }
                    
                    return ConfirmationActions.confirmActionSucess({ entityType, entityId, message});
                }
                else {
                    return ConfirmationActions.confirmActionCancel();
                }
            })
        )
    ));
}