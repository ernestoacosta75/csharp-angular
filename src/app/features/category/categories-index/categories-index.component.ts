import { Component, OnInit } from '@angular/core';
import * as CategoryActions from '@store/category/category.actions';
import * as CategorySelectors from '@store/category/category.selectors';
import { PageEvent } from '@angular/material/paginator';
import { CategoryState } from '@store/category/category.reducer';
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrl: './categories-index.component.css'
})
export class CategoriesIndexComponent implements OnInit {
  
  vm$ = this.store.select(CategorySelectors.selectCategoriesListViewModel);
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store<CategoryState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.loadCategories({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.store.dispatch(CategoryActions.loadCategories({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  delete = (categoryId: string) => {
    this.store.dispatch(CategoryActions.deleteCategory({ id: categoryId }));
  }

  show = (categoryId: string) => {
    this.store.dispatch(ConfirmationActions.confirmAction({
      entityType: 'category',
      entityId: categoryId,
      message: 'Do you want to delete this category?'
    }));
  }
}