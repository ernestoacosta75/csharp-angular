import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/event-service';
import { EntityActions } from '@shared/utilities/common-utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { actorsFeature } from '../../../store/actor/actors.reducer';
import { ActorService } from 'src/app/apis/actor.service';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  errors$: Observable<string[]>;
  formAction: string = EntityActions.ADD;
  
  constructor(private router: Router, private eventService: EventService, 
              private actorService: ActorService, private store: Store) {

  }
  ngOnInit(): void {
    this.errors$ = this.store.select(actorsFeature.selectErrors);
  }

  ngOnDestroy(): void {

  }
}
