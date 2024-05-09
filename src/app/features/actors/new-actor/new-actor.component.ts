import { Component } from '@angular/core';
import { ActorDto } from '../models/actor-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent {

  constructor(private router: Router) {

  }

  onFormSubmitted = (actorDto: ActorDto) => {
    // .. to save the changes
    console.log(actorDto);
    // this.router.navigateByUrl('/actors');
  }
}
