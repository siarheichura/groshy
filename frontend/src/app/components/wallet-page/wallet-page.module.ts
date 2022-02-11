import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';

import { WalletPageComponent } from './wallet-page.component';

import { MoneyMoveFormComponent } from './money-move-form/money-move-form.component';

@NgModule({
  declarations: [MoneyMoveFormComponent, WalletPageComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class WalletPageModule {}
