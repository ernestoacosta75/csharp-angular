import { Component, OnInit } from '@angular/core';
import { ActorDto } from '../models/actor-dto';
import { ActorService } from '../services/actor.service';
import { HttpResponse } from '@angular/common/http';
import * as R from 'ramda';
import { toConsole } from '@utilities/common-utils';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrl: './actors-index.component.css'
})
export class ActorsIndexComponent implements OnInit {

  actors: ActorDto[];
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private actorService: ActorService) {

  }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsAmountToShow);
  }

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

  updatePagination = (data: PageEvent) => {
    this.recordsAmountToShow = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.loadRecords(this.currentPage, this.recordsAmountToShow);
  }

  delete = (id: string) => {
    this.actorService.delete(id)
    .subscribe({
      next: () => {
        this.loadRecords(this.currentPage, this.recordsAmountToShow);
      },
      error: (error) => toConsole('Error deleting actor: ', error)
    });
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
