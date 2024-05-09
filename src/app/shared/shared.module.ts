import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AddRequiredDirective } from './directives/add-required.directive';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InputImgComponent } from './components/input-img/input-img.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';



@NgModule({
  declarations: [
    MenuComponent,
    GenericListComponent,
    AddRequiredDirective,
    ErrorMessageComponent,
    InputImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MenuComponent,
    GenericListComponent,
    AddRequiredDirective,
    ErrorMessageComponent,
    InputImgComponent
  ]
})
export class SharedModule { }
