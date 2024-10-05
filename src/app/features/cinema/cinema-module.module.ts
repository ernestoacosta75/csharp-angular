import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaModuleRoutingModule } from '@features/cinema/cinema-module-routing.module';
import { CinemaFormComponent } from '@features/cinema/cinema-form/cinema-form.component';
import { CinemasIndexComponent } from '@features/cinema/cinemas-index/cinemas-index.component';
import { EditCinemaComponent } from '@features/cinema/edit-cinema/edit-cinema.component';
import { NewCinemaComponent } from '@features/cinema/new-cinema/new-cinema.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CinemaFormComponent,
    CinemasIndexComponent,
    EditCinemaComponent,
    NewCinemaComponent
  ],
  imports: [
    CommonModule,
    CinemaModuleRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CinemaModule { }
