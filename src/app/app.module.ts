import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

// NG-Zorro
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserAmountComponent } from './components/user-amount/user-amount.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StatisticsTabsetComponent } from './components/statistics-tabset/statistics-tabset.component';
import { MoneymoveTabsetComponent } from './components/moneymove-tabset/moneymove-tabset.component';
import { MoneymoveFormComponent } from './components/moneymove-form/moneymove-form.component';
import { MoneymoveBodyComponent } from './components/moneymove-body/moneymove-body.component';
import { MoneymoveCardComponent } from './components/moneymove-card/moneymove-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserAmountComponent,
    MainLayoutComponent,
    HeaderComponent,
    HomePageComponent,
    MoneymoveTabsetComponent,
    StatisticsTabsetComponent,
    MoneymoveFormComponent,
    MoneymoveBodyComponent,
    MoneymoveCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    NzFormModule,
    NzTabsModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzSpinModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
