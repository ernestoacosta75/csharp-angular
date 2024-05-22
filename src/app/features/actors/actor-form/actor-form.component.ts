import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActorDto, ActorEditDto } from '../models/actor-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as R from 'ramda';
import { Subscription, filter } from 'rxjs';
import { Events } from '@utilities/events';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit, OnDestroy {

  @Input()
  model: ActorEditDto;

  form: FormGroup;
  eventsSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>, private eventService: EventService) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      birthDate: ['', {
        validators: [Validators.required]
      }],
      archive: '',
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
      const archiveLens = R.lensPath(['archive']);
      this.form.patchValue(R.set(archiveLens, R.path(['payload'], imageSelectedEvent), this.form.value));  
    });

    this.eventsSubscription.add(onMarkdownChanged);
    this.eventsSubscription.add(onImageSelected);
  }

  onArchiveSelected = (file: File) => {
    const archiveLens = R.lensPath(['archive']);
    this.form.patchValue(R.set(archiveLens, file, this.form.value));
  };

  onSave = () => this.eventService.emitEvent(Events.ACTOR, this.form.value); // this.submitForm.emit(this.form.value);

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

}
