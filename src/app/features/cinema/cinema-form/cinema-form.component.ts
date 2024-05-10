import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events } from '@utilities/events';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { CinemaDto } from 'src/app/feature/cinema/models/cinema-dto';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit, OnDestroy {

  @Input()
  model: CinemaDto;

  form: FormGroup;
  cinemaSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onSave = () => this.eventService.emitEvent(Events.CINEMA, this.form.value); 
  ngOnDestroy(): void {

  }
}
