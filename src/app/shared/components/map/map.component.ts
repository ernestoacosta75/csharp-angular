import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { CoordinatesDto } from './models/coordinates';
import { Store } from '@ngrx/store';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { FormControlState, FormGroupState } from 'ngrx-forms';
import { CinemaFormValue } from '@store/cinema/cinema.reducer';
import { Observable } from 'rxjs';
import * as R from 'ramda';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnChanges {
  @Input()
  coordinatesControlState: FormControlState<any>;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(45.096717668579835, 7.669980525970465),
  };

  layers: Marker<any>[] = [];

  cinemaFormState$: Observable<FormGroupState<CinemaFormValue>>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.updateMarker(this.coordinatesControlState.value);
  }

  ngOnChanges(): void {
    this.updateMarker(this.coordinatesControlState.value);
  }

  updateMarker(coordinates: CoordinatesDto): void {
    const isLatitudeValid = R.pipe(
      R.path(['latitude']),
      R.is(Number)
    );
    
    const isLongitudeValid = R.pipe(
      R.path(['longitude']),
      R.is(Number)
    );
    
    if(R.allPass([isLatitudeValid,isLongitudeValid])(coordinates)) {
      this.setMarker(coordinates.latitude, coordinates.longitude);
    }
  }

  setMarker(latitude: number, longitude: number): void {
    this.layers = [ // Reassign array reference for change detection
      marker([latitude, longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      }),
    ];
  }
  

  manageMapClick = (evt: LeafletMouseEvent) => {
    const coordinatesDto: CoordinatesDto = {
      latitude: evt.latlng.lat,
      longitude: evt.latlng.lng,
    };

    this.setMarker(coordinatesDto.latitude, coordinatesDto.longitude);
  
    this.store.dispatch(
      CinemaActions.setCoordinatesValue({
        controlId: this.coordinatesControlState.id,
        coordinates: coordinatesDto,
      })
    );
  };
}
