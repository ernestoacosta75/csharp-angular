import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsIndexComponent } from './actors-index/actors-index.component';
import { NewActorComponent } from './new-actor/new-actor.component';
import { EditActorComponent } from './edit-actor/edit-actor.component';

const routes: Routes = [
  {
    path: '',
    component: ActorsIndexComponent
  },
  {
    path: 'create',
    component: NewActorComponent
  },
  {
    path: 'edit/:id',
    component: EditActorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsModuleRoutingModule { }
