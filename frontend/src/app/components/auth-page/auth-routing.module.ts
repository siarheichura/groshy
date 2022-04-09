import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterEnum } from '@shared/enums/Router.enum';
import { AuthPageComponent } from './auth-page.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {
    path: RouterEnum.Auth,
    component: AuthPageComponent,
    children: [
      {
        path: RouterEnum.Index,
        redirectTo: RouterEnum.Login,
        pathMatch: 'full',
      },
      { path: RouterEnum.Login, component: LoginFormComponent },
      { path: RouterEnum.Registration, component: RegistrationFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
