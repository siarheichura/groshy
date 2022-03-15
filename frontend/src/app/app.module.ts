import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { WalletsEffects } from './store/wallets/wallets.effects';
import { UserEffects } from './store/user/user.effects';
import { SharedEffects } from './store/shared/shared.effects';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth-page/auth.module';
import { HomePageModule } from './components/home-page/home-page.module';
import { WalletModule } from './components/wallet-page/wallet.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthInterceptor } from './services/auth.interceptor';
const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, UserProfileComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    HomePageModule,
    WalletModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([WalletsEffects, UserEffects, SharedEffects]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
