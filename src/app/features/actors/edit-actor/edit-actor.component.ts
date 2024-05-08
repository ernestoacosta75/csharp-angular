import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { ActorDto } from '../models/actor-dto';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {

  model: ActorDto = {
    name: 'Drama',
    birthDate: new Date()
  };
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      alert(R.path(['id'], params));
    });
  }

  onFormSubmitted = (actorrDto: ActorDto) => {
    // .. to save the changes
    console.log(actorrDto);
    this.router.navigateByUrl('/actors');
  }
}
