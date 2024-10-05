import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GendersRoutingModule } from '@features/genders/genders-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { EditGenderComponent } from '@features/genders/edit-gender/edit-gender.component';
import { GenderFormComponent } from '@features/genders/gender-form/gender-form.component';
import { GendersIndexComponent } from '@features/genders/genders-index/genders-index.component';
import { NewGenderComponent } from '@features/genders/new-gender/new-gender.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditGenderComponent,
    GenderFormComponent,
    GendersIndexComponent,
    NewGenderComponent
  ],
  imports: [
    CommonModule,
    GendersRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EditGenderComponent,
    GenderFormComponent,
    GendersIndexComponent,
    NewGenderComponent
  ]
})
export class GendersModule { }
