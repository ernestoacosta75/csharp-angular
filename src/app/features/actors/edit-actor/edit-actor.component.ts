import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      alert(R.path(['id'], params));
    });
  }
}
