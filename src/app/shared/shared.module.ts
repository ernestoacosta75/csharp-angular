import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AddRequiredDirective } from './directives/add-required.directive';



@NgModule({
  declarations: [
    MenuComponent,
    AddRequiredDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MenuComponent,
    AddRequiredDirective
  ]
})
export class SharedModule { }
