import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import { WalletSettingsPageComponent } from './wallet-settings-page.component';

@NgModule({
  declarations: [WalletSettingsPageComponent],
  imports: [CommonModule, SharedModule],
})
export class WalletsSettingPageModule {}
