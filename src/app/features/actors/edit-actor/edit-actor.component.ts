import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDto } from '../models/actor-dto';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event-service';
import { Events } from '@utilities/events';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit, OnDestroy {

  model: ActorDto = {
    name: 'Coco',
    birthDate: new Date(),
    picture: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_QL75_UX100_CR0,1,100,148_.jpg'
  };

  actorSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //alert(R.path(['id'], params));
    });

    const onActorEdited = this.eventService.onEvent(Events.ACTOR)
    .subscribe((actorEvent: any) => {
      this.router.navigateByUrl('/actors');
    });

    this.actorSubscription.add(onActorEdited);
  }

  ngOnDestroy(): void {
    this.actorSubscription.unsubscribe();
  }
}
