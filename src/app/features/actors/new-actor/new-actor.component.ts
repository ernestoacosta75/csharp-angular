import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/event-service';
import { Subscription } from 'rxjs';
import { Events } from '@utilities/events';
import { ActorService } from '../services/actor.service';
import { EntityActions } from '@utilities/common-utils';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;
  actorSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private eventService: EventService, private actorService: ActorService) {

  }
  ngOnInit(): void {
    // const onNewActorCreated = this.eventService.onEvent(Events.ACTOR)
    // .subscribe((actorEvent: any) => {
    // });

    // this.actorSubscription.add(onNewActorCreated);
  }

  ngOnDestroy(): void {
    // this.actorSubscription.unsubscribe();
  }
}
