import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'course-frontend';
  toHide: boolean = false;
  
  ngOnInit(): void {

  }

  handleRated = (rating: number): void => alert(rating);
}
