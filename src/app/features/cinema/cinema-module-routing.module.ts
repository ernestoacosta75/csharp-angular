import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemasIndexComponent } from './cinemas-index/cinemas-index.component';
import { NewCinemaComponent } from './new-cinema/new-cinema.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';

const routes: Routes = [
  {
    path: '',
    component: CinemasIndexComponent
  },
  {
    path: 'create',
    component: NewCinemaComponent
  },
  {
    path: 'edit/:id',
    component: EditCinemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaModuleRoutingModule { }
