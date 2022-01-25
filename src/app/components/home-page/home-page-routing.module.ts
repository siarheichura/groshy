import { StatisticsPageComponent } from './../statistics-page/statistics-page.component';
import { MoneymovePageComponent } from './../moneymove-page/moneymove-page.component';
import { MainLayoutComponent } from './../../shared/main-layout/main-layout.component';
import { HomePageComponent } from './home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterEnum } from './../../shared/enums/RouterEnum';

const routes: Routes = [
  {
    path: RouterEnum.Index,
    component: MainLayoutComponent,
    children: [{ path: RouterEnum.Index, component: HomePageComponent }],
  },
  {
    path: `${RouterEnum.Wallet}/:id`,
    component: MainLayoutComponent,
    children: [
      { path: `${RouterEnum.Wallet}/:id`, redirectTo: '' },
      { path: RouterEnum.Index, component: MoneymovePageComponent },
      { path: RouterEnum.Statistics, component: StatisticsPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
