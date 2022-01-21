import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { MoneymovePageComponent } from './components/moneymove-page/moneymove-page.component';

const paths = {
  index: '',
  login: 'login',
  wallet: 'wallet',
  statistics: 'statistics',
};

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  {
    path: 'wallet/:id',
    component: MainLayoutComponent,
    children: [
      { path: 'wallet/:id', redirectTo: '' },
      { path: '', component: MoneymovePageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
