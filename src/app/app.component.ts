import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'course-frontend';
  onCinemaFilms: any[] = [];
  newReleaseFilms: any[] = [];
  
  ngOnInit(): void {
    setTimeout(() => {
      this.onCinemaFilms = [
        {
          title: 'Spider-Man',
          releaseDate: new Date(),
          price: 1400.99
        },
        {
          title: 'Moana',
          releaseDate: new Date('2016-11-14'),
          price: 300.99
        }
      ]
    }, 3000);
  }
}
