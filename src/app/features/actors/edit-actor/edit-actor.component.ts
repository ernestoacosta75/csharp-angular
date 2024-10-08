import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDto } from '../../../types/actor/actor-dto';
import { Subscription, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@shared/utilities/events';
import * as R from 'ramda';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import { ActorService } from 'src/app/apis/actor.service';

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
              private eventService: EventService, private actorService: ActorService) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(params => this.actorService.getById(R.path(['id'], params)))
    )
    .subscribe({
      next: (actor: ActorDto) => {
        this.model = actor;
        this.eventService.emitEvent(Events.ACTOR, this.model, this.formAction);
      },
      error: (error) => { 
        toConsole('Error getting actor: ', error);
        this.router.navigate(['/actors']);
      }
    });

    // const onActorEdited = this.eventService.onEvent(Events.ACTOR)
    // .subscribe((actorEvent: any) => {
    //   this.router.navigateByUrl('/actors');
    // });

    // this.actorSubscription.add(onActorEdited);
  }

  ngOnDestroy(): void {
    // this.actorSubscription.unsubscribe();
  }
}
