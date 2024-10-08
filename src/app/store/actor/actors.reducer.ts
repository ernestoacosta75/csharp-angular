import { createFeature, createReducer, on } from "@ngrx/store";
import { ActorDto } from "../../types/actor/actor-dto";
import * as ActorsActions from 'src/app/store/actor/actors.actions';

interface State {
    actors: ActorDto[];
    loading: boolean;
    errors: string[] | null;
}

const initialState: State = {
    actors: [],
    loading: false,
    errors: null
};

// With CreateFeature, the feature name and reducer are passed to it
export const actorsFeature = createFeature({
    name: 'actors',
    reducer: createReducer(
        initialState,
        on(ActorsActions.loadActors, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorsActions.loadActorsSucess, (state, { actors }) => ({
            ...state,
            actors,
            loading: false
        })),
        on(ActorsActions.loadActorsFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        on(ActorsActions.addActor, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorsActions.addActorSuccess, (state, { actor }) => ({
            ...state,
            actors: [...state.actors, actor],
            loading: false
        })),
        on(ActorsActions.addActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        on(ActorsActions.updateActor, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorsActions.updateActorSuccess, (state, { actor }) => ({
            ...state,
            actors: state.actors.map(a => a.id === actor.id ? actor : a),
            loading: false
        })),
        on(ActorsActions.addActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        on(ActorsActions.deleteActor, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorsActions.deleteActorSuccess, (state, { id }) => ({
            ...state,
            actors: state.actors.filter(a => a.id !== id),
            loading: false
        })),
        on(ActorsActions.addActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        }))
    )
});