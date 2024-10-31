import { filmFeature } from './film.reducer';
import { createSelector } from "@ngrx/store";

export const selectFilmsListViewModel = createSelector(
    filmFeature.selectFilms,
    filmFeature.selectRecordsTotalCount,
    filmFeature.selectFilmForm,
    filmFeature.selectSubmittedValue,
    filmFeature.selectLoading,
    filmFeature.selectErrors,
    (films, recordsTotalCount, filmForm, submittedValue, loading, errors) => 
        ({ films, recordsTotalCount, filmForm, submittedValue, loading, errors })
);

export const selectFilmsDictionary = createSelector(
    filmFeature.selectFilms,
    (films) => {
        if (!films || !Array.isArray(films)) {
            return {};
        }
        
        return films.reduce((acc, film) => {
            if (film && film.id) {
                acc[film.id] = film;
            }
            return acc;
        }, {} as { [id: string]: typeof films[0]});
    }
);

export const selectFilmById = (id: string | number) => 
createSelector(
    selectFilmsDictionary,
    (filmsDictionary) => filmsDictionary[id]
);