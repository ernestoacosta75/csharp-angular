import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatesDto } from '@shared/components/map/models/coordinates';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { CinemaDto } from 'src/app/feature/cinema/models/cinema-dto';
import * as R from 'ramda';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit, OnDestroy {

  @Input()
  model: CinemaDto;

  initialCoordinates: CoordinatesDto[] = [];

  form: FormGroup;
  cinemaSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {}

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

    const mapCoordinates = this.eventService.onEvent(Events.COORDINATES)
    .subscribe((mapCoordinatesEvent: any) => {
      const latitudeLens = R.lensPath(['latitude']);
      const longitudeLens = R.lensPath(['longitude']);
      
      this.form.patchValue(R.set(latitudeLens, R.path(['payload', 'latitude'], mapCoordinatesEvent), this.form.value));
      this.form.patchValue(R.set(longitudeLens, R.path(['payload', 'longitude'], mapCoordinatesEvent), this.form.value));
    });

    this.cinemaSubscription.add(mapCoordinates);

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates
      .push({latitude: R.path(['latitude'], this.model), longitude: R.path(['longitude'], this.model)});
    }
  }

  onSave = () => this.eventService.emitEvent(Events.CINEMA, this.form.value); 
  ngOnDestroy(): void {
    this.cinemaSubscription.unsubscribe();
  }
}
