import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActorDto } from '@models/actor/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { actorsFeature } from '../../../store/actor/actors.reducer';
import * as ActorActions from '@store/actor/actors.actions';
import * as ActorSelectors from '@store/actor/actors.selectors';
import { base64ToFile, toConsole } from '@shared/utilities/common-utils';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css']
})
export class ActorFormComponent implements OnInit, OnDestroy {

  @Input()
  model: ActorDto;

  @Input()
  action: string;

  // @Input()
  // errors$: Observable<string[]>;
  //errors: string[] = [];

  loading$!: Observable<boolean>;
  vm$ = this.store.select(ActorSelectors.selectActorsListViewModel);
  form: FormGroup;
  archiveSelectedEvt: string = '';
  imageChanged: boolean = false;
  actorsSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>, 
              private eventService: EventService,
              private router: Router, private store: Store) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      dateOfBirth: ['', {
        validators: [Validators.required]
      }],
      picture: '',
      biography: ''
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }

    // Selecting loading state
    this.loading$ = this.store.select(actorsFeature.selectLoading);
  }

  onSave = () => {
    if(!this.form.valid) {
      return;
    }
    else {
      const actor = this.form.value;
      let updateActorPayload = { ...actor, id: this.model?.id };
      
      this.vm$
        .pipe(
          map(vm => vm.actorImg),
          take(1)
        )
        .subscribe(file => {
          if (file && file.startsWith('data:')) {
            const img = base64ToFile(file, `${updateActorPayload.name}_image.png`);
            updateActorPayload = {...updateActorPayload, picture: img};
          }
          updateActorPayload.picture = file;          
      });

      if(this.model?.id) {  
        // Handling the image first and afteward dispatching the action
        
/*
        this.store.select(ActorSelectors.selectActorsListViewModel)
        .pipe(
          map(vm => vm.actorImg),
          filter(actorImg => actorImg && actorImg.startsWith('data:'))
        )
        .subscribe(actorImg => {
          const file = base64ToFile(actorImg, `${updateActorPayload.name}_image.png`);
            updateActorPayload.picture = file;
            this.store.dispatch(ActorActions.updateActor({ id: this.model.id, actor: updateActorPayload }));
        });
*/        
/*
        if (actor.biography) {
          this.store.dispatch(ActorActions.updateActorBiography({ biography: actor.biography }));
        }
          */

        // this.store.dispatch(ActorActions.updateActor({ id: this.model.id, actor: updateActorPayload }));
      }
      else {
        toConsole('New actor: ', updateActorPayload);
        // this.store.dispatch(ActorActions.addActor({ actor }));
      }
    }
    /*
    if(R.isNotNil(this.form) && this.form.valid) {
      if (this.action === EntityActions.ADD) {
        this.eventService.emitEvent(Events.ACTOR, this.form.value, EntityActions.ADD);
      }

      if (this.action === EntityActions.UPDATE) {
        this.actorService.update(this.model.id, this.form.value)
        .subscribe({
          next: () => this.router.navigateByUrl('/actors'),
          error: (err) => this.errors = parseApiErrors(err)
        });
      }
    }*/
  }

  ngOnDestroy(): void {
    this.actorsSubscription.unsubscribe();
  }
}
