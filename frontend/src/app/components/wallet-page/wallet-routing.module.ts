import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPageComponent } from './wallet-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MoneyMoveComponent } from './money-move/money-move.component';
import { RouterEnum } from '@shared/enums/Router.enum';

const routes: Routes = [
  {
    path: `${RouterEnum.Wallet}/:id`,
    component: WalletPageComponent,
    children: [
      { path: `${RouterEnum.Wallet}/:id`, redirectTo: RouterEnum.Index },
      { path: RouterEnum.Index, component: MoneyMoveComponent },
      { path: RouterEnum.Statistics, component: StatisticsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
