import { GenderService } from './../services/gender.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { EntityActions } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;
  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private eventService: EventService, private genderService: GenderService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
}
