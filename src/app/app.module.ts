import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from '@material/material.module';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LandingPageComponent } from '@features/landing-page/landing-page.component';
import { FilmsModule } from '@features/films/films.module';
import { ActorsModule } from '@features/actors/actors-module.module';
import { CinemaModule } from '@features/cinema/cinema-module.module';
import { GendersModule } from '@features/genders/genders.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@environments/environment';
import { CoreModule } from './core/core.module';
import { ConfirmationModule } from '@store/confirmation/confirmation.module';
@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ActorsModule,
    CinemaModule,
    FilmsModule,
    GendersModule,
    ConfirmationModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
