import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesIndexComponent } from './categories-index/categories-index.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesIndexComponent
  },
  {
    path: 'create',
    component: NewCategoryComponent
  },
  {
    path: 'edit/:id',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
