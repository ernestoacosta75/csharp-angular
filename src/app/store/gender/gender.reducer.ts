import { setGenderFormValue } from './gender.actions';
import { GenderDto } from "@models/gender/gender";
import { createFeature, createReducer, on } from "@ngrx/store";
import { createFormGroupState, createFormStateReducerWithUpdate, FormGroupState, onNgrxForms, setValue, updateGroup, validate } from "ngrx-forms";
import { required } from "ngrx-forms/validation";
import * as GenderActions from '@store/gender/gender.actions';

export interface GenderFormValue {
    id?: string;
    name: string;
}

export interface GenderState {
    genders: GenderDto[];
    recordsTotalCount: number;
    genderForm: FormGroupState<GenderFormValue>;
    submittedValue: GenderFormValue | undefined;
    loading: boolean;
    errors: string[] | null;
}

export const GENDER_FORM_ID = 'genderForm';

export const INITIAL_GENDER_FORM_STATE = createFormGroupState<GenderFormValue>(GENDER_FORM_ID, {
    id: '',
    name: ''
});

const validationGenderFormGroupReducer = createFormStateReducerWithUpdate<GenderFormValue>(
    updateGroup<GenderFormValue>({
        name: validate(required)
}));

const initialState: GenderState = {
    genders: [],
    recordsTotalCount: 0,
    genderForm: INITIAL_GENDER_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};

export const genderFeature = createFeature({
    name: 'genders',
    reducer: (state: GenderState | undefined, action): GenderState => {
        if(!state) {
            state = initialState;
        }

        const genderFormStateUpdated = validationGenderFormGroupReducer(state?.genderForm, action);

        return createReducer(
            state,
            onNgrxForms(),
            on(GenderActions.loadGenders, (state) => ({
                ...state,
                loading: true,
                errors: []
            })),           
            on(GenderActions.loadGendersSucess, (state, { genders, recordsTotalCount }) => ({
                ...state,
                genders,
                recordsTotalCount,
                loading: false
            })),
            on(GenderActions.loadGendersFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(GenderActions.loadGender, (state, { id }) => ({
                ...state,
                loading: true,
                errors: []
            })), 
            on(GenderActions.loadGenderSucess, (state) => ({
                ...state,
                loading: false
            })),
            on(GenderActions.loadGenderFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(GenderActions.saveGender, state => ({
                ...state,
                loading: true,
                error: null
            })),
            on(GenderActions.saveGenderSuccess, (state) => ({
                ...state,
                actorForm: INITIAL_GENDER_FORM_STATE,
                loading: false
            })),
            on(GenderActions.saveGenderFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(GenderActions.updateGenderSuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(GenderActions.updateGenderFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(GenderActions.setGenderFormValue, (state,  { existingValue }) => ({
                ...state,
                genderForm: updateGroup<GenderFormValue>({
                    id: setValue(existingValue.id || ''),
                    name: setValue(existingValue.name)
                })(state.genderForm),
            })),              
            on(GenderActions.setSubmmittedValue, (state,  { submittedValue }) => ({
                ...state,
                submittedValue
            }))
        )({
            ...state, 
            genderForm: genderFormStateUpdated
        }, action);
    }
});