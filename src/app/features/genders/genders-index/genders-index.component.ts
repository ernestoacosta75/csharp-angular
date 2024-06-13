import { GenderDto } from '@features/genders/models/gender';
import { Component, OnInit } from '@angular/core';
import { GenderService } from '../services/gender.service';
import { toConsole } from '@utilities/common-utils';
import { HttpResponse } from '@angular/common/http';
import * as R from 'ramda';

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
    this.genderService.getAll()
    .subscribe({
      next: (result: HttpResponse<GenderDto>) => {
        this.genders = R.path<GenderDto[]>(['body'], result);
        toConsole('Response headers: ', R.path(['headers'], result).get("recordsTotalCount"));
        this.recordsTotalCount = +R.path(['headers'], result).get("recordsTotalCount");
      },
      error: (error: any) => {
        toConsole('error: ', error);
      }
    });    
  }
}