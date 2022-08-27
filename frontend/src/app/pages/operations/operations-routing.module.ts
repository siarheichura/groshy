import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ROUTER } from '@shared/enums/Router.enum'
import { OperationsComponent } from '@pages/operations/operations.component'

const routes: Routes = [
  { path: ROUTER.INDEX, redirectTo: ROUTER.EXPENSE, pathMatch: 'full' },
  { path: ROUTER.EXPENSE, component: OperationsComponent },
  { path: ROUTER.INCOME, component: OperationsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {
}
