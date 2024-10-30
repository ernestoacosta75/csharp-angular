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

  // originalFilms = R.clone(this.films);

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
