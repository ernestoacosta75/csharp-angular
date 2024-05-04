import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { GendersIndexComponent } from './features/genders/genders-index/genders-index.component';
import { NewGenderComponent } from './features/genders/new-gender/new-gender.component';
import { ActorsIndexComponent } from './features/actors/actors-index/actors-index.component';
import { NewActorComponent } from './features/actors/new-actor/new-actor.component';
import { CinemasIndexComponent } from './features/cinema/cinemas-index/cinemas-index.component';
import { NewCinemaComponent } from './features/cinema/new-cinema/new-cinema.component';
import { NewFilmComponent } from './features/films/new-film/new-film.component';
import { EditActorComponent } from './features/actors/edit-actor/edit-actor.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'genders',
    component: GendersIndexComponent
  },
  {
    path: 'genders/create',
    component: NewGenderComponent
  },
  {
    path: 'genders',
    component: GendersIndexComponent
  },
  {
    path: 'genders/create',
    component: NewGenderComponent
  },
  {
    path: 'actors',
    component: ActorsIndexComponent,
    children: [
      {
        path: 'edit/:id',
        component: EditActorComponent
      }
    ]
  },
  {
    path: 'actors/create',
    component: NewActorComponent
  },
  {
    path: 'cinemas',
    component: CinemasIndexComponent
  },
  {
    path: 'cinemas/create',
    component: NewCinemaComponent
  },
  {
    path: 'films/create',
    component: NewFilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
