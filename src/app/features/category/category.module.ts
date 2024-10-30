import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgrxFormsModule } from 'ngrx-forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categoryFeature } from '@store/category/category.reducer';
import { CategoryEffects } from '@store/category/category.effects';
import { EditCategoryComponent } from '@features/category/edit-category/edit-category.component';
import { CategoryFormComponent } from '@features/category/category-form/category-form.component';
import { CategoriesIndexComponent } from '@features/category/categories-index/categories-index.component';
import { NewCategoryComponent } from '@features/category/new-category/new-category.component';
import { CategoryRoutingModule } from '@features/category/category-routing.module';


@NgModule({
  declarations: [
    EditCategoryComponent,
    CategoryFormComponent,
    CategoriesIndexComponent,
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(categoryFeature),
    EffectsModule.forFeature([CategoryEffects]),
    NgrxFormsModule
  ],
  exports: [
    EditCategoryComponent,
    CategoryFormComponent,
    CategoriesIndexComponent,
    NewCategoryComponent
  ]
})
export class CategoryModule { }
