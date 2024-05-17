import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilmEditDto } from '../models/film-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import * as R from 'ramda';
import { MultipleSelectorDto } from '@shared/components/multiple-selector/models/multipleselectordto';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.css'
})
export class FilmFormComponent implements OnInit, OnDestroy {
  
  @Input()
  model: FilmEditDto;

  form: FormGroup;

  gendersNotSelected: MultipleSelectorDto [] = [
    { key: 1, value: 'Drama' },
    { key: 2, value: 'Action' },
    { key: 3, value: 'Comedy' }
  ];

  gendersSelected: MultipleSelectorDto [] = [];
  
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
      poster: '',
      gendersId: ''
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

    const onGenderSelected = this.eventService.onEvent(Events.GENDER_SELECTED)
    .subscribe((genderSelectedEvent: any) => {
      const genderLens = R.lensPath(['gendersId']);
      const genderKeys = R.pipe(
        R.pathOr([], ['payload']),
        R.map(R.prop('key')),
        R.sort((a, b) => a - b)
      )(genderSelectedEvent); 
      
      this.form.patchValue(R.set(genderLens, genderKeys, this.form.value));  
    });

    this.filmSubscription.add(onMarkdownChanged);
    this.filmSubscription.add(onImageSelected);
    this.filmSubscription.add(onGenderSelected);
  }

  ngOnDestroy(): void {
    this.filmSubscription.unsubscribe();
  }

  onSave = () => {
    this.eventService.emitEvent(Events.FILM, this.form.value)
  };
}
