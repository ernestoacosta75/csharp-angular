import { Component, OnInit } from '@angular/core';
import { GenderService } from '../services/gender.service';
import { toConsole } from '@utilities/common-utils';

@Component({
  selector: 'app-genders-index',
  templateUrl: './genders-index.component.html',
  styleUrl: './genders-index.component.css'
})
export class GendersIndexComponent implements OnInit {
  
  constructor(private genderService: GenderService) {
  }

  ngOnInit(): void {
    const genders = this.genderService.getAll();
    toConsole('genders: ', genders);
  }
}
