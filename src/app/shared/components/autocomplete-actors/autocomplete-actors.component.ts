import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import * as R from 'ramda';

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrl: './autocomplete-actors.component.css'
})
export class AutocompleteActorsComponent implements OnInit {
  
  actors = [
    { name: 'Tom Holland', character: '', picture: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_QL75_UX100_CR0,1,100,148_.jpg' },
    { name: 'Tom Hanks', character: '', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_QL75_UY148_CR1,0,100,148_.jpg' },
    { name: 'Samuel L. Jackson', character: '', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_QL75_UX100_CR0,1,100,148_.jpg' }
  ];

  originalActorsArr = R.clone(this.actors);
  selectedActorsArr = [];

  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  character: string;

  control: FormControl = new FormControl();

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges
    .subscribe(value => {
      this.actors = R.clone(this.originalActorsArr);
      this.actors = R.filter(actor => R.toLower(actor.name).indexOf(value) !== -1, this.actors);
    });
  }

  optionSelected = (evt: MatAutocompleteSelectedEvent) => {
    this.selectedActorsArr.push(R.path(['option', 'value'], evt));
    this.control.patchValue('');

    if(R.isNotNil(this.table)) {
      this.table.renderRows();
    }
  };

  toDelete = (item: any) => {
    this.selectedActorsArr.splice(this.selectedActorsArr.indexOf(item.name), 1);
    this.table.renderRows();
  };

  dropTable = (evt: CdkDragDrop<any[]>) => {
    const prevIndex = R.findIndex(R.equals(evt.item.data))(this.selectedActorsArr);
    moveItemInArray(this.selectedActorsArr, prevIndex, evt.currentIndex);
    this.table.renderRows();
  }
}
