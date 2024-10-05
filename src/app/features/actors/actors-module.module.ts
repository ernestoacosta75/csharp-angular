import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsModuleRoutingModule } from '@features/actors/actors-module-routing.module';
import { ActorFormComponent } from '@features/actors/actor-form/actor-form.component';
import { ActorsIndexComponent } from '@features/actors/actors-index/actors-index.component';
import { EditActorComponent } from '@features/actors/edit-actor/edit-actor.component';
import { NewActorComponent } from '@features/actors/new-actor/new-actor.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActorFormComponent,
    ActorsIndexComponent,
    EditActorComponent,
    NewActorComponent
  ],
  imports: [
    CommonModule,
    ActorsModuleRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ActorsModule { }
