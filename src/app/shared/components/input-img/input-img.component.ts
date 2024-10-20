import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { toBase64, toConsole } from '@shared/utilities/common-utils';
import * as R from 'ramda';
import * as ActorActions from '@store/actor/actors.actions';
import { FormControlState } from 'ngrx-forms';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input()
  pictureControlState: FormControlState<string>;

  @Input()
  currentImageUrl: string;

  @Input() actorId: string; 

  imageBase64: string;

  constructor(private store: Store) {

  }

  onChange = (evt: any) => {
    evt.stopPropagation();
    evt.preventDefault();
    
    const input = evt.target as HTMLInputElement;
    const isFilesLengthGreaterThanZero = (evt) => R.pathOr(0, ['target', 'files', 'length'], evt) > 0;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0]; //  R.prop(0, evt.target.files);
      
      toBase64(file)
      .then((base64: string) => {
        this.store.dispatch(ActorActions.setPictureValue({ controlId: this.pictureControlState.id, value: base64 }));
        input.value = '';
      })
      .catch((err) => toConsole('Error: ',err));
      this.currentImageUrl = null;
    }
  }
}
