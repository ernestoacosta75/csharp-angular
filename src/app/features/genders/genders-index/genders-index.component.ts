import { Component, OnInit } from '@angular/core';
import * as GenderActions from '@store/gender/gender.actions';
import * as GenderSelectors from '@store/gender/gender.selectors';
import { PageEvent } from '@angular/material/paginator';
import { GenderState } from '@store/gender/gender.reducer';
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-genders-index',
  templateUrl: './genders-index.component.html',
  styleUrl: './genders-index.component.css'
})
export class GendersIndexComponent implements OnInit {
  
  vm$ = this.store.select(GenderSelectors.selectGendersListViewModel);
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store<GenderState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(GenderActions.loadGenders({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.store.dispatch(GenderActions.loadGenders({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  delete = (genderId: string) => {
    this.store.dispatch(GenderActions.deleteGender({ id: genderId }));
  }

  show = (genderId: string) => {
    this.store.dispatch(ConfirmationActions.confirmAction({
      entityType: 'gender',
      entityId: genderId,
      message: 'Do you want to delete this gender?'
    }));
  }
}