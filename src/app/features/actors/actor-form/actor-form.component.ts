import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActorDto } from '../models/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as R from 'ramda';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { Events } from '@utilities/events';
import { EventService } from 'src/app/event-service';
import { ActorService } from '../services/actor.service';
import { EntityActions, parseApiErrors, toConsole } from '@utilities/common-utils';
import { Router } from '@angular/router';

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

  @Input()
  errors: string[] = [];

  form: FormGroup;
  archiveSelectedEvt: string = '';
  imageChanged: boolean = false;
  actorsSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>, 
              private eventService: EventService, private actorService: ActorService,
              private router: Router) {
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

    const onMarkdownChanged = this.eventService.onEvent(Events.MARKDOWN_CHANGE)
    .subscribe((markdownEvent: any) => {
      const biographyLens = R.lensPath(['biography']);
      this.form.patchValue(R.set(biographyLens, R.path(['payload'], markdownEvent), this.form.value));      
    });

    const onImageSelected = this.eventService.onEvent(Events.IMAGE_SELECTED)
    .subscribe((imageSelectedEvent: any) => {
      toConsole('Image selected event received:', imageSelectedEvent);
      const archiveLens = R.lensPath(['picture']);
      this.form.patchValue(R.set(archiveLens, R.path(['payload'], imageSelectedEvent), this.form.value));  
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
    this.actorsSubscription.add(onImageSelected);
    this.actorsSubscription.add(onActorEvent);
  }

  onSave = () => {
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
    }
  }

  ngOnDestroy(): void {
    this.actorsSubscription.unsubscribe();
  }
}
