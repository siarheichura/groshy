import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { HistoryPageComponent } from './history-page.component';

@NgModule({
  declarations: [HistoryPageComponent],
  imports: [CommonModule, SharedModule],
})
export class HistoryPageModule {}
