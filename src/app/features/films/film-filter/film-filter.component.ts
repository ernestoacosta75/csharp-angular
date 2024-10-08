import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';
import { readQueryParamsFromActivatedRoute } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-film-filter',
  templateUrl: './film-filter.component.html',
  styleUrl: './film-filter.component.css',
})
export class FilmFilterComponent implements OnInit {
  form: FormGroup;

  originalForm = {
    title: '',
    genderId: 0,
    nextReleases: false,
    onCinemas: false,
  };

  genders = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Thriller' },
    { id: 4, name: 'Action' },
    { id: 5, name: 'Fantasy' },
  ];

  films = [
    {
      title: 'The Shawshank Redemption',
      onCinemas: false,
      nextReleases: true,
      genders: [1, 3],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX100_CR0,1,100,148_.jpg',
    },
    {
      title: 'The Godfather',
      onCinemas: false,
      nextReleases: true,
      genders: [1],
      poster:
        'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY148_CR2,0,100,148_.jpg',
    },
    {
      title: 'The Godfather: Part II',
      onCinemas: true,
      nextReleases: false,
      genders: [1],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY148_CR2,0,100,148_.jpg',
    },
    {
      title: 'The Dark Knight',
      onCinemas: true,
      nextReleases: false,
      genders: [3, 4],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX100_CR0,0,100,148_.jpg',
    },
    {
      title: '12 Angry Men',
      onCinemas: false,
      nextReleases: true,
      genders: [1, 2],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_QL75_UX100_CR0,3,100,148_.jpg',
    },
    {
      title: "Schindler's List",
      onCinemas: false,
      nextReleases: true,
      genders: [1, 3],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX100_CR0,1,100,148_.jpg',
    },
    {
      title: 'Pulp Fiction',
      onCinemas: true,
      nextReleases: false,
      genders: [3],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY148_CR1,0,100,148_.jpg',
    },
    {
      title: 'The Lord of the Rings: The Return of the King',
      onCinemas: true,
      nextReleases: false,
      genders: [4, 5],
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX100_CR0,0,100,148_.jpg',
    },
  ];

  originalFilms = R.clone(this.films);

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(this.originalForm);
    
    this.form.patchValue(readQueryParamsFromActivatedRoute(this.activatedRoute, this.form));
    this.searchFilms(this.form.value);

    this.form.valueChanges.subscribe((values) => {
      this.films = R.clone(this.originalFilms);
      this.searchFilms(values);
      this.writeSearchParametersOnUrl();
    });
  }

  searchFilms = (values: any) => {
    if (R.isNotNil(R.path(['title'], values))) {
      this.films = R.filter(
        (film) => film.title.toLowerCase().includes(values.title.toLowerCase()),
        this.films
      );
    }

    if (R.not(R.pathEq(0, ['genderId'], values))) {
      this.films = R.filter(
        (film) => R.includes(values.genderId, film.genders),
        this.films
      );
    }

    if (R.pathEq(true, ['nextReleases'], values)) {
      this.films = R.filter((film) => film.nextReleases, this.films);
    }

    if (R.pathEq(true, ['onCinemas'], values)) {
      this.films = R.filter((film) => film.onCinemas, this.films);
    }
  };

  onClick = () => this.form.patchValue(this.originalForm);

  private writeSearchParametersOnUrl = () => {
    var formValues = this.form.value;

    const queryStrings = [
      R.when(
        R.pipe(R.propEq('', 'title'), R.not),
        R.pipe(R.path(['title']), R.concat('title='))
      )(formValues),
      R.when(
        R.pipe(R.propEq(0, 'genderId'), R.not),
        R.pipe(R.path(['genderId']), R.toString, R.concat('genderId='))
      )(formValues),
      R.when(
        R.propEq(true, 'nextReleases'),
        R.always('nextReleases=true')
      )(formValues),
      R.when(
        R.propEq(true, 'onCinemas'),
        R.always('onCinemas=true')
      )(formValues),
    ];

    this.location.replaceState(
      'films/search',
      R.reject(R.is(Object), queryStrings).join('&')
    );
  };

}
