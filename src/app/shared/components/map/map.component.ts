import { Component, Input, OnInit } from '@angular/core';
import { toConsole } from '@utilities/common-utils';
import { Events } from '@utilities/events';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { EventService } from 'src/app/event-service';
import { CoordinatesDto } from './models/coordinates';
import * as R from 'ramda';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Input()
  model: CoordinatesDto[] = [];

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

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.layers = R.map(value => marker([value.latitude, value.longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl:'assets/marker-icon.png',
        iconRetinaUrl:'assets/marker-icon-2x.png',
        shadowUrl:'assets/marker-shadow.png',
      }),
    }), this.model);
  }

  manageMapClick = (evt: LeafletMouseEvent) => {
    const latitude = evt.latlng.lat;
    const longitude = evt.latlng.lng;

    this.layers = [];
    this.layers.push(
      marker([latitude, longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );

    this.eventService.emitEvent(Events.COORDINATES, {
      latitude: latitude,
      longitude: longitude,
    });
  };
}
