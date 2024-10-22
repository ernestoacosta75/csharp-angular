import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityActions } from '@shared/utilities/common-utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { actorFeature, ActorState } from '../../../store/actor/actor.reducer';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent implements OnInit, OnDestroy {

  errors: string [] = [];
  errors$: Observable<string[]>;
  formAction: string = EntityActions.ADD;
  
  constructor(private router: Router, private store: Store<ActorState>) {

  }
  ngOnInit(): void {
    this.errors$ = this.store.select(actorFeature.selectErrors);
  }

  ngOnDestroy(): void {

  }
}
