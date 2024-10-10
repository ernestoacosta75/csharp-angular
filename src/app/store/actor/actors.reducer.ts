import { createFeature, createReducer, on } from "@ngrx/store";
import { ActorDto } from "../../types/actor/actor-dto";
import * as ActorActions from 'src/app/store/actor/actors.actions';

interface State {
    actors: ActorDto[];
    actor: ActorDto;
    actorImg: string;
    loading: boolean;
    errors: string[] | null;
}

const initialState: State = {
    actors: [],
    actor: null,
    actorImg: null,
    loading: false,
    errors: null
};

// With CreateFeature, the feature name and reducer are passed to it
export const actorsFeature = createFeature({
    name: 'actors',
    reducer: createReducer(
        initialState,
        // Actors list
        on(ActorActions.loadActors, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorActions.loadActorsSucess, (state, { actors }) => ({
            ...state,
            actors,
            loading: false
        })),
        on(ActorActions.loadActorsFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        // Single actor
        on(ActorActions.loadActor, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorActions.loadActorSucess, (state, { actor }) => ({
            ...state,
            actors: [...state.actors, actor],
            actor: actor,
            loading: false,
            errors: []
        })),
        on(ActorActions.loadActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        // New actor
        on(ActorActions.addActor, (state, { actor }) => ({
            ...state,
            actor: actor,
            loading: true,
            errors: []
        })),
        on(ActorActions.addActorSuccess, (state, { actor }) => ({
            ...state,
            actors: [...state.actors, actor],
            actor: actor,
            loading: false
        })),
        on(ActorActions.addActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        // Update actor
        on(ActorActions.updateActor, (state, { actor }) => ({
            ...state,
            actor: actor,
            loading: true,
            errors: []
        })),
        on(ActorActions.updateActorSuccess, (state, { actor }) => ({
            ...state,
            actor: actor,
            errors: [],
            loading: false
        })),
        on(ActorActions.updateActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        // Update actor picture
        on(ActorActions.updateActorPicture, (state, { picture }) => ({
            ...state,
            actorImg: picture,
            errors: [],
            loading: false
        })),
        on(ActorActions.updateActorPictureSuccess, (state, { actor }) => ({
        ...state,
        actors: state.actors.map(a => a.id === actor.id ? actor : a),
        loading: false
        })),
        on(ActorActions.updateActorPictureFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        })),
        // Update actor biography
        on(ActorActions.updateActorBiography, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorActions.updateActorBiographySuccess, (state, { actor }) => ({
            ...state,
            actors: state.actors.map(a => a.id === actor.id ? actor : a),
            loading: false
        })),
        // Delete actor
        on(ActorActions.deleteActor, (state) => ({
            ...state,
            loading: true,
            errors: []
        })),
        on(ActorActions.deleteActorSuccess, (state, { id }) => ({
            ...state,
            actors: state.actors.filter(a => a.id !== id),
            loading: false
        })),
        on(ActorActions.deleteActorFailure, (state, { errors }) => ({
            ...state,
            errors,
            loading: false
        }))
    )
});