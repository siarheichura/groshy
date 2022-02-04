import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import { StatisticsPageComponent } from './statistics-page.component';

@NgModule({
  declarations: [StatisticsPageComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class StatisticsPageModule {}
