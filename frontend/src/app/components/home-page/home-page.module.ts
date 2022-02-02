import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageComponent } from './home-page.component';
import { WalletsListComponent } from './wallets-list/wallets-list.component';
import { CreateWalletFormComponent } from './wallet-form/wallet-form.component';

@NgModule({
  declarations: [
    HomePageComponent,
    WalletsListComponent,
    CreateWalletFormComponent,
  ],
  imports: [CommonModule, SharedModule, HomePageRoutingModule],
  providers: [],
})
export class HomePageModule {}
