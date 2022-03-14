import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { StatisticsPageComponent } from './statistics-page.component';

@NgModule({
  declarations: [StatisticsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
})
export class StatisticsPageModule {}
