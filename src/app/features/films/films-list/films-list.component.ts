import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrl: './films-list.component.css'
})
export class FilmsListComponent implements OnInit {
  
  @Input() films: any[] = [];

  constructor() {

  }

  ngOnInit(): void {

  }

  onRemoveFilm = (anIndex: number) => this.films.splice(anIndex, 1);
}
