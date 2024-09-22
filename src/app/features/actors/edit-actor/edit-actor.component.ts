import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDto } from '../models/actor-dto';
import { Subscription, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { ActorService } from '../services/actor.service';
import * as R from 'ramda';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit, OnDestroy {

  model: ActorDto;

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
      next: (actor: ActorDto) => this.model = actor,
      error: (error) => { 
        toConsole('Error getting actor: ', error);
        this.router.navigate(['/actors']);
      }
    });

    const onActorEdited = this.eventService.onEvent(Events.ACTOR)
    .subscribe((actorEvent: any) => {
      this.router.navigateByUrl('/actors');
    });

    this.actorSubscription.add(onActorEdited);
  }

  ngOnDestroy(): void {
    this.actorSubscription.unsubscribe();
  }
}
