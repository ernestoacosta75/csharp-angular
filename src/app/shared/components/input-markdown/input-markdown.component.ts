import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActorActions from '@store/actor/actor.actions';
import { FormControlState } from 'ngrx-forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css'
})
export class InputMarkdownComponent implements OnInit {
  
  @Input() markdownControlState: FormControlState<string>;
  
  @Input()
  textAreaPlaceholder: string = 'Text';

  inputSubject$ = new Subject<string>();

  constructor(private store: Store) {

  }

  ngOnInit() {
    // Subscribe to changes in the markdown control state
    this.inputSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((content) => {
        // Dispatch the action to update the actor's biography in the store
        this.store.dispatch(ActorActions.setBiographyValue({
          controlId: this.markdownControlState.id,
          value: content
        }));
      });

    // Initialize the subject with the current value of the control
    if (this.markdownControlState) {
      this.inputSubject$.next(this.markdownControlState.value);
    }
  }

  onInputChange(content: string) {
    this.inputSubject$.next(content);
  }

  inputTextArea = () =>  {
    this.inputSubject$.next(this.markdownControlState.value);
  }
}
