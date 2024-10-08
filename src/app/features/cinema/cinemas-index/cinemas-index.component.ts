import { Component, OnInit } from '@angular/core';
import { CinemaDto } from '../../../types/cinema/cinema-dto';
import { CinemaService } from '../services/cinema.service';
import { HttpResponse } from '@angular/common/http';
import * as R from 'ramda';
import { toConsole } from '@shared/utilities/common-utils';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cinemas-index',
  templateUrl: './cinemas-index.component.html',
  styleUrl: './cinemas-index.component.css'
})
export class CinemasIndexComponent implements OnInit{

  cinemas: CinemaDto[];
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private cinemaService: CinemaService) {

  }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsAmountToShow);
  }

  loadRecords = (page: number, itemsToShowAmount: number) => {
    this.cinemaService.getAll(page, itemsToShowAmount)
    .subscribe({
      next: (result: HttpResponse<CinemaDto>) => {
        this.cinemas = R.path<CinemaDto[]>(['body'], result);
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
    this.cinemaService.delete(id)
    .subscribe({
      next: () => {
        this.loadRecords(this.currentPage, this.recordsAmountToShow);
      },
      error: (error) => toConsole('Error deleting cinema: ', error)
    });
  }

  show = (id: string) => Swal.fire({
    title: 'Confirmation',
    text: 'Do you want to delete this cinema?',
    icon: 'warning',
    showCancelButton: true
  }).then((result) => {
    if(result.isConfirmed) {
      this.delete(id);
    }
  })

}
