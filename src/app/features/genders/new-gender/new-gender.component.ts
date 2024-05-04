import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ''
    });
  }

  onSave = () => {
    // .. to save the changes
    this.router.navigateByUrl('/genders');
  }
}
