import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationFormComponent } from './components/auth-page/registration-form/registration-form.component';
import { LoginFormComponent } from './components/auth-page/login-form/login-form.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { WalletHeaderComponent } from './shared/components/wallet-header/wallet-header.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { WalletPageComponent } from './components/wallet-page/wallet-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { WalletSettingsPageComponent } from './components/wallets-setting-page/wallet-settings-page.component';

import { AuthGuard } from './services/auth.guard';

import { RouterEnum } from './shared/enums/RouterEnum';

const routes: Routes = [
  {
    path: RouterEnum.Auth,
    component: AuthPageComponent,
    children: [
      { path: RouterEnum.Auth, redirectTo: '', pathMatch: 'full' },
      { path: RouterEnum.Index, component: LoginFormComponent },
      { path: RouterEnum.Registration, component: RegistrationFormComponent },
    ],
  },

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
          { path: RouterEnum.Index, component: WalletPageComponent },
          { path: RouterEnum.Statistics, component: StatisticsPageComponent },
          { path: RouterEnum.Settings, component: WalletSettingsPageComponent },
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
