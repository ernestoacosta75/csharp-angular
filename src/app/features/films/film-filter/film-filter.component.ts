import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-filter',
  templateUrl: './film-filter.component.html',
  styleUrl: './film-filter.component.css',
})
export class FilmFilterComponent implements OnInit {
  
  form: FormGroup;
  genders = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Thirller' },
  ];

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genderId: 0,
      nextReleases: false,
      onCinemas: false
    });
  }

  onClick = () => this.form.reset();
}
