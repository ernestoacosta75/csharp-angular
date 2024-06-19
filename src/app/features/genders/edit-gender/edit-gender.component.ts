import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderDto } from '@features/genders/models/gender';
import { EventService } from 'src/app/event-service';
import { EntityActions } from '@utilities/common-utils';
import { GenderService } from '../services/gender.service';
import { switchMap } from 'rxjs';
import * as R from 'ramda';
@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent implements OnInit, OnDestroy {

  model: GenderDto;

  formAction: string = EntityActions.UPDATE;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private eventService: EventService,
    private genderService: GenderService) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap((params: any) => this.genderService.getGenderById(R.path(['id'], params)))
    )
    .subscribe({
      next: (gender: GenderDto) => {
        this.model = gender;
      },
      error: (err) => {
        this.router.navigate(['/genders']);
      }
    });
  }
  ngOnDestroy(): void {

  }
}
