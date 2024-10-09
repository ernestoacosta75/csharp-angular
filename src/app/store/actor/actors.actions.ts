import { createAction, props } from "@ngrx/store";
import { ActorDto } from "../../types/actor/actor-dto";

export const loadActors = createAction('[Actor] Load Actors', props<{ page: number, itemsToShowAmount: number }>());
export const loadActorsSucess = createAction('[Actor] Load Actors Success', props<{ actors: ActorDto[] }>());
export const loadActorsFailure = createAction('[Actor] Load Actors Failure', props<{ errors: string[] }>());

export const loadActor = createAction('[Actor] Load Actor', props<{ id: string }>());
export const loadActorSucess = createAction('[Actor] Load Actor Success', props<{ actor: ActorDto }>());
export const loadActorFailure = createAction('[Actor] Load Actor Failure', props<{ errors: string[] }>());

export const addActor = createAction('[Actor] Add Actor', props<{ actor: ActorDto }>());
export const addActorSuccess = createAction('[Actor] Add Actor Success', props<{ actor: ActorDto }>());
export const addActorFailure = createAction('[Actor] Add Actor Failure', props<{ errors: string[] }>());

export const updateActor = createAction('[Actor] Update Actor', props<{ id: string, actor: ActorDto }>());
export const updateActorSuccess = createAction('[Actor] Update Actor Success');
export const updateActorFailure = createAction('[Actor] Update Actor Failure', props<{ errors: string[] }>());

export const deleteActor = createAction('[Actor] Delete Actor', props<{ id: string }>());
export const deleteActorSuccess = createAction('[Actor] Delete Actor Success', props<{ id: string }>());
export const deleteActorFailure = createAction('[Actor] Delete Actor Failure', props<{ errors: string[] }>());

export const updateActorPicture = createAction('[Actor] Update Actor Picture', props<{ picture: string }>());
export const updateActorPictureSuccess = createAction('[Actor] Update Actor Picture Success', props<{ actor: ActorDto }>());
export const updateActorPictureFailure = createAction('[Actor] Update Actor Picture Failure', props<{ errors: string[] }>());

export const updateActorBiography = createAction('[Actor] Update Actor Biography', props<{ biography: string }>());
export const updateActorBiographySuccess = createAction('[Actor] Update Actor Biography Success', props<{ actor: ActorDto }>());