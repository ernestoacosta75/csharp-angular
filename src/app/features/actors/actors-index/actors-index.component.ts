import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as ActorsActions from '@store/actor/actors.actions';
import * as ActorsListSelectors from '@store/actor/actors.selectors';
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrl: './actors-index.component.css'
})
export class ActorsIndexComponent implements OnInit {

  vm$ = this.store.select(ActorsListSelectors.selectActorsListViewModel);
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store) {

  }

  ngOnInit(): void {   
    this.store.dispatch(ActorsActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.store.dispatch(ActorsActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  delete = (actorId: string) => {
    this.store.dispatch(ActorsActions.deleteActor({ id: actorId }));
  }

  show = (actorId: string) => {
    // Dispatching the action to open the confirmation dialog
    this.store.dispatch(ConfirmationActions.confirmAction({
      entityType: 'actor',
      entityId: actorId,
      message: 'Do you want to delete this actor?'
    }));
  }
}
