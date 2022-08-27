import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ROUTER } from '@shared/enums/Router.enum'
import { AuthPageComponent } from './auth-page.component'
import { RegistrationFormComponent } from './registration-form/registration-form.component'
import { LoginFormComponent } from './login-form/login-form.component'

const routes: Routes = [
  {
    path: ROUTER.AUTH,
    component: AuthPageComponent,
    children: [
      { path: ROUTER.INDEX, redirectTo: ROUTER.LOGIN, pathMatch: 'full' },
      { path: ROUTER.LOGIN, component: LoginFormComponent },
      { path: ROUTER.REGISTRATION, component: RegistrationFormComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
