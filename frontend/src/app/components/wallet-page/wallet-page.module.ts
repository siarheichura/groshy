import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';

import { WalletPageComponent } from './wallet-page.component';
import { MoneymoveCardComponent } from './moneymove-card/moneymove-card.component';
import { MoneymoveBodyComponent } from './moneymove-body/moneymove-body.component';
import { MoneymoveFormComponent } from './moneymove-form/moneymove-form.component';

@NgModule({
  declarations: [
    MoneymoveFormComponent,
    MoneymoveBodyComponent,
    MoneymoveCardComponent,
    WalletPageComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class WalletPageModule {}