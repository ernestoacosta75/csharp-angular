import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { toConsole } from '@utilities/common-utils';
import * as R from 'ramda';

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrl: './autocomplete-actors.component.css'
})
export class AutocompleteActorsComponent implements OnInit {
  
  actors = [
    { name: 'Tom Holland', picture: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_QL75_UX100_CR0,1,100,148_.jpg' },
    { name: 'Tom Hanks', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_QL75_UY148_CR1,0,100,148_.jpg' },
    { name: 'Samuel L. Jackson', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_QL75_UX100_CR0,1,100,148_.jpg' }
  ];

  originalActorsArr = R.clone(this.actors);
  selectedActorsArr = [];

  control: FormControl = new FormControl();

  ngOnInit(): void {
    this.control.valueChanges
    .subscribe(value => {
      this.actors = R.clone(this.originalActorsArr);
      this.actors = R.filter(actor => R.toLower(actor.name).indexOf(value) !== -1, this.actors);
    });
  }

  optionSelected = (evt: MatAutocompleteSelectedEvent) => {
    toConsole('From autocomplete: ', R.path(['option', 'value'], evt));
    this.selectedActorsArr = R.append(R.path(['option', 'value'], evt), this.selectedActorsArr);
    this.control.patchValue('');
  };
}
