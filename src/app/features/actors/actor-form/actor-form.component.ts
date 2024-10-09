import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActorDto } from '@models/actor/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { filter, map, Observable, Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { actorsFeature } from '../../../store/actor/actors.reducer';
import { selectActorsListViewModel } from '@store/actor/actors.selectors';
import * as ActorActions from '@store/actor/actors.actions';
import * as ActorSelectors from '@store/actor/actors.selectors';
import { Events } from '@shared/utilities/events';
import { base64ToFile, toConsole } from '@shared/utilities/common-utils';
import * as R from 'ramda';

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

/*
    const onImageSelected = this.eventService.onEvent(Events.IMAGE_SELECTED)
    .subscribe((imageSelectedEvent: any) => {
      toConsole('Image selected event received:', imageSelectedEvent);
      const archiveLens = R.lensPath(['picture']);
      this.form.patchValue(R.set(archiveLens, R.path(['payload'], imageSelectedEvent), this.form.value));  
    });

    const onMarkdownChanged = this.eventService.onEvent(Events.MARKDOWN_CHANGE)
    .subscribe((markdownEvent: any) => {
      const biographyLens = R.lensPath(['biography']);
      this.form.patchValue(R.set(biographyLens, R.path(['payload'], markdownEvent), this.form.value));      
    });



    const onActorEvent = this.eventService.onEvent(Events.ACTOR)
    .pipe(      
      switchMap((actorEvent: any) => {
        if(actorEvent.action === EntityActions.ADD) {
          return this.actorService.create(R.path<ActorDto>(['payload'], actorEvent));
        }
        else if(actorEvent.action === EntityActions.UPDATE) {
          this.form.patchValue(R.path<ActorDto>(['payload'], actorEvent));
          // this.actorService.update(this.model.id, R.path<ActorDto>(['payload'], actorEvent));
        }

        return EMPTY;
      })
    )
    .subscribe({
      next: () => this.router.navigateByUrl('/actors'),
      error: (err) => this.errors = parseApiErrors(err)
    });
 
    this.actorsSubscription.add(onMarkdownChanged);
    
    this.actorsSubscription.add(onActorEvent);
    this.actorsSubscription.add(onImageSelected);*/
  }

  onSave = () => {
    if(this.form.valid) {
      const actor = this.form.value;
      let updateActorPayload = null;
      
      if(this.model?.id) {  
        this.store.select(ActorSelectors.selectActorsListViewModel)
        .pipe(
          map(vm => vm.actorImg)
        )
        .subscribe(actorImg => {
          if (actorImg && actorImg.startsWith('data:')) {
            const file = base64ToFile(updateActorPayload.picture, updateActorPayload.name.concat('_image.png'));
            updateActorPayload = { ...actor, id: this.model.id, picture: file };
          }
        });

        this.store.dispatch(ActorActions.updateActor({ id: this.model.id, actor: updateActorPayload }));
/*
        if (actor.biography) {
          this.store.dispatch(ActorActions.updateActorBiography({ biography: actor.biography }));
        }
          */
      }
      else {
        this.store.dispatch(ActorActions.addActor({ actor }));
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
