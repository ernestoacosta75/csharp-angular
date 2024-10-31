import { createAction, props } from "@ngrx/store";
import { FilmFormValue } from "./film.reducer";
import { FilmDto } from "@models/film/film-dto";
import { MultipleSelectorDto } from '@models/multiple-selector/multipleselectordto';
import { Boxed } from "ngrx-forms";

export const loadFilms = createAction('[Film] Load Films', props<{ page: number, itemsToShowAmount: number }>());
export const loadFilmsSucess = createAction('[Film] Load Films Success', props<{ films: FilmDto[], recordsTotalCount: number }>());
export const loadFilmsFailure = createAction('[Film] Load Films Failure', props<{ errors: string[] }>());

export const loadFilm = createAction('[Film] Load Film', props<{ id: string }>());
export const loadFilmSucess = createAction('[Film] Load Film Success', props<{ film: FilmDto }>());
export const loadFilmFailure = createAction('[Film] Load Film Failure', props<{ errors: string[] }>());

export const saveFilm = createAction('[Film] Save Film');
export const saveFilmSuccess = createAction('[Film] Save Film Success');
export const saveFilmFailure = createAction('[Film] Save Film Failure', props<{ errors: string[] }>());

export const updateFilm = createAction('[Film] Update Film', props<{ id: string, film: FilmDto }>());
export const updateFilmSuccess = createAction('[Film] Update Film Success');
export const updateFilmFailure = createAction('[Film] Update Film Failure', props<{ errors: string[] }>());

export const deleteFilm = createAction('[Film] Delete Film', props<{ id: string }>());
export const deleteFilmSuccess = createAction('[Film] Delete Film Success', props<{ id: string }>());
export const deleteFilmFailure = createAction('[Film] Delete Film Failure', props<{ errors: string[] }>());

export const setFilmFormValue = createAction('[Film] Set FilmForm Value', props<{ existingValue: FilmFormValue }>());
export const resetFilmForm = createAction('[Film] Reset Film Form');

export const setSubmmittedValue = createAction('[Film] Set Submitted Value', props<{ submittedValue: FilmFormValue }>());
export const setPictureValue = createAction('[Film] Set Picture Value', props<{ controlId?: string, value: string }>());
export const setResumeValue = createAction('[Film] Set Resume Value', props<{ controlId: string, value: string }>());

export const setCategoriesSelectedValue = createAction('[Film] Set Categories Selected Value', props<{ controlId?: string, categories: Boxed<MultipleSelectorDto[]> }>());
export const setCinemasSelectedValue = createAction('[Film] Set Cinemas Selected Value', props<{ controlId?: string, cinemas: Boxed<MultipleSelectorDto[]> }>());
export const setActorsSelectedValue = createAction('[Film] Set Actors Selected Value', props<{ controlId?: string, cinemas: Boxed<any[]> }>());
