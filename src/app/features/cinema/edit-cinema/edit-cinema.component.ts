import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { CinemaDto, CinemaEditDto } from '../../../types/cinema/cinema-dto';
import { CinemaService } from '../services/cinema.service';
import * as R from 'ramda';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css'
})
export class EditCinemaComponent implements OnInit, OnDestroy {

  model: CinemaEditDto;
  formAction: string = EntityActions.UPDATE;
  cinemaSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private eventService: EventService, private cinemaService: CinemaService) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(params => this.cinemaService.getById(R.path(['id'], params)))
    )
    .subscribe({
      next: (cinema: CinemaDto) => this.model = cinema,
      error: (error) => { 
        toConsole('Error getting cinema: ', error);
        this.router.navigate(['/cinemas']);
      }
    });
  }
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
