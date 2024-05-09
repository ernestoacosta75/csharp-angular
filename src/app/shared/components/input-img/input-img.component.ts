import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '@utilities/common-utils';
import * as R from 'ramda';

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

  onChange = (evt: any) => {
    const isFilesLengthGreaterThanZero = (evt) => R.pathOr(0, ['target', 'files', 'length'], evt) > 0;

    if (isFilesLengthGreaterThanZero(evt)) {
      const file: File = R.prop(0, evt.target.files);
      toBase64(file)
      .then((value: string) => this.imageBase64 = value)
      .catch((err) => console.log(err));

      this.selectArchive.emit(file);
    }
  }
}
