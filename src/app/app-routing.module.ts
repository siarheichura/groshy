import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';

import { RouterEnum } from './shared/enums/RouterEnum';

const routes: Routes = [
  { path: RouterEnum.Login, component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
