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
import { EditCinemaComponent } from './cinemas/edit-cinema/edit-cinema.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { EditGenderComponent } from './genders/edit-gender/edit-gender.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'genders',
    children: [
      {
        path: 'create',
        component: NewGenderComponent
      },
      {
        path: 'edit/:id',
        component: EditGenderComponent
      },
      {
        path: '',
        component: GendersIndexComponent
      }
    ]
  },
  {
    path: 'actors',
    children: [
      {
        path: 'actors/create',
        component: NewActorComponent
      },
      {
        path: 'actors/edit/:id',
        component: EditActorComponent
      },
      {
        path: '',
        component: ActorsIndexComponent
      }
    ]
  }, 
  {
    path: 'cinemas',
    children: [
      {
        path: 'cinemas/create',
        component: NewCinemaComponent
      },
      {
        path: 'cinemas/edit/:id',
        component: EditCinemaComponent
      },
      {
        path: '',
        component: CinemasIndexComponent
      }
    ]
  },
  {
    path: 'films',
    children: [
      {
        path: 'films/create',
        component: NewFilmComponent
      },
      {
        path: 'films/edit/:id',
        component: EditFilmComponent
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
