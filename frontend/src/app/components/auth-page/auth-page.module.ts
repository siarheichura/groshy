import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import { AuthPageComponent } from './auth-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class AuthPageModule {}
