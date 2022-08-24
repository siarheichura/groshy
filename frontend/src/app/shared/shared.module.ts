import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from './ng-zorro.module';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    CalculatorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgZorroModule,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgZorroModule,
    CalculatorComponent,
  ],
  providers: [],
})
export class SharedModule {}
