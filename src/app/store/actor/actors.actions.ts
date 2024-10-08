import { createAction, props } from "@ngrx/store";
import { ActorDto } from "../../types/actor/actor-dto";

export const loadActors = createAction('[Actor] Load Actors', props<{ page: number, itemsToShowAmount: number }>());
export const loadActorsSucess = createAction('[Actor] Load Actors Success', props<{ actors: ActorDto[] }>());
export const loadActorsFailure = createAction('[Actor] Load Actors Failure', props<{ errors: string[] }>());

export const addActor = createAction('[Actor] Add Actor', props<{ actor: ActorDto }>());
export const addActorSuccess = createAction('[Actor] Add Actor Success', props<{ actor: ActorDto }>());
export const addActorFailure = createAction('[Actor] Add Actor Failure', props<{ errors: string[] }>());

export const updateActor = createAction('[Actor] Update Actor', props<{ id: string, actor: ActorDto }>());
export const updateActorSuccess = createAction('[Actor] Update Actor Success', props<{ actor: ActorDto }>());
export const updateActorFailure = createAction('[Actor] Update Actor Failure', props<{ errors: string[] }>());

export const deleteActor = createAction('[Actor] Delete Actor', props<{ id: string }>());
export const deleteActorSuccess = createAction('[Actor] Delete Actor Success', props<{ id: string }>());
export const deleteActorFailure = createAction('[Actor] Delete Actor Failure', props<{ errors: string[] }>());