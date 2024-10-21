import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { filter, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActorFormValue, actorsFeature } from '@store/actor/actors.reducer';
import * as ActorActions from '@store/actor/actors.actions';
import * as ActorSelectors from '@store/actor/actors.selectors';
import { getDateValueConverter, toConsole } from '@shared/utilities/common-utils';
import { FormGroupState, NgrxValueConverter } from 'ngrx-forms';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css']
})
export class ActorFormComponent implements OnInit, OnDestroy {

  actorFormState$: Observable<FormGroupState<ActorFormValue>>;
  submittedValue$: Observable<ActorFormValue | undefined>;
  errors$: Observable<string[]>;

  loading$!: Observable<boolean>;
  vm$ = this.store.select(ActorSelectors.selectActorsListViewModel);
  form: FormGroup;
  archiveSelectedEvt: string = '';
  imageChanged: boolean = false;
  dateValueConverter:  NgrxValueConverter<Date | null, string | null>;
    
  constructor(private dateAdapter: DateAdapter<Date>, private store: Store) {
    this.dateAdapter.setLocale('en-GB');
    this.dateValueConverter = getDateValueConverter();
    this.actorFormState$ = this.store.select(actorsFeature.selectActorForm);
    this.submittedValue$ = this.store.select(actorsFeature.selectSubmittedValue);
  }
  ngOnInit(): void {
    // Selecting loading state
    this.loading$ = this.store.select(actorsFeature.selectLoading);

    // Selecting errors
    this.errors$ = this.store.select(actorsFeature.selectErrors);
  }

  onSave = () => {
    this.actorFormState$
    .pipe(
      take(1),
      filter(f => {
        toConsole('Form valid: ', f.isValid);
        return f.isValid;
      }),
      map((formState: any) => {
        toConsole('Form: ', formState.value);
        this.store.dispatch(ActorActions.setSubmmittedValue({ submittedValue: formState.value }));
        this.store.dispatch(ActorActions.saveActor());
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {

  }
}
