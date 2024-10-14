import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { toBase64, toConsole } from '@shared/utilities/common-utils';
import * as R from 'ramda';
import { EventService } from 'src/app/event-service';
import * as ActorActions from '@store/actor/actors.actions';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input()
  currentImageUrl: string;

  @Input() actorId: string; 

  imageBase64: string;

  constructor(private eventService: EventService, private store: Store) {

  }

  onChange = (evt: any) => {
    evt.stopPropagation();
    evt.preventDefault();
    
    const isFilesLengthGreaterThanZero = (evt) => R.pathOr(0, ['target', 'files', 'length'], evt) > 0;

    if (isFilesLengthGreaterThanZero(evt)) {
      const file: File = R.prop(0, evt.target.files);
      
      toBase64(file)
      .then((value: string) => {
        this.imageBase64 = value;
        this.store.dispatch(ActorActions.updateActorPicture({ picture: this.imageBase64 }));
      })
      .catch((err) => toConsole('Error: ',err));
      this.currentImageUrl = null;
    }
  }
}
