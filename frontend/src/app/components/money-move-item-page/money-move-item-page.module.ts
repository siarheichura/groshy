import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { MoneyMoveItemPageComponent } from './money-move-item-page.component';

@NgModule({
  declarations: [MoneyMoveItemPageComponent],
  imports: [CommonModule, SharedModule],
})
export class MoneyMoveItemPageModule {}
