import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilmEditDto } from '../models/film-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import * as R from 'ramda';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.css'
})
export class FilmFormComponent implements OnInit, OnDestroy {
  
  @Input()
  model: FilmEditDto;

  form: FormGroup;
  filmSubscription: Subscription = new Subscription();
  
  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required]
      }],
      resume: '',
      onCinemas: false,
      trailer: '',
      releaseDate: new Date(),
      poster: ''
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }

    const onMarkdownChanged = this.eventService.onEvent(Events.MARKDOWN_CHANGE)
    .subscribe((markdownEvent: any) => {
      const biographyLens = R.lensPath(['resume']);
      this.form.patchValue(R.set(biographyLens, R.path(['payload'], markdownEvent), this.form.value));
    });

    const onImageSelected = this.eventService.onEvent(Events.IMAGE_SELECTED)
    .subscribe((imageSelectedEvent: any) => {
      const archiveLens = R.lensPath(['poster']);
      this.form.patchValue(R.set(archiveLens, R.path(['payload'], imageSelectedEvent), this.form.value));  
    });

    this.filmSubscription.add(onMarkdownChanged);
    this.filmSubscription.add(onImageSelected);
  }

  ngOnDestroy(): void {
    this.filmSubscription.unsubscribe();
  }

  onSave = () => {
    this.eventService.emitEvent(Events.FILM, this.form.value)
  };
}
