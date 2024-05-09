import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { ActorDto, ActorEditDto } from '../models/actor-dto';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {

  model: ActorEditDto = {
    name: 'Drama',
    birthDate: new Date(),
    archive: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_QL75_UX100_CR0,1,100,148_.jpg'
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
