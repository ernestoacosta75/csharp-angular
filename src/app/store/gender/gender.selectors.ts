import { createSelector } from "@ngrx/store";
import { genderFeature } from "./gender.reducer";

export const selectGendersListViewModel = createSelector(
    genderFeature.selectGenders,
    genderFeature.selectGenderForm,
    genderFeature.selectSubmittedValue,
    genderFeature.selectLoading,
    genderFeature.selectErrors,
    (genders, genderForm, submittedValue, loading, errors) => ({ genders, genderForm, submittedValue, loading, errors })
);

export const selectGendersDictionary = createSelector(
    genderFeature.selectGenders,
    (genders) => {
        if (!genders || !Array.isArray(genders)) {
            return {}; // Return an empty dictionary if actors are not valid
        }
        
        return genders.reduce((acc, gender) => {
            // Check if actor has an id
            if (gender && gender.id) {
                acc[gender.id] = gender;
            }
            return acc;
        }, {} as { [id: string]: typeof genders[0]});
    }
);

export const selectGenderById = (id: string | number) => 
createSelector(
    selectGendersDictionary,
    (gendersDictionary) => gendersDictionary[id]
);