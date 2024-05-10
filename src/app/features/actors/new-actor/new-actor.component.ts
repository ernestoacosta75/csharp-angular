import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActorDto } from '../models/actor-dto';
import { Router } from '@angular/router';
import { EventService } from 'src/app/event-service';
import { Subscription } from 'rxjs';
import { Events } from '@utilities/events';
import * as R from 'ramda';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent implements OnInit, OnDestroy {

  actorSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private eventService: EventService) {

  }
  ngOnInit(): void {
    const onNewActorCreated = this.eventService.onEvent(Events.ACTOR)
    .subscribe((actorEvent: any) => {
      toConsole('Actor created: ', R.path<ActorDto>(['payload'], actorEvent));
    });

    this.actorSubscription.add(onNewActorCreated);
  }

  ngOnDestroy(): void {
    this.actorSubscription.unsubscribe();
  }
}
