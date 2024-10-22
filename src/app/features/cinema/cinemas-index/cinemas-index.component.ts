import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as CinemaActions from '@store/cinema/cinema.actions';
import * as CinemaSelectors from '@store/cinema/cinema.selectors';
import { CinemaState } from '@store/cinema/cinema.reducer';
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cinemas-index',
  templateUrl: './cinemas-index.component.html',
  styleUrl: './cinemas-index.component.css'
})
export class CinemasIndexComponent implements OnInit{

  vm$ = this.store.select(CinemaSelectors.selectCinemaListViewModel);
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store<CinemaState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(CinemaActions.loadCinemas({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.store.dispatch(CinemaActions.loadCinemas({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  delete = (cinemaId: string) => {
    this.store.dispatch(CinemaActions.deleteCinema({ id: cinemaId }));
  }

  show = (cinemaId: string) => {
    this.store.dispatch(ConfirmationActions.confirmAction({
      entityType: 'cinema',
      entityId: cinemaId,
      message: 'Do you want to delete this cinema?'
    }));
  }
}
