import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { GenderFormValue, GenderState, genderFeature } from '@store/gender/gender.reducer';
import { FormGroupState } from 'ngrx-forms';
import * as GenderSelectors from '@store/gender/gender.selectors';
import * as GenderActions from '@store/gender/gender.actions';
import { Store } from '@ngrx/store';
import { toConsole } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrl: './gender-form.component.css'
})
export class GenderFormComponent implements OnInit, OnDestroy {

  vm$ = this.store.select(GenderSelectors.selectGendersListViewModel);
  genderFormState$: Observable<FormGroupState<GenderFormValue>>;
  submittedValue$: Observable<GenderFormValue | undefined>;
  errors$: Observable<string[]>;
  loading$!: Observable<boolean>;
  
  constructor(private store: Store<GenderState>) {
    this.genderFormState$ = this.store.select(genderFeature.selectGenderForm);
    this.submittedValue$ = this.store.select(genderFeature.selectSubmittedValue);
  }
  ngOnInit(): void {
    this.loading$ = this.store.select(genderFeature.selectLoading);
    this.errors$ = this.store.select(genderFeature.selectErrors);
  }

  onSave = () => {
    this.genderFormState$
    .pipe(
      take(1),
      filter(f => {
        toConsole('Form valid: ', f.isValid);
        return f.isValid;
      }),
      map((formState: any) => {
        toConsole('Form: ', formState.value);
        this.store.dispatch(GenderActions.setSubmmittedValue({ submittedValue: formState.value }));
        this.store.dispatch(GenderActions.saveGender());
      })
    )
    .subscribe();
  };

  ngOnDestroy(): void {

  }
}
