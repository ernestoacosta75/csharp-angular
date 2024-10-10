import { createSelector } from "@ngrx/store";
import { actorsFeature } from "./actors.reducer";

// Since we use createFeature in the reducer file, it will
 // automatically generate the selectors for us.
 // All generated selectors have the "select" prefix and the
 // feature selector has the "State" suffix.
 // Here, the name of the feature selector is "selectActorsState"
 // where "actors" is the feature name.
 // The names of the child selectors are "selectActors", "selectLoading" and "selectErrors". 
export const selectActorsListViewModel = createSelector(
    actorsFeature.selectActors,
    actorsFeature.selectActor,
    actorsFeature.selectLoading,
    actorsFeature.selectErrors,
    actorsFeature.selectActorImg,
    (actors, actor, loading, errors, actorImg) => ({ actors, actor, loading, errors, actorImg })
);

export const selectActorsDictionary = createSelector(
    actorsFeature.selectActors,
    (actors) => {
        // Ensure that actors is defined and is an array
        if (!actors || !Array.isArray(actors)) {
            return {}; // Return an empty dictionary if actors are not valid
        }
        
        return actors.reduce((acc, actor) => {
            // Check if actor has an id
            if (actor && actor.id) {
                acc[actor.id] = actor;
            }
            return acc;
        }, {} as { [id: string]: typeof actors[0]});
    }
);

export const selectActorById = (id: string | number) => 
createSelector(
    selectActorsDictionary,
    (actorsDictionary) => actorsDictionary[id]
);