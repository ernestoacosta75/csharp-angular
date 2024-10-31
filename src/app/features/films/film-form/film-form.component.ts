import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter, map, Observable, take } from 'rxjs';
import { MultipleSelectorDto } from '@models/multiple-selector/multipleselectordto';
import { filmFeature, FilmFormValue, FilmState } from '@store/film/film.reducer';
import { FormGroupState, NgrxValueConverter } from 'ngrx-forms';
import * as FilmSelectors from '@store/film/film.selectors';
import * as FilmActions from '@store/film/film.actions';
import { Store } from '@ngrx/store';
import { getDateValueConverter, toConsole } from '@shared/utilities/common-utils';
import { Router } from '@angular/router';
import { selectCinemasAsMultipleSelectorDto } from '@store/cinema/cinema.selectors';
import { selectCategoriesAsMultipleSelectorDto } from '@store/category/category.selectors';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.css'
})
export class FilmFormComponent implements OnInit, OnDestroy {

  categoriesNotSelected$: Observable<MultipleSelectorDto[]>;
  gendersSelected: MultipleSelectorDto [] = [];
  cinemasNotSelected$: Observable<MultipleSelectorDto[]>;
  filmFormState$: Observable<FormGroupState<FilmFormValue>>;
  submittedValue$: Observable<FilmFormValue | undefined>;
  errors$: Observable<string[]>;
  loading$!: Observable<boolean>;
  vm$ = this.store.select(FilmSelectors.selectFilmsListViewModel);
  
  dateValueConverter:  NgrxValueConverter<Date | null, string | null>;
   
  constructor(private formBuilder: FormBuilder, private store: Store<FilmState>, private router: Router) {
    this.dateValueConverter = getDateValueConverter();
    this.filmFormState$ = this.store.select(filmFeature.selectFilmForm);
    this.submittedValue$ = this.store.select(filmFeature.selectSubmittedValue);
    this.cinemasNotSelected$ = this.store.select(selectCinemasAsMultipleSelectorDto);
    this.categoriesNotSelected$ = this.store.select(selectCategoriesAsMultipleSelectorDto);
  }
  
  ngOnInit(): void {
    this.loading$ = this.store.select(filmFeature.selectLoading);
    this.errors$ = this.store.select(filmFeature.selectErrors);
/*
    const onMarkdownChanged = this.eventService.onEvent(Events.MARKDOWN_CHANGE)
    .subscribe((markdownEvent: any) => {
      const biographyLens = R.lensPath(['resume']);
      this.form.patchValue(R.set(biographyLens, R.path(['payload'], markdownEvent), this.form.value));
    });

    const onImageSelected = this.eventService.onEvent(Events.IMAGE_SELECTED)
    .subscribe((imageSelectedEvent: any) => {
      const archiveLens = R.lensPath(['poster']);
      this.form.patchValue(R.set(archiveLens, R.path(['payload'], imageSelectedEvent), this.form.value));  
    });

    const onGenderSelected = this.eventService.onEvent(Events.MULTIPLE_ITEM_SELECTED)
    .subscribe((multipleItemSelectedEvent: any) => {
      const hasGenderType = R.pipe(
        R.pathOr([], ['payload']),
        R.any(
          R.pipe(
            R.prop('type'), 
            R.equals('Gender')
          )
        )
      )(multipleItemSelectedEvent);
    
      const itemsLens = hasGenderType ? R.lensPath(['gendersId']) : R.lensPath(['cinemasId']);
      const itemsKeys = R.pipe(
        R.pathOr([], ['payload']),
        R.map(R.prop('key')),
        R.sort((a, b) => a - b)
      )(multipleItemSelectedEvent); 
      
      this.form.patchValue(R.set(itemsLens, itemsKeys, this.form.value));  
    });

    this.filmSubscription.add(onMarkdownChanged);
    this.filmSubscription.add(onImageSelected);
    this.filmSubscription.add(onGenderSelected);
    */
  }

  onSave = () => {
    this.filmFormState$
    .pipe(
      take(1),
      filter(f => {
        return f.isValid;
      }),
      map((formState: any) => {
        toConsole('Form: ', formState.value);
        this.store.dispatch(FilmActions.setSubmmittedValue({ submittedValue: formState.value }));
        // this.store.dispatch(FilmActions.saveFilm());
      })
    )
    .subscribe();
  }

  back = () => {
    this.store.dispatch(FilmActions.resetFilmForm());
    this.router.navigate(['/films']);
  }

  ngOnDestroy(): void {

  }
}
