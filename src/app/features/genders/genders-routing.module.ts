import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersIndexComponent } from './genders-index/genders-index.component';
import { NewGenderComponent } from './new-gender/new-gender.component';
import { EditGenderComponent } from './edit-gender/edit-gender.component';

const routes: Routes = [
  {
    path: '',
    component: GendersIndexComponent
  },
  {
    path: 'create',
    component: NewGenderComponent
  },
  {
    path: 'edit/:id',
    component: EditGenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GendersRoutingModule { }
