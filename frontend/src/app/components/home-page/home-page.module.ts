import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageComponent } from './home-page.component';
import { WalletFormComponent } from './wallet-form/wallet-form.component';

@NgModule({
  declarations: [HomePageComponent, WalletFormComponent],
  imports: [CommonModule, SharedModule, HomePageRoutingModule],
  providers: [],
})
export class HomePageModule {}
