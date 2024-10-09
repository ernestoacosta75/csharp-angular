import { createAction, props } from "@ngrx/store";

export const confirmAction = createAction('[Confirmation] Confirm Action', props<{ entityType: string, entityId: string, message: string }>());
export const confirmActionSucess = createAction('[Confirmation] Confirm Action Success', props<{ entityType: string, entityId: string, message: string }>());
export const confirmActionCancel = createAction('[Confirmation] Confirm Action Cancel');