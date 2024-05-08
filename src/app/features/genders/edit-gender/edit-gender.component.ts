import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenderDto } from '@features/genders/models/gender';

@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent {

  model: GenderDto = {
    name: 'Coco'
  };

  constructor(private router: Router) {
    
  }

  onFormSubmitted = (genderDto: GenderDto) => {
    // .. to save the changes
    console.log(genderDto);
    this.router.navigateByUrl('/genders');
  }
}
