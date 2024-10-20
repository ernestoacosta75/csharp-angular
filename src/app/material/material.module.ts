import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from '@angular/material/list';
import { NgrxMatSelectViewAdapter } from './mat-select-view-adapter';
import { CustomErrorStateMatcherDirective } from './error-state-matcher';
import { MatListOptionFixDirective } from './mat-list-option-fix';


const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatTableModule,
  DragDropModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatListModule
];

@NgModule({
  declarations: [
    NgrxMatSelectViewAdapter,
    CustomErrorStateMatcherDirective,
    MatListOptionFixDirective,
  ],
  imports: [material],
  exports: [
    material,
    NgrxMatSelectViewAdapter,
    CustomErrorStateMatcherDirective,
    MatListOptionFixDirective,
  ]
})
export class MaterialModule { }
