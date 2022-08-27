import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@shared/shared.module'

import { OperationsRoutingModule } from '@pages/operations/operations-routing.module'
import { OperationFormComponent } from '@pages/operations/operation-form/operation-form.component'
import { OperationsComponent } from '@pages/operations/operations.component'
import { StatisticsComponent } from '@pages/operations/statistics/statistics.component'
import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations: [
    OperationFormComponent,
    OperationsComponent,
    StatisticsComponent,
  ],
  imports: [CommonModule, SharedModule, OperationsRoutingModule, NgxChartsModule],
  exports: [],
  providers: [],
})
export class OperationsModule {
}
