import { Component, Input } from '@angular/core';
import { MultipleSelectorDto } from './models/multipleselectordto';
import * as R from 'ramda';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css'
})
export class MultipleSelectorComponent {

  @Input()
  itemsSelected: MultipleSelectorDto [] = [];
  
  @Input()
  itemsUnselected: MultipleSelectorDto [] = [];

  constructor(private eventService: EventService) {

  }

  selectAll = () => {
    this.itemsSelected.push(...this.itemsUnselected);
    this.itemsUnselected = [];
    this.eventService.emitEvent(Events.GENDER_SELECTED, this.itemsSelected);
  };

  unselectAll = () => {
    this.itemsUnselected.push(...this.itemsSelected);
    this.itemsSelected = [];
  };

  selectItem = (item: MultipleSelectorDto, index: number) => {
    this.itemsSelected = R.append(item, this.itemsSelected);
    this.itemsUnselected = R.remove(index, 1, this.itemsUnselected);
    this.eventService.emitEvent(Events.GENDER_SELECTED, this.itemsSelected);
  };

  unSelectItem = (item: MultipleSelectorDto, index: number) => {
    this.itemsUnselected = R.append(item, this.itemsUnselected);
    this.itemsSelected = R.remove(index, 1, this.itemsSelected);
  };
}
