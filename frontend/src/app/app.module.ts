import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { reducers } from './store';
import { WalletsEffects } from './store/wallets/wallets.effects';
import { UserEffects } from './store/user/user.effects';
import { SharedEffects } from './store/shared/shared.effects';

import { SharedModule } from './shared/shared.module';
import { AuthPageModule } from './components/auth-page/auth-page.module';
import { HomePageModule } from './components/home-page/home-page.module';
import { WalletPageModule } from './components/wallet-page/wallet-page.module';
import { StatisticsPageModule } from './components/statistics-page/statistics-page.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { WalletHeaderComponent } from './components/wallet-header/wallet-header.component';
import { WalletSettingsComponent } from './components/wallet-settings/wallet-settings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthInterceptor } from './services/auth.interceptor';
const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    WalletHeaderComponent,
    WalletSettingsComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthPageModule,
    HomePageModule,
    WalletPageModule,
    StatisticsPageModule,
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
