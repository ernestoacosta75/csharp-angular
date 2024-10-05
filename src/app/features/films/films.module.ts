import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from '@features/films/films-routing.module';
import { EditFilmComponent } from '@features/films/edit-film/edit-film.component';
import { FilmFilterComponent } from '@features/films/film-filter/film-filter.component';
import { FilmFormComponent } from '@features/films/film-form/film-form.component';
import { FilmsListComponent } from '@features/films/films-list/films-list.component';
import { NewFilmComponent } from '@features/films/new-film/new-film.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditFilmComponent,
    FilmFilterComponent,
    FilmFormComponent,
    FilmsListComponent,
    NewFilmComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FilmsListComponent,
    FilmFilterComponent
  ]
})
export class FilmsModule { }
