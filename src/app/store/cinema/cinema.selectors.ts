import { createSelector } from "@ngrx/store";
import { cinemaFeature } from "./cinema.reducer";
import { MultipleSelectorDto } from "@models/multiple-selector/multipleselectordto";
import { cinemaDefaultValues } from "@models/default-values/default-values";

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

export const selectCinemasAsMultipleSelectorDto = createSelector(
    cinemaFeature.selectCinemas,
    (cinemas) => {
        if (!cinemas || !Array.isArray(cinemas)) {
            return cinemaDefaultValues; // Return an empty array if cinemas are not valid
        }
        
        const cinemaEntries = cinemas.map((cinema, index) => {
            // Create an entry for each cinema
            return {
                key: index + 1, // Incremental key starting from 1
                value: cinema.name, // Assuming 'name' is the property for value
                type: 'Cinema' // Static type as 'Cinema'
            } as MultipleSelectorDto;
        });

        const combinedEntries: MultipleSelectorDto[] = [...cinemaDefaultValues, ...cinemaEntries];

        // Filtering out duplicates based on 'value'
        const uniqueEntries = combinedEntries.reduce<MultipleSelectorDto[]>((acc, entry) => {
            const isDuplicate = acc.some(existing => existing.value.toLowerCase() === entry.value.toLowerCase());

            if (!isDuplicate) {
                acc.push(entry);
            }

            return acc;
        }, []);

        return uniqueEntries.map((entry, index) => ({
            ...entry,
            key: index + 1
        }));
    }
);

export const selectCinemaById = (id: string | number) => 
createSelector(
    selectCinemasDictionary,
    (cinemasDictionary) => cinemasDictionary[id]
);

export const selectCinemaFormErrors = createSelector(
    cinemaFeature.selectCinemaForm,
    (cinemaForm) => cinemaForm.errors || null
);