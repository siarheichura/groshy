import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { WalletHeaderComponent } from './components/wallet-page/wallet-header/wallet-header.component';
import { StatisticsComponent } from './components/wallet-page/statistics/statistics.component';
import { MoneyMoveComponent } from './components/wallet-page/money-move/money-move.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

import { AuthGuard } from './services/auth.guard';

import { RouterEnum } from './shared/enums/Router.enum';

const routes: Routes = [
  {
    path: RouterEnum.Index,
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: RouterEnum.Index, component: HomePageComponent },
      {
        path: `${RouterEnum.Wallet}/:id`,
        component: WalletHeaderComponent,
        children: [
          { path: `${RouterEnum.Wallet}/:id`, redirectTo: '' },
          { path: RouterEnum.Index, component: MoneyMoveComponent },
          { path: RouterEnum.Statistics, component: StatisticsComponent },
        ],
      },
    ],
  },
  { path: RouterEnum.Error, component: ErrorPageComponent },
  { path: '**', redirectTo: RouterEnum.Error },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
