import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderDto } from '@features/genders/models/gender';
import { EventService } from 'src/app/event-service';
import { EntityActions } from '@utilities/common-utils';
@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent implements OnInit, OnDestroy {

  model: GenderDto = {
    name: 'Coco'
  };

  formAction: string = EntityActions.UPDATE;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) {
    
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
