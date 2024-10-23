import { setActorFormValue } from './actor.actions';
import { ActorDto } from "@models/actor/actor-dto";
import { createFeature, createReducer, on } from "@ngrx/store";
import {
    createFormGroupState,
    createFormStateReducerWithUpdate,
    FormGroupState,
    onNgrxForms,
    setValue,
    updateGroup,
    validate,
  } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import * as ActorActions from '@store/actor/actor.actions';

export interface ActorFormValue {
    id?: string;
    name: string;
    picture: string;
    dateOfBirth: string | Date;
    biography: string;
}

export interface ActorState {
    actors: ActorDto[];
    actorForm: FormGroupState<ActorFormValue>;
    submittedValue: ActorFormValue | undefined;
    loading: boolean;
    errors: string[] | null;
}

export const ACTOR_FORM_ID = 'actorForm';

export const INITIAL_ACTOR_FORM_STATE = createFormGroupState<ActorFormValue>(ACTOR_FORM_ID, {
    id: '',
    name: '',
    picture: '',
    dateOfBirth: new Date(Date.UTC(1970, 0, 1)).toISOString(),
    biography: '',
});

const validationActorFormGroupReducer = createFormStateReducerWithUpdate<ActorFormValue>(
    updateGroup<ActorFormValue>({
        name: validate(required),
        dateOfBirth: validate(required)
}));

const initialState: ActorState = {
    actors: [],
    actorForm: INITIAL_ACTOR_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};



// With CreateFeature, the feature name and reducer are passed to it
export const actorFeature = createFeature({
    name: 'actors',
    reducer: (state: ActorState | undefined, action): ActorState => {
        // If the state is undefined, return the initial state
        if(!state) {
            state = initialState;
        }

        // First, updating the actorForm state with validation
        const actorFormStateUpdated = validationActorFormGroupReducer(state?.actorForm, action);
        
        // Then, updating the rest of the state using the main reducer
        return createReducer(
            state,
            onNgrxForms(),
            on(ActorActions.loadActors, (state) => ({
                ...state,
                loading: true,
                errors: []
            })),
            on(ActorActions.loadActor, (state, { id }) => ({
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
            on(ActorActions.loadActorFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(ActorActions.saveActor, state => ({
                ...state,
                loading: true,
                error: null
            })),
            on(ActorActions.saveActorSuccess, (state) => ({
                ...state,
                actorForm: INITIAL_ACTOR_FORM_STATE,
                loading: false
            })),
            on(ActorActions.saveActorFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),

            on(ActorActions.updateActorSuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(ActorActions.updateActorFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(ActorActions.setActorFormValue, (state,  { existingValue }) => ({
                ...state,
                actorForm: updateGroup<ActorFormValue>({
                    id: setValue(existingValue.id || ''),
                    name: setValue(existingValue.name),
                    picture: setValue(existingValue.picture),
                    dateOfBirth: setValue(existingValue.dateOfBirth),
                    biography: setValue(existingValue.biography)
                })(state.actorForm),
            })),            
            on(ActorActions.setSubmmittedValue, (state,  { submittedValue }) => ({
                ...state,
                submittedValue,
            })),
            on(ActorActions.setPictureValue, (state,  { controlId, value }) => ({
                ...state,
                actorForm: updateGroup<ActorFormValue>({
                    picture: setValue(value)
                })(state.actorForm)
            })),
            on(ActorActions.setBiographyValue, (state,  { controlId, value }) => ({
                ...state,
                actorForm: updateGroup<ActorFormValue>({
                    biography: setValue(value)
                })(state.actorForm)
            }))
        )({
            ...state, 
            actorForm: actorFormStateUpdated
        }, action);
    }
});