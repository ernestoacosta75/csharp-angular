import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntityActions } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  formAction: string = EntityActions.ADD;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
}
