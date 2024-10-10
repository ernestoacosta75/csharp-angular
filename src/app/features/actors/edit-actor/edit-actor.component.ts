import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDto } from '../../../types/actor/actor-dto';
import { map, Subscription, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@shared/utilities/events';
import * as R from 'ramda';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import { ActorService } from 'src/app/apis/actor.service';
import * as ActorsActions from '@store/actor/actors.actions';
import * as ActorSelectors from '@store/actor/actors.selectors';
import { Store } from '@ngrx/store';

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
              private eventService: EventService, private actorService: ActorService,
              private store: Store) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const actorId = R.path(['id'], params);

        // Dispatching an action to load the actor by Id
        this.store.dispatch(ActorsActions.loadActor({ id: actorId}));

        // Selecting the actor from the store
        return this.store.select(ActorSelectors.selectActorsListViewModel)
        .pipe(
          map(vm => vm.actor),
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
  }

  ngOnDestroy(): void {

  }
}
