import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StatisticsTabsetComponent } from './components/statistics-tabset/statistics-tabset.component';
import { MoneymoveTabsetComponent } from './components/moneymove-tabset/moneymove-tabset.component';

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
      { path: '', component: MoneymoveTabsetComponent },
      { path: 'statistics', component: StatisticsTabsetComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
