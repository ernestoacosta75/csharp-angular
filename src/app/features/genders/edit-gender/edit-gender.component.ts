import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderDto } from 'src/app/types/gender/gender';
import { EventService } from 'src/app/event-service';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import { GenderService } from '@apis/gender.service';
import * as R from 'ramda';
import { Subscription, switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent implements OnInit, OnDestroy {

  model: GenderDto;
  formAction: string = EntityActions.UPDATE;

  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private eventService: EventService, private genderService: GenderService) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(params => this.genderService.getById(R.path(['id'], params)))
    )
    .subscribe({
      next: (gender: GenderDto) => this.model = gender,
      error: (error) => { 
        toConsole('Error getting gender: ', error);
        this.router.navigate(['/genders']);
      }
    });
  }

  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
