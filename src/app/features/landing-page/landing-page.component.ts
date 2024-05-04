import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  onCinemaFilms: any[] = [];
  newReleaseFilms: any[] = [];

  ngOnInit(): void {
    this.onCinemaFilms = [
      {
        title: 'Spider-Man',
        releaseDate: new Date(),
        price: 1400.99,
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_QL75_UX100_CR0,0,100,148_.jpg'
      },
      {
        title: 'Moana',
        releaseDate: new Date('2016-11-14'),
        price: 300.99,
        poster: 'https://m.media-amazon.com/images/I/71RgCh-pLWL._AC_UF1000,1000_QL80_DpWeblab_.jpg'
      }
    ]
  }
}
