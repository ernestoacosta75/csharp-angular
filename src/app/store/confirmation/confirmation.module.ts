import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ConfirmationEffects } from './confirmation.effects';
import { EffectsModule } from '@ngrx/effects';
import { confirmationFeature } from '@store/confirmation/confirmation.reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(confirmationFeature),
    EffectsModule.forFeature([ConfirmationEffects])
  ]
})
export class ConfirmationModule { }
