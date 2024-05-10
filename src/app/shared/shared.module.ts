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
import { InputMarkdownComponent } from './components/input-markdown/input-markdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    MenuComponent,
    GenericListComponent,
    AddRequiredDirective,
    ErrorMessageComponent,
    InputImgComponent,
    InputMarkdownComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    LeafletModule
  ],
  exports: [
    MenuComponent,
    GenericListComponent,
    AddRequiredDirective,
    ErrorMessageComponent,
    InputImgComponent,
    InputMarkdownComponent,
    MapComponent
  ]
})
export class SharedModule { }
