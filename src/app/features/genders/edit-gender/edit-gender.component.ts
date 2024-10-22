import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderDto } from 'src/app/types/gender/gender';
import { EntityActions, toConsole } from '@shared/utilities/common-utils';
import * as R from 'ramda';
import { map, Subscription, switchMap } from 'rxjs';
import { GenderState } from '@store/gender/gender.reducer';
import { Store } from '@ngrx/store';
import * as GenderActions from '@store/gender/gender.actions';
import { selectGenderById } from '@store/gender/gender.selectors';
@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent implements OnInit, OnDestroy {

  model: GenderDto;
  formAction: string = EntityActions.UPDATE;

  genderSubscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private store: Store<GenderState>) {
    
  }
  ngOnInit(): void {
    const editGender = this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const genderId = R.path(['id'], params);

        this.store.dispatch(GenderActions.loadGender({ id: genderId }));

        return this.store.select(selectGenderById(genderId))
        .pipe(
          map(gender => {
            if(gender) {
              this.model = {...gender};
              toConsole('Actor: ', gender);
            }
            else {
              this.router.navigate(['/genders']);
            }
          })
        );
      })
    )
    .subscribe();

    this.genderSubscription.add(editGender);
  }

  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
  }
}
