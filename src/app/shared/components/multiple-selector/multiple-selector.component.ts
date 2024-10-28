import { Component, Input } from '@angular/core';
import * as R from 'ramda';
import { EventService } from 'src/app/event-service';
import { Events } from '@shared/utilities/events';
import { MultipleSelectorDto } from '@models/multiple-selector/multipleselectordto';
import * as FilmActions from '@store/film/film.actions';
import { Store } from '@ngrx/store';
import { box } from 'ngrx-forms';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css'
})
export class MultipleSelectorComponent {

  @Input()
  sourceType: string = '';

  // @Input()
  itemsSelected: MultipleSelectorDto [] = [];
  
  @Input()
  itemsUnselected: MultipleSelectorDto [] = [];

  constructor(private store: Store) {

  }

  selectAll = () => {
    this.itemsSelected.push(...this.itemsUnselected);
    this.itemsUnselected = [];

    if (this.itemsSelected.length > 0) {
      switch (this.sourceType) {
        case 'Category':
          this.store.dispatch(FilmActions.setCategoriesSelectedValue({ controlId: '', categories: box(this.itemsSelected)}));
          break;
        case 'Cinema':
          this.store.dispatch(FilmActions.setCinemasSelectedValue({ controlId: '', cinemas: box(this.itemsSelected)}));
          break;      
        default:
          break;
      }
    }
  };

  unselectAll = () => {
    this.itemsUnselected.push(...this.itemsSelected);
    this.itemsSelected = [];

    this.dispatchAction();   
  };

  selectItem = (item: MultipleSelectorDto, index: number) => {
    this.itemsSelected = R.append(item, this.itemsSelected);
    this.itemsUnselected = R.remove(index, 1, this.itemsUnselected);

    this.dispatchAction();
  };

  unSelectItem = (item: MultipleSelectorDto, index: number) => {
    this.itemsUnselected = R.append(item, this.itemsUnselected);
    this.itemsSelected = R.remove(index, 1, this.itemsSelected);

    this.dispatchAction();
  };

  dispatchAction = () => {
    switch (this.sourceType) {
      case 'Category':
        this.store.dispatch(FilmActions.setCategoriesSelectedValue({ controlId: '', categories: box(this.itemsSelected)}));
        break;
      case 'Cinema':
        this.store.dispatch(FilmActions.setCinemasSelectedValue({ controlId: '', cinemas: box(this.itemsSelected)}));
        break;      
      default:
        break;
    }    
  }
}
