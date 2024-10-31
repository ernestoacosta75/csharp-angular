import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import * as ActorActions from '@store/actor/actor.actions';
import { ActorDto } from '@models/actor/actor-dto';
import { actorFeature } from '@store/actor/actor.reducer';
import { box } from 'ngrx-forms';

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrls: ['./autocomplete-actors.component.css']
})
export class AutocompleteActorsComponent {
  @Input() actorForm$: Observable<any>;
  @Input() selectedActorsArr$: Observable<ActorDto[]>;  // Observable for selected actors

  actors$: Observable<ActorDto[]>;  // Actors available for selection
  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  constructor(private store: Store) {
    // Initialize actors$ with available actors here, e.g., from a service or state
    this.actors$ =this.store.select(actorFeature.selectActors);
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedActor: ActorDto = event.option.value;
    
    this.selectedActorsArr$.subscribe((selectedActors) => {
      if (!selectedActors.some(actor => actor.id === selectedActor.id)) {
        const updatedActorsArray = [...selectedActors, selectedActor];

        // Dispatch action to update selectedActorsArr in NgRx store
        this.store.dispatch(ActorActions.setSelectedActors({ selectedActors: updatedActorsArray }));
      }
    });
  }

  toDelete(actorToRemove: ActorDto): void {
    this.selectedActorsArr$.subscribe((selectedActors) => {
      const updatedActorsArray = selectedActors.filter(actor => actor.id !== actorToRemove.id);
      this.store.dispatch(ActorActions.setSelectedActors({ selectedActors: updatedActorsArray }));
    });
  }
}
