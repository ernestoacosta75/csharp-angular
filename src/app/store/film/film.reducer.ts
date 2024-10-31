import { setFilmFormValue } from './film.actions';
import { createFeature, createReducer, on } from "@ngrx/store";
import {
    box,
    Boxed,
    createFormGroupState,
    createFormStateReducerWithUpdate,
    FormGroupState,
    onNgrxForms,
    setValue,
    updateGroup,
    validate,
  } from 'ngrx-forms';
import { maxLength, required } from 'ngrx-forms/validation';
import * as FilmActions from '@store/film/film.actions';
import { FilmDto } from '@models/film/film-dto';

export interface FilmFormValue {
    id?: string;
    title: string;
    resume: string;
    onCinemas: boolean;
    trailer: string;
    releaseDate: string | Date;
    poster: string;
    categoryIds: Boxed<string[]>;
    cinemaIds: Boxed<string[]>;
}

export interface FilmState {
    films: FilmDto[];
    recordsTotalCount: number;
    filmForm: FormGroupState<FilmFormValue>;
    submittedValue: FilmFormValue | undefined;
    loading: boolean;
    errors: string[] | null;
}

export const FILM_FORM_ID = 'filmForm';

export const INITIAL_FILM_FORM_STATE = createFormGroupState<FilmFormValue>(FILM_FORM_ID, {
    id: '',
    title: '',
    resume: '',
    onCinemas: false,
    trailer: '',
    releaseDate: new Date(Date.UTC(1970, 0, 1)).toISOString(),
    poster: '',
    categoryIds: box([]),
    cinemaIds: box([])

});

const validationFilmFormGroupReducer = createFormStateReducerWithUpdate<FilmFormValue>(
    updateGroup<FilmFormValue>({
        title: validate([required, maxLength(300)])
}));

const initialState: FilmState = {
    films: [],
    recordsTotalCount: 0,
    filmForm: INITIAL_FILM_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};

export const filmFeature = createFeature({
    name: 'films',
    reducer: (state: FilmState | undefined, action): FilmState => {
        if(!state) {
            state = initialState;
        }

        const filmFormStateUpdated = validationFilmFormGroupReducer(state?.filmForm, action);
        
        return createReducer(
            state,
            onNgrxForms(),
            on(FilmActions.loadFilms, (state) => ({
                ...state,
                loading: true,
                errors: []
            })),
            on(FilmActions.loadFilm, (state, { id }) => ({
                ...state,
                loading: true,
                errors: []
            })),            
            on(FilmActions.loadFilmsSucess, (state, { films, recordsTotalCount }) => ({
                ...state,
                films,
                recordsTotalCount,
                loading: false
            })),
            on(FilmActions.loadFilmsFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(FilmActions.loadFilmFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(FilmActions.saveFilm, state => ({
                ...state,
                loading: true,
                error: null
            })),
            on(FilmActions.saveFilmSuccess, (state) => ({
                ...state,
                filmForm: INITIAL_FILM_FORM_STATE,
                loading: false
            })),
            on(FilmActions.saveFilmFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),

            on(FilmActions.updateFilmSuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(FilmActions.updateFilmFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(FilmActions.resetFilmForm, (state) => ({
                ...state,
                filmForm: INITIAL_FILM_FORM_STATE
            })),
            on(FilmActions.setFilmFormValue, (state,  { existingValue }) => ({
                ...state,
                filmForm: updateGroup<FilmFormValue>({
                    id: setValue(existingValue.id || ''),
                    title: setValue(existingValue.title),
                    resume: setValue(existingValue.resume),
                    onCinemas: setValue(existingValue.onCinemas),
                    trailer: setValue(existingValue.trailer),
                    releaseDate: setValue(existingValue.releaseDate),
                    poster: setValue(existingValue.poster)
                })(state.filmForm),
            })),            
            on(FilmActions.setSubmmittedValue, (state,  { submittedValue }) => ({
                ...state,
                submittedValue,
            })),
            on(FilmActions.setPictureValue, (state,  { controlId, value }) => ({
                ...state,
                filmForm: updateGroup<FilmFormValue>({
                    poster: setValue(value)
                })(state.filmForm)
            })),
            on(FilmActions.setResumeValue, (state,  { controlId, value }) => ({
                ...state,
                filmForm: updateGroup<FilmFormValue>({
                    resume: setValue(value)
                })(state.filmForm)
            })),
            on(FilmActions.setCategoriesSelectedValue, (state,  { controlId, categories }) => {
                const selectedCategoryIds = categories.value.map(category => category.key.toString());

                return {
                    ...state,
                    filmForm: updateGroup<FilmFormValue>({
                        categoryIds: setValue(box(selectedCategoryIds))
                    })(state.filmForm)
                };
            }),
            on(FilmActions.setCinemasSelectedValue, (state,  { controlId, cinemas }) => {
                const selectedCinemaIds = cinemas.value.map(cinema => cinema.key.toString());

                return {
                    ...state,
                    filmForm: updateGroup<FilmFormValue>({
                        cinemaIds: setValue(box(selectedCinemaIds))
                    })(state.filmForm)
                };
            })
        )({
            ...state, 
            filmForm: filmFormStateUpdated
        }, action);
    }
});