import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from "@models/category/category";
import * as R from 'ramda';
import { map, switchMap } from 'rxjs';
import { CategoryState } from '@store/category/category.reducer';
import { Store } from '@ngrx/store';
import * as CategoryActions from '@store/category/category.actions';
import { selectCategoryById } from '@store/category/category.selectors';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  model: CategoryDto;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private store: Store<CategoryState>) {
    
  }
  ngOnInit(): void {
    const editCategory = this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const categoryId = R.path(['id'], params);

        this.store.dispatch(CategoryActions.loadCategory({ id: categoryId }));

        return this.store.select(selectCategoryById(categoryId))
        .pipe(
          map(category => {
            if(category) {
              this.model = {...category};
              this.store.dispatch(CategoryActions.setCategoryFormValue({ existingValue: category }));
            }
            else {
              this.router.navigate(['/categories']);
            }
          })
        );
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {

  }
}
