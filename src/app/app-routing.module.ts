import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@features/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'actors',
    loadChildren: () => import('@features/actors/actors-module.module').then(m => m.ActorsModule)
  },
  {
    path: 'cinemas',
    loadChildren: () => import('@features/cinema/cinema-module.module').then(m => m.CinemaModule)
  },
  {
    path: 'films',
    loadChildren: () => import('@features/films/films.module').then(m => m.FilmsModule)
  },
  {
    path: 'genders',
    loadChildren: () => import('@features/genders/genders.module').then(m => m.GendersModule)
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
