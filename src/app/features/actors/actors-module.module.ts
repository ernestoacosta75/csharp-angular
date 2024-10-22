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
import { StoreModule } from '@ngrx/store';
import { actorFeature } from '@store/actor/actor.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActorEffects } from '@store/actor/actor.effects';
import { NgrxFormsModule } from 'ngrx-forms';


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
    ReactiveFormsModule,
    StoreModule.forFeature(actorFeature),
    EffectsModule.forFeature([ActorEffects]),
    NgrxFormsModule
  ],
  exports: [
    ActorFormComponent,
    ActorsIndexComponent,
    EditActorComponent,
    NewActorComponent
  ]
})
export class ActorsModule { }
