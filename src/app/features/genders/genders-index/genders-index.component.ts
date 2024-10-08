import { GenderDto } from 'src/app/types/gender/gender';
import { Component, OnInit } from '@angular/core';
import { GenderService } from '../services/gender.service';
import { toConsole } from '@shared/utilities/common-utils';
import { HttpResponse } from '@angular/common/http';
import * as R from 'ramda';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genders-index',
  templateUrl: './genders-index.component.html',
  styleUrl: './genders-index.component.css'
})
export class GendersIndexComponent implements OnInit {
  
  genders: GenderDto[];
  columnsToDisplay = ['name', 'actions'];
  pageSizeOptions = [5, 10, 20, 50];
  recordsTotalCount: number = 0;
  recordsAmountToShow = 10;
  currentPage = 1;

  constructor(private genderService: GenderService) {
  }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsAmountToShow);
  }

  loadRecords = (page: number, itemsToShowAmount: number) => {
    this.genderService.getAll(page, itemsToShowAmount)
    .subscribe({
      next: (result: HttpResponse<GenderDto>) => {
        this.genders = R.path<GenderDto[]>(['body'], result);
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
    this.genderService.delete(id)
    .subscribe({
      next: () => {
        this.loadRecords(this.currentPage, this.recordsAmountToShow);
      },
      error: (error) => toConsole('Error deleting gender: ', error)
    });
  }

  show = (id: string) => Swal.fire({
    title: 'Confirmation',
    text: 'Do you want to delete this gender?',
    icon: 'warning',
    showCancelButton: true
  }).then((result) => {
    if(result.isConfirmed) {
      this.delete(id);
    }
  })
}