import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { MoneymovePageComponent } from './components/moneymove-page/moneymove-page.component';

import { RouterEnum } from './shared/enums/RouterEnum';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  // {
  //   path: RouterEnum.Index,
  //   component: MainLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: '/', pathMatch: 'full' },
  //     { path: '', component: HomePageComponent },
  //   ],
  // },

  { path: RouterEnum.Login, component: LoginPageComponent },
  { path: RouterEnum.Index, component: HomePageComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
