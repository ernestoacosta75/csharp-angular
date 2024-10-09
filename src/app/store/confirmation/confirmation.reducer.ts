import { createFeature, createReducer, on } from "@ngrx/store";
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';

interface ConfirmationState {
    entityType: string | null;
    entityId: string | null;
    message: string | null;
    isVisible: boolean;
}

const initialState: ConfirmationState = {
    entityType: null,
    entityId: null,
    message: null,
    isVisible: false,
};

// With CreateFeature, the feature name and reducer are passed to it
export const confirmationFeature = createFeature({
    name: 'confirmation',
    reducer: createReducer(
        initialState,
        on(ConfirmationActions.confirmAction, (state, { entityType, entityId, message }) => ({
            ...state,
            entityType,
            entityId,
            message,
            isVisible: true
        })),
        on(ConfirmationActions.confirmActionSucess, (state, { entityType, entityId }) => ({
            ...state,
            entityType,
            entityId,
            isVisible: false
        })),
        on(ConfirmationActions.confirmActionCancel, (state) => ({
            ...state,
            isVisible: false
        }))
    )
});