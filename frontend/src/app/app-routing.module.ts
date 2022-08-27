import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@services/auth.guard'

import { MainLayoutComponent } from '@components/main-layout/main-layout.component'
import { MenuComponent } from '@pages/menu/menu.component'
import { ErrorPageComponent } from '@components/error-page/error-page.component'
import { ROUTER } from '@shared/enums/Router.enum'

const routes: Routes = [
  {
    path: ROUTER.INDEX,
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: ROUTER.INDEX,
        loadChildren: () => import('@pages/operations/operations.module').then(m => m.OperationsModule),
      },
      {
        path: ROUTER.WALLETS,
        loadChildren: () => import('@pages/wallets/wallets.module').then(m => m.WalletsModule),
      },
      { path: ROUTER.MENU, component: MenuComponent },
    ],
  },
  { path: ROUTER.ERROR, component: ErrorPageComponent },
  { path: ROUTER.WILDCARD, redirectTo: ROUTER.ERROR },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
