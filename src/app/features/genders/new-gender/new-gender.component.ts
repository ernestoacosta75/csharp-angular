import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenderDto } from '../models/gender';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent {

  constructor(private router: Router) {
    
  }

  onFormSubmitted = (genderDto: GenderDto) => {
    // .. to save the changes
    console.log(genderDto);
    this.router.navigateByUrl('/genders');
  }
}
