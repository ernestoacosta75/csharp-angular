import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent {

  constructor(private router: Router) {
    
  }

  onSave = () => {
    // .. to save the changes
    this.router.navigateByUrl('/genders');
  }
}
