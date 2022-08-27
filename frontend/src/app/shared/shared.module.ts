import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgZorroModule } from './ng-zorro.module'

@NgModule({
  declarations: [],
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
  ],
  providers: [],
})
export class SharedModule {
}
