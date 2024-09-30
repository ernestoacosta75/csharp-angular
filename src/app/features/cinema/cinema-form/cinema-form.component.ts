import { CinemaService } from './../services/cinema.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatesDto } from '@shared/components/map/models/coordinates';
import { Events } from '@utilities/events';
import { Subscription, switchMap } from 'rxjs';
import { EventService } from 'src/app/event-service';
import * as R from 'ramda';
import { CinemaDto } from '../models/cinema-dto';
import { EntityActions, parseApiErrors } from '@utilities/common-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit, OnDestroy {

  @Input()
  model: CinemaDto;

  @Input()
  action: string;

  @Input()
  errors: string[] = [];

  initialCoordinates: CoordinatesDto[] = [];

  form: FormGroup;
  cinemaSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private eventService: EventService, 
              private cinemaService: CinemaService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      latitude: ['', {
        validators: [Validators.required]
      }],
      longitude: ['', {
        validators: [Validators.required]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates
      .push({latitude: R.path(['latitude'], this.model), longitude: R.path(['longitude'], this.model)});
    }

    const mapCoordinates = this.eventService.onEvent(Events.COORDINATES)
    .subscribe((mapCoordinatesEvent: any) => {
      const latitudeLens = R.lensPath(['latitude']);
      const longitudeLens = R.lensPath(['longitude']);
      
      this.form.patchValue(R.set(latitudeLens, R.path(['payload', 'latitude'], mapCoordinatesEvent), this.form.value));
      this.form.patchValue(R.set(longitudeLens, R.path(['payload', 'longitude'], mapCoordinatesEvent), this.form.value));
    });

    const onCinemaEvent = this.eventService.onEvent(Events.CINEMA)
    .pipe(      
      switchMap((cinemaEvent: any) => {
        if(cinemaEvent.action === EntityActions.ADD) {
          return this.cinemaService.create(R.path<CinemaDto>(['payload'], cinemaEvent));
        }
        else if(cinemaEvent.action === EntityActions.UPDATE) {
          return this.cinemaService.update(this.model.id, R.path<CinemaDto>(['payload'], cinemaEvent));
        }
      })
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/cinemas'),
      error: (err) => this.errors = parseApiErrors(err)
    });    

    this.cinemaSubscription.add(mapCoordinates);
    this.cinemaSubscription.add(onCinemaEvent);
  }

  onSave = () => this.eventService.emitEvent(Events.CINEMA, this.form.value, this.action); 
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
