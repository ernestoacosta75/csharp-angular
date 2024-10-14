import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActorActions from '@store/actor/actors.actions';
import { actorsFeature } from '@store/actor/actors.reducer';
import * as ActorSelectors from '@store/actor/actors.selectors';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css'
})
export class InputMarkdownComponent {
  
  @Input()
  markdownContent: string = '';
  
  @Input()
  textAreaPlaceholder: string = 'Text';

  actor$ = this.store.select(actorsFeature.selectActor);

  constructor(private store: Store) {

  }

  inputTextArea = () =>  {
    this.actor$
    .subscribe(actor => {
      this.store.dispatch(ActorActions.updateActorBiography({ id: actor.id, biography: this.markdownContent }));
    });
  }
}
