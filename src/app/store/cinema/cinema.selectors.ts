import { createSelector } from "@ngrx/store";
import { cinemaFeature } from "./cinema.reducer";

export const selectCinemaListViewModel = createSelector(
    cinemaFeature.selectCinemas,
    cinemaFeature.selectRecordsTotalCount,
    cinemaFeature.selectCinemaForm,
    cinemaFeature.selectSubmittedValue,
    cinemaFeature.selectLoading,
    cinemaFeature.selectErrors,
    (cinemas, recordsTotalCount, cinemaForm, submittedValue, loading, errors) => ({ cinemas, recordsTotalCount, cinemaForm, submittedValue, loading, errors })
);

export const selectCinemasDictionary = createSelector(
    cinemaFeature.selectCinemas,
    (cinemas) => {
        if (!cinemas || !Array.isArray(cinemas)) {
            return {}; // Return an empty dictionary if actors are not valid
        }
        
        return cinemas.reduce((acc, cinema) => {
            // Check if actor has an id
            if (cinema && cinema.id) {
                acc[cinema.id] = cinema;
            }
            return acc;
        }, {} as { [id: string]: typeof cinemas[0]});
    }
);

export const selectCinemaById = (id: string | number) => 
createSelector(
    selectCinemasDictionary,
    (cinemasDictionary) => cinemasDictionary[id]
);