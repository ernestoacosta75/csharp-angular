import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit{

  @Input()
  maxRating: number = 5;

  @Input()
  ratingSelected: number = 0;

  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  maxRatingArray: number[] = [];
  previousRating: number = 0;

  voted: boolean = false;

  constructor() {
    
  }
  ngOnInit(): void {
    this.maxRatingArray = Array(this.maxRating).fill(0);
  }

  onMouseEnter = (index: number): void => {
    this.ratingSelected = index + 1;
  };

  onMouseLeave = () => {
    if (this.previousRating !== 0) {
      this.ratingSelected = this.previousRating;
    }
    else {
      this.ratingSelected = 0;
    }
  };

  onRate = (index: number): void => {
    this.ratingSelected = index + 1;
    this.voted = true;
    this.previousRating = this.ratingSelected;
    this.rated.emit(this.ratingSelected);
  };
}
