import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsListComponent } from './films/films-list/films-list.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { RatingComponent } from './utilities/rating/rating.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { GendersIndexComponent } from './features/genders/genders-index/genders-index.component';
import { NewGenderComponent } from './features/genders/new-gender/new-gender.component';
import { ActorsIndexComponent } from './features/actors/actors-index/actors-index.component';
import { NewActorComponent } from './features/actors/new-actor/new-actor.component';
import { NewFilmComponent } from './features/films/new-film/new-film.component';
import { NewCinemaComponent } from './features/cinema/new-cinema/new-cinema.component';
import { CinemasIndexComponent } from './features/cinema/cinemas-index/cinemas-index.component';
import { EditActorComponent } from './features/actors/edit-actor/edit-actor.component';
import { EditGenderComponent } from './genders/edit-gender/edit-gender.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenderFormComponent } from './features/genders/gender-form/gender-form.component';
import { FilmFilterComponent } from './features/films/film-filter/film-filter.component';
import { EditCinemaComponent } from './features/cinema/edit-cinema/edit-cinema.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    GenericListComponent,
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
    FilmFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
