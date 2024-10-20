import { createAction, props } from "@ngrx/store";
import { ActorDto } from "../../types/actor/actor-dto";
import { ActorFormValue } from "./actors.reducer";

export const loadActors = createAction('[Actor] Load Actors', props<{ page: number, itemsToShowAmount: number }>());
export const loadActorsSucess = createAction('[Actor] Load Actors Success', props<{ actors: ActorDto[] }>());
export const loadActorsFailure = createAction('[Actor] Load Actors Failure', props<{ errors: string[] }>());

export const loadActor = createAction('[Actor] Load Actor', props<{ id: string }>());
export const loadActorSucess = createAction('[Actor] Load Actor Success', props<{ actor: ActorDto }>());
export const loadActorFailure = createAction('[Actor] Load Actor Failure', props<{ errors: string[] }>());

export const saveActor = createAction('[Actor] Save Actor');
export const saveActorSuccess = createAction('[Actor] Save Actor Success');
export const saveActorFailure = createAction('[Actor] Save Actor Failure', props<{ errors: string[] }>());

export const updateActor = createAction('[Actor] Update Actor', props<{ id: string, actor: ActorDto }>());
export const updateActorSuccess = createAction('[Actor] Update Actor Success');
export const updateActorFailure = createAction('[Actor] Update Actor Failure', props<{ errors: string[] }>());

export const deleteActor = createAction('[Actor] Delete Actor', props<{ id: string }>());
export const deleteActorSuccess = createAction('[Actor] Delete Actor Success', props<{ id: string }>());
export const deleteActorFailure = createAction('[Actor] Delete Actor Failure', props<{ errors: string[] }>());

export const setSubmmittedValue = createAction('[Actor] Set Submitted Value', props<{ submittedValue: ActorFormValue }>());
export const setPictureValue = createAction('[Actor] Set Picture Value', props<{ controlId: string, value: string }>());
export const setBiographyValue = createAction('[Actor] Set Biography Value', props<{ controlId: string, value: string }>());
