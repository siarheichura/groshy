import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { WalletsEffects } from '@store/wallets/wallets.effects';
import { UserEffects } from '@store/user/user.effects';
import { SharedEffects } from '@store/shared/shared.effects';
import {OperationsEffects} from "@store/operations/operations.effects";
import { CategoriesEffects } from "@store/categories/categories.effects";

import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@components/pages/auth/auth.module';

import { AppComponent } from './app.component';
import { FooterComponent } from '@components/main-layout/footer/footer.component';
import { HeaderComponent } from '@components/main-layout/header/header.component';
import { MainComponent } from '@components/main-layout/main/main.component';
import { MenuComponent } from '@components/pages/menu/menu.component';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { UserProfileComponent } from '@components/user-profile/user-profile.component';
import { CategoriesComponent } from '@components/pages/menu/categories/categories.component';
import { CategoriesFormModalComponent } from '@components/pages/menu/categories-form-modal/categories-form-modal.component';

import { AuthInterceptor } from '@services/auth.interceptor';
const INTERCEPTOR_PROVIDER: Provider = { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor }

const STORE_EFFECTS = [WalletsEffects, UserEffects, OperationsEffects, CategoriesEffects, SharedEffects]

const antDesignIcons = AllIcons as { [key: string]: IconDefinition }
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    MainLayoutComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MenuComponent,
    CategoriesComponent,
    CategoriesFormModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(STORE_EFFECTS),
    AppRoutingModule,
    PickerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
