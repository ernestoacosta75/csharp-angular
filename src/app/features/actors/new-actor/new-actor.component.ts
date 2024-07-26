import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/event-service';
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
  
  constructor(private router: Router, private eventService: EventService, private actorService: ActorService) {

  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
