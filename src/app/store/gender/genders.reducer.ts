import { GenderDto } from "@models/gender/gender";
import { createFeature, createReducer } from "@ngrx/store";
import { createFormGroupState, createFormStateReducerWithUpdate, FormGroupState, updateGroup, validate } from "ngrx-forms";
import { required } from "ngrx-forms/validation";

export interface GenderFormValue {
    id?: string;
    name: string;
}

export interface GenderState {
    genders: GenderDto[];
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
    genderForm: INITIAL_GENDER_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};

export const gendersFeature = createFeature({
    name: 'genders',
    reducer: (state: GenderState | undefined, action): GenderState => {
        if(!state) {
            state = initialState;
        }

        const genderFormStateUpdated = validationGenderFormGroupReducer(state?.genderForm, action);

        return createReducer();
    }
});