import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, NzResultModule, NzButtonModule],
  providers: [],
})
export class SharedModule {}
