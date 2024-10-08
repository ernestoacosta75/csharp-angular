import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityActions } from '@shared/utilities/common-utils';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-new-cinema',
  templateUrl: './new-cinema.component.html',
  styleUrl: './new-cinema.component.css'
})
export class NewCinemaComponent {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;

  constructor(private router: Router, private eventService: EventService) {

  }
}
