import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDto } from '../../../types/actor/actor-dto';
import { map, Subscription, switchMap } from 'rxjs';
import * as R from 'ramda';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import { Store } from '@ngrx/store';
import { selectActorById } from '@store/actor/actor.selectors';
import * as ActorActions from '@store/actor/actor.actions';
import { ActorState } from '@store/actor/actor.reducer';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit, OnDestroy {

  model: ActorDto;
  formAction: string = EntityActions.UPDATE;

  actorSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private store: Store<ActorState>) { 

  }

  ngOnInit(): void {
    const editActor = this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const actorId = R.path(['id'], params);

        // Dispatching an action to load the actor by Id
        this.store.dispatch(ActorActions.loadActor({ id: actorId }));

        // Selecting the actor from the store
        return this.store.select(selectActorById(actorId))
        .pipe(
          map(actor => {
            if(actor) {
              this.model = {...actor};
              toConsole('Actor: ', actor);
            }
            else {
              this.router.navigate(['/actors']);
            }
          })
        );
      })
    )
    .subscribe();

    this.actorSubscription.add(editActor);
  }

  ngOnDestroy(): void {
    this.actorSubscription.unsubscribe();
  }
}
