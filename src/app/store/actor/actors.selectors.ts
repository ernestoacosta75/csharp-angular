import { createSelector } from "@ngrx/store";
import { actorsFeature } from "./actors.reducer";

// Since we use createFeature in the reducer file, it will
 // automatically generate the selectors for us.
 // All generated selectors have the "select" prefix and the
 // feature selector has the "State" suffix.
 // Here, the name of the feature selector is "selectActorsState"
 // where "actors" is the feature name.
 // The names of the child selectors are "selectActors", "selectLoading" and "selectErrors". 
export const selectActorsList = createSelector(
    actorsFeature.selectActors,
    actorsFeature.selectLoading,
    actorsFeature.selectErrors,
    (actors, loading, errors) => ({ actors, loading, errors })
);