import { GenderDto } from "@models/gender/gender";
import { createAction, props } from "@ngrx/store";

export const loadGenders = createAction('[Gender] Load Genders', props<{ page: number, itemsToShowAmount: number }>());
export const loadGendersSucess = createAction('[Gender] Load Genders Success', props<{ genders: GenderDto[] }>());
export const loadGendersFailure = createAction('[Gender] Load Genders Failure', props<{ errors: string[] }>());

export const loadGender = createAction('[Gender] Load Gender', props<{ id: string }>());
export const loadGenderSucess = createAction('[Gender] Load Gender Success', props<{ gender: GenderDto }>());
export const loadGenderFailure = createAction('[Gender] Load Gender Failure', props<{ errors: string[] }>());

export const saveGender = createAction('[Gender] Save Actor');
export const saveGenderSuccess = createAction('[Gender] Save Gender Success');
export const saveGenderFailure = createAction('[Gender] Save Gender Failure', props<{ errors: string[] }>());

export const updateGenderSuccess = createAction('[Gender] Update Gender Success');
export const updateGenderFailure = createAction('[Gender] Update Gender Failure', props<{ errors: string[] }>());

export const deleteGender = createAction('[Gender] Delete Gender', props<{ id: string }>());
export const deleteGenderSuccess = createAction('[Gender] Delete Gender Success', props<{ id: string }>());
export const deleteGenderFailure = createAction('[Gender] Delete Gender Failure', props<{ errors: string[] }>());