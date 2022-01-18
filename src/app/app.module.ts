import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG-Zorro
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Components
import { AppComponent } from './app.component';
import { UserAmountComponent } from './components/user-amount/user-amount.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAmountComponent,
    NavBarComponent,
    TabsetComponent,
    FormComponent,
    CardComponent,
    CardBodyComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
