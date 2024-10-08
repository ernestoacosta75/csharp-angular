import { Component, OnInit } from '@angular/core';
import { ActorDto } from '@types/actor/actor-dto';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as ActorsActions from '@store/actor/actors.actions';
import { map, Observable } from 'rxjs';
import { selectActorsList } from '@store/actor/actors.selectors';

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrl: './actors-index.component.css'
})
export class ActorsIndexComponent implements OnInit {

  // actors: ActorDto[];
  actors$: Observable<ActorDto[]>;
  loading$: Observable<boolean>;
  errors$: Observable<string[]>;
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private store: Store<{ actors: ActorDto[]}>) {

  }

  ngOnInit(): void {
    this.actors$ = this.store.select(selectActorsList)
    .pipe(
    map(({ actors }) => actors)
    );

    this.loading$ = this.store.select(selectActorsList)
    .pipe(
    map(({ loading }) => loading)
    );

    this.errors$ = this.store.select(selectActorsList)
    .pipe(
    map(({ errors }) => errors)
    );
    
    this.store.dispatch(ActorsActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
    // this.loadRecords(this.currentPage, this.recordsAmountToShow);
  }
/*
  loadRecords = (page: number, itemsToShowAmount: number) => {
    this.actorService.getAll(page, itemsToShowAmount)
    .subscribe({
      next: (result: HttpResponse<ActorDto>) => {
        this.actors = R.path<ActorDto[]>(['body'], result);
        this.recordsTotalCount = +R.path(['headers'], result).get("recordsTotalCount");
      },
      error: (error: any) => {
        toConsole('error: ', error);
      }
    });  
  }
*/
  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    // this.loadRecords(this.currentPage, this.recordsAmountToShow);
    this.store.dispatch(ActorsActions.loadActors({ page: this.currentPage, itemsToShowAmount: this.recordsAmountToShow}));
  }
/*
  delete = (id: string) => {
    this.actorService.delete(id)
    .subscribe({
      next: () => {
        this.loadRecords(this.currentPage, this.recordsAmountToShow);
      },
      error: (error) => toConsole('Error deleting actor: ', error)
    });
  }
*/
  delete = (actorId: string) => {
    this.store.dispatch(ActorsActions.deleteActor({ id: actorId }));
  }

  show = (id: string) => Swal.fire({
    title: 'Confirmation',
    text: 'Do you want to delete this actor?',
    icon: 'warning',
    showCancelButton: true
  }).then((result) => {
    if(result.isConfirmed) {
      this.delete(id);
    }
  })  
}
