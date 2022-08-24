import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { OperationsRoutingModule } from "@components/pages/operations/operations-routing.module";
import { DayOperationsComponent } from "@components/pages/operations/day-operations/day-operations.component";
import { OperationFormComponent } from "@components/pages/operations/operation-form/operation-form.component";
import { OperationsComponent } from "@components/pages/operations/operations.component";
import { StatisticsComponent } from "@components/pages/operations/statistics/statistics.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    DayOperationsComponent,
    OperationFormComponent,
    OperationsComponent,
    StatisticsComponent
  ],
  imports: [CommonModule, SharedModule, OperationsRoutingModule, NgxChartsModule],
  exports: [],
  providers: [],
})
export class OperationsModule {}
