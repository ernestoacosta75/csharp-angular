import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { NewFilmComponent } from './new-film/new-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { FilmFilterComponent } from './film-filter/film-filter.component';

const routes: Routes = [
  {
    path: '',
    component: FilmFilterComponent,
  },
  {
    path: 'create',
    component: NewFilmComponent
  },
  {
    path: 'edit/:id',
    component: EditFilmComponent
  },
  {
    path: 'index',
    component: FilmsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
