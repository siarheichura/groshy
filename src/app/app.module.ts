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
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { UserAmountComponent } from './shared/user-amount/user-amount.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MoneymoveFormComponent } from './components/moneymove-page/moneymove-form/moneymove-form.component';
import { MoneymoveBodyComponent } from './components/moneymove-page/moneymove-body/moneymove-body.component';
import { MoneymoveCardComponent } from './components/moneymove-page/moneymove-card/moneymove-card.component';
import { MoneymovePageComponent } from './components/moneymove-page/moneymove-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserAmountComponent,
    MainLayoutComponent,
    HeaderComponent,
    HomePageComponent,
    MoneymoveFormComponent,
    MoneymoveBodyComponent,
    MoneymoveCardComponent,
    MoneymovePageComponent,
    StatisticsPageComponent,
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
