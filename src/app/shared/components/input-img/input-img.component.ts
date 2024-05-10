import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64, toConsole } from '@utilities/common-utils';
import { Events } from '@utilities/events';
import * as R from 'ramda';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input()
  currentImageUrl: string;
  
  @Output()
  selectArchive: EventEmitter<File> = new EventEmitter<File>();

  imageBase64: string;

  constructor(private eventService: EventService) {

  }

  onChange = (evt: any) => {
    const isFilesLengthGreaterThanZero = (evt) => R.pathOr(0, ['target', 'files', 'length'], evt) > 0;

    if (isFilesLengthGreaterThanZero(evt)) {
      const file: File = R.prop(0, evt.target.files);
      toBase64(file)
      .then((value: string) => this.imageBase64 = value)
      .catch((err) => toConsole('Error: ',err));;

      //this.selectArchive.emit(file);
      this.eventService.emitEvent(Events.IMAGE_SELECTED, file)
      this.currentImageUrl = null;
    }
  }
}
