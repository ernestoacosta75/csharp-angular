import { createFeature, createReducer, on } from "@ngrx/store";
import { createFormGroupState, createFormStateReducerWithUpdate, FormGroupState, onNgrxForms, setValue, updateGroup, validate } from "ngrx-forms";
import { required } from "ngrx-forms/validation";
import * as CinemaActions from '@store/cinema/cinema.actions';
import { CinemaDto } from "@models/cinema/cinema-dto";
import { CoordinatesDto } from "@models/coordinates/coordinates-dto";

export interface CinemaFormValue {
    id?: string;
    name: string;
    coordinates: CoordinatesDto;
}

export interface CinemaState {
    cinemas: CinemaDto[];
    recordsTotalCount: number;
    cinemaForm: FormGroupState<CinemaFormValue>;
    submittedValue: CinemaFormValue | undefined;
    loading: boolean;
    errors: string[] | null;
}

export const CINEMA_FORM_ID = 'cinemaForm';

export const INITIAL_CINEMA_FORM_STATE = createFormGroupState<CinemaFormValue>(CINEMA_FORM_ID, {
    id: '',
    name: '',
    coordinates: {
        latitude: 0,
        longitude: 0
    }
});

const validationCinemaFormGroupReducer = createFormStateReducerWithUpdate<CinemaFormValue>(
    updateGroup<CinemaFormValue>({
        name: validate(required),
        coordinates: validate(required),
}));

const initialState: CinemaState = {
    cinemas: [],
    recordsTotalCount: 0,
    cinemaForm: INITIAL_CINEMA_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};

export const cinemaFeature = createFeature({
    name: 'cinemas',
    reducer: (state: CinemaState | undefined, action): CinemaState => {
        if(!state) {
            state = initialState;
        }

        const cinemaFormStateUpdated = validationCinemaFormGroupReducer(state?.cinemaForm, action);

        return createReducer(
            state,
            onNgrxForms(),
            on(CinemaActions.loadCinemas, (state) => ({
                ...state,
                loading: true,
                errors: []
            })),           
            on(CinemaActions.loadCinemasSucess, (state, { cinemas, recordsTotalCount }) => ({
                ...state,
                cinemas,
                recordsTotalCount,
                loading: false
            })),
            on(CinemaActions.loadCinemasFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CinemaActions.loadCinema, (state, { id }) => ({
                ...state,
                loading: true,
                errors: []
            })), 
            on(CinemaActions.loadCinemaSucess, (state) => ({
                ...state,
                loading: false
            })),
            on(CinemaActions.loadCinemaFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CinemaActions.saveCinema, state => ({
                ...state,
                loading: true,
                error: null
            })),
            on(CinemaActions.saveCinemaSuccess, (state) => ({
                ...state,
                actorForm: INITIAL_CINEMA_FORM_STATE,
                loading: false
            })),
            on(CinemaActions.saveCinemaFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CinemaActions.updateCinemaSuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(CinemaActions.updateCinemaFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CinemaActions.setSubmmittedValue, (state,  { submittedValue }) => ({
                ...state,
                submittedValue
            })),
            on(CinemaActions.setCoordinatesValue, (state,  { controlId, coordinates }) => ({
                ...state,
                actorForm: updateGroup<CinemaFormValue>({
                    coordinates: setValue(coordinates)
                })(state.cinemaForm)
            })),
        )({
            ...state, 
            cinemaForm: cinemaFormStateUpdated
        }, action);
    }
});