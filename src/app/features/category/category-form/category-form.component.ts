import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { CategoryFormValue, CategoryState, categoryFeature } from '@store/category/category.reducer';
import { FormGroupState } from 'ngrx-forms';
import * as CategorySelectors from '@store/category/category.selectors';
import * as CategoryActions from '@store/category/category.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  vm$ = this.store.select(CategorySelectors.selectCategoriesListViewModel);
  categoryFormState$: Observable<FormGroupState<CategoryFormValue>>;
  submittedValue$: Observable<CategoryFormValue | undefined>;
  errors$: Observable<string[]>;
  loading$!: Observable<boolean>;
  
  constructor(private store: Store<CategoryState>) {
    this.categoryFormState$ = this.store.select(categoryFeature.selectCategoryForm);
    this.submittedValue$ = this.store.select(categoryFeature.selectSubmittedValue);
    this.errors$ = this.store.select(categoryFeature.selectErrors);
  }
  ngOnInit(): void {
    this.loading$ = this.store.select(categoryFeature.selectLoading);
    this.errors$ = this.store.select(categoryFeature.selectErrors);
  }

  onSave = () => {
    this.categoryFormState$
    .pipe(
      take(1),
      filter(f => {
        return f.isValid;
      }),
      map((formState: any) => {
        this.store.dispatch(CategoryActions.setSubmmittedValue({ submittedValue: formState.value }));
        this.store.dispatch(CategoryActions.saveCategory());
      })
    )
    .subscribe();
  };

  ngOnDestroy(): void {

  }
}
