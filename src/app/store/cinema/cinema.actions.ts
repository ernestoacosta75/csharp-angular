import { CinemaDto } from "@models/cinema/cinema-dto";
import { createAction, props } from "@ngrx/store";
import { CinemaFormValue } from "./cinema.reducer";
import { CoordinatesDto } from "@models/coordinates/coordinates-dto";

export const loadCinemas = createAction('[Cinema] Load Cinemas', props<{ page: number, itemsToShowAmount: number }>());
export const loadCinemasSucess = createAction('[Cinema] Load Cinemas Success', props<{ cinemas: CinemaDto[], recordsTotalCount: number }>());
export const loadCinemasFailure = createAction('[Cinema] Load Cinemas Failure', props<{ errors: string[] }>());

export const loadCinema = createAction('[Cinema] Load Cinema', props<{ id: string }>());
export const loadCinemaSucess = createAction('[Cinema] Load Cinema Success', props<{ cinema: CinemaDto }>());
export const loadCinemaFailure = createAction('[Cinema] Load Cinema Failure', props<{ errors: string[] }>());

export const saveCinema = createAction('[Cinema] Save Cinema');
export const saveCinemaSuccess = createAction('[Cinema] Save Cinema Success');
export const saveCinemaFailure = createAction('[Cinema] Save Cinema Failure', props<{ errors: string[] }>());

export const updateCinemaSuccess = createAction('[Cinema] Update Cinema Success');
export const updateCinemaFailure = createAction('[Cinema] Update Cinema Failure', props<{ errors: string[] }>());

export const deleteCinema = createAction('[Cinema] Delete Cinema', props<{ id: string }>());
export const deleteCinemaSuccess = createAction('[Cinema] Delete Cinema Success', props<{ id: string }>());
export const deleteCinemaFailure = createAction('[Cinema] Delete Cinema Failure', props<{ errors: string[] }>());

export const setSubmmittedValue = createAction('[Cinema] Set Submitted Value', props<{ submittedValue: CinemaFormValue }>());
export const setCoordinatesValue = createAction('[Cinema] Set Coordinates Value', props<{ controlId: string, coordinates: CoordinatesDto }>());