import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActorActions from '@store/actor/actors.actions';
import { actorsFeature } from '@store/actor/actors.reducer';
import * as ActorSelectors from '@store/actor/actors.selectors';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css'
})
export class InputMarkdownComponent implements OnInit {
  
  @Input()
  markdownContent: string = '';
  
  @Input()
  textAreaPlaceholder: string = 'Text';

  actor$ = this.store.select(actorsFeature.selectActor);
  inputSubject$ = new Subject<string>();

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.inputSubject$
      .pipe(
        debounceTime(300), // Waits for 300ms pause in events
        distinctUntilChanged() // Only emits when the value changes
      )
      .subscribe((content: string) => {
        this.actor$.subscribe(actor => {
          this.store.dispatch(
            ActorActions.updateActorBiography({ id: actor?.id, biography: content })
          );
        });
      });
  }

  inputTextArea = () =>  {
    this.inputSubject$.next(this.markdownContent);
  }
}
