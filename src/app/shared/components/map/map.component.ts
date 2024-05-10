import { Component } from '@angular/core';
import { toConsole } from '@utilities/common-utils';
import { LeafletMouseEvent, Marker, icon, latLng, marker, tileLayer } from 'leaflet';
import * as R from 'ramda';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(45.096717668579835, 7.669980525970465)
  };

  layers: Marker<any>[] = [];

  manageMapClick = (evt: LeafletMouseEvent) => {
    const lattitude = evt.latlng.lat;
    const longitude = evt.latlng.lng;
    toConsole('Coordinates: ', {lattitude, longitude });

    this.layers = [];
    this.layers.push(
      marker([lattitude, longitude], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    );
  };
}
