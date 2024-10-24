import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as ActorActions from '@store/actor/actor.actions';
import { ActorState } from '@store/actor/actor.reducer';
import * as ActorSelectors from '@store/actor/actor.selectors';
import * as ConfirmationActions from '@store/confirmation/confirmation.actions';

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrl: './actors-index.component.css'
})
export class ActorsIndexComponent implements OnInit {

  vm$ = this.store.select(ActorSelectors.selectActorsListViewModel);
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store<ActorState>) {

  }

  ngOnInit(): void {   
    this.store.dispatch(ActorActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.store.dispatch(ActorActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }

  delete = (actorId: string) => {
    this.store.dispatch(ActorActions.deleteActor({ id: actorId }));
  }

  show = (actorId: string) => {
    this.store.dispatch(ConfirmationActions.confirmAction({
      entityType: 'actor',
      entityId: actorId,
      message: 'Do you want to delete this actor?'
    }));
  }
}
