import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { AuthGuard } from './services/auth.guard';
import { RouterEnum } from './shared/enums/Router.enum';

const routes: Routes = [
  {
    path: RouterEnum.Index,
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: `${RouterEnum.Wallet}/:id`,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/wallet-page/wallet.module').then(
        (m) => m.WalletModule
      ),
  },
  { path: RouterEnum.Error, component: ErrorPageComponent },
  { path: '**', redirectTo: RouterEnum.Error },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
