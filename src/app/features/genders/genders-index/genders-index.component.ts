import { GenderDto } from '@features/genders/models/gender';
import { Component, OnInit } from '@angular/core';
import { GenderService } from '../services/gender.service';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-genders-index',
  templateUrl: './genders-index.component.html',
  styleUrl: './genders-index.component.css'
})
export class GendersIndexComponent implements OnInit {
  
  genders: GenderDto[];
  columnsToDisplay = ['name', 'actions'];

  constructor(private genderService: GenderService) {
  }

  ngOnInit(): void {
    this.genderService.getAll()
    .subscribe({
      next: (genders: GenderDto[]) => {
        this.genders = genders;
        toConsole('genders: ', this.genders);
      },
      error: (error: any) => {
        toConsole('error: ', error);
      }
    });    
  }
}