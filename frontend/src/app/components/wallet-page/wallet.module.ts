import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { SharedModule } from './../../shared/shared.module';
import { MoneyMoveComponent } from './money-move/money-move.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MoneyMoveFormComponent } from './money-move-form/money-move-form.component';
import { WalletHeaderComponent } from './wallet-header/wallet-header.component';
import { WalletSettingsComponent } from './wallet-settings/wallet-settings.component';

@NgModule({
  declarations: [
    MoneyMoveComponent,
    WalletHeaderComponent,
    WalletSettingsComponent,
    StatisticsComponent,
    MoneyMoveFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
})
export class WalletModule {}
