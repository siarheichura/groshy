import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { HomePageComponent } from './home-page.component';
import { WalletModalComponent } from './wallet-modal/wallet-modal.component';

@NgModule({
  declarations: [HomePageComponent, WalletModalComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class HomePageModule {}
