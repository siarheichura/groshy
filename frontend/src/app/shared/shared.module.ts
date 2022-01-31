import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [ErrorPageComponent, HeaderComponent, MainLayoutComponent],
  imports: [CommonModule, RouterModule, NzResultModule, NzButtonModule],
  providers: [],
})
export class SharedModule {}
