import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';
import * as ActorActions from '@store/actor/actor.actions';
import * as GenderActions from '@store/gender/gender.actions';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { switchMap, map } from "rxjs";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { from } from "rxjs";

@Injectable()
export class ConfirmationEffects {

    constructor(private actions$: Actions, private store: Store) {}

    confirmAction$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ConfirmationActions.confirmAction),
            switchMap(({ entityType, entityId, message }) => 
                from(
                    Swal.fire({
                        title: 'Confirmation',
                        text: message,
                        icon: 'warning',
                        showCancelButton: true 
                    })
                ).pipe(
                    map((result) => {
                        if (result.isConfirmed) {
                            switch (entityType) {
                                case 'actor':
                                    this.store.dispatch(ActorActions.deleteActor({ id: entityId }));
                                    this.store.dispatch(ActorActions.loadActors({ page: 1, itemsToShowAmount: 10 }));
                                    break;

                                case 'gender':
                                    this.store.dispatch(GenderActions.deleteGender({ id: entityId }));
                                    this.store.dispatch(GenderActions.loadGenders({ page: 1, itemsToShowAmount: 10 }));
                                    break;  
                                    
                                case 'cinema':
                                    this.store.dispatch(CinemaActions.deleteCinema({ id: entityId }));
                                    this.store.dispatch(CinemaActions.loadCinemas({ page: 1, itemsToShowAmount: 10 }));
                                    break;                               
                            
                                default:
                                    break;
                            }
                            return ConfirmationActions.confirmActionSucess({ entityType, entityId, message });
                        } else {
                            return ConfirmationActions.confirmActionCancel();
                        }
                    })
                )
            )
        )
    );
}
