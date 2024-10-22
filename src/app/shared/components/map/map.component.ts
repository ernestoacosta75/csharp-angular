import { Component, Input, OnInit } from '@angular/core';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { CoordinatesDto } from './models/coordinates';
import * as R from 'ramda';
import { Store } from '@ngrx/store';
import * as CinemaActions from '@store/cinema/cinema.actions';
import { FormControlState, FormGroupState } from 'ngrx-forms';
import { CinemaFormValue } from '@store/cinema/cinema.reducer';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Input()
  coordinatesControlState: FormControlState<string>;

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
    this.cinemaFormState$
    .pipe(
      take(1),
      map((formState: any) => {
        this.layers = R.values(
          R.map(value => marker([value.latitude, value.longitude], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon.png',
              iconRetinaUrl: 'assets/marker-icon-2x.png',
              shadowUrl: 'assets/marker-shadow.png',
            }),
          }), R.path<any>(['coordinates'], formState))
        );
      })
    );
  }

  manageMapClick = (evt: LeafletMouseEvent) => {
    const coordinatesDto: CoordinatesDto = {
      latitude: evt.latlng.lat,
      longitude: evt.latlng.lng
    };

    this.layers = [];
    this.layers.push(
      marker([coordinatesDto.latitude, coordinatesDto.longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );

    this.store.dispatch(CinemaActions.setCoordinatesValue({ controlId: this.coordinatesControlState.id, coordinates: coordinatesDto }));
  };
}
