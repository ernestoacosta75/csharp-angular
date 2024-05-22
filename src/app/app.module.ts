import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsListComponent } from '@features/films/films-list/films-list.component';
import { SharedModule } from '@shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from '@material/material.module';
import { RatingComponent } from '@utilities/rating/rating.component';
import { LandingPageComponent } from '@features/landing-page/landing-page.component';
import { GendersIndexComponent } from '@features/genders/genders-index/genders-index.component';
import { NewGenderComponent } from './features/genders/new-gender/new-gender.component';
import { ActorsIndexComponent } from '@features/actors/actors-index/actors-index.component';
import { NewActorComponent } from '@features/actors/new-actor/new-actor.component';
import { NewFilmComponent } from '@features/films/new-film/new-film.component';
import { NewCinemaComponent } from '@features/cinema/new-cinema/new-cinema.component';
import { CinemasIndexComponent } from '@features/cinema/cinemas-index/cinemas-index.component';
import { EditActorComponent } from '@features/actors/edit-actor/edit-actor.component';
import { EditGenderComponent } from '@features/genders/edit-gender/edit-gender.component';
import { EditFilmComponent } from './features/films/edit-film/edit-film.component';
import { GenderFormComponent } from '@features/genders/gender-form/gender-form.component';
import { FilmFilterComponent } from '@features/films/film-filter/film-filter.component';
import { EditCinemaComponent } from '@features/cinema/edit-cinema/edit-cinema.component';
import { ActorFormComponent } from '@features/actors/actor-form/actor-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CinemaFormComponent } from './features/cinema/cinema-form/cinema-form.component';
import { FilmFormComponent } from './features/films/film-form/film-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    RatingComponent,
    LandingPageComponent,
    GendersIndexComponent,
    NewGenderComponent,
    ActorsIndexComponent,
    NewActorComponent,
    NewFilmComponent,
    NewCinemaComponent,
    CinemasIndexComponent,
    EditActorComponent,
    EditGenderComponent,
    EditCinemaComponent,
    EditFilmComponent,
    GenderFormComponent,
    FilmFilterComponent,
    ActorFormComponent,
    CinemaFormComponent,
    FilmFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
