import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import dayjs, { Dayjs } from 'dayjs';
import { NzModalService } from 'ng-zorro-antd/modal';

import { walletsSelector } from '@store/wallets/wallets.selectros';
import { operationsSelector } from '@store/operations/operations.selectors';
import { SetCurrentTab } from '@store/shared/shared.actions';
import { GetWallets } from '@store/wallets/wallets.actions';
import {
  AddOperation,
  DeleteOperation,
  EditOperation,
  GetOperations, ResetOperationsState,
  SetOperationsPeriod,
  SetOperationsType
} from '@store/operations/operations.actions';
import { Wallet } from '@shared/classes/Wallet';
import { MODAL_WIDTH } from '@shared/constants/constants';
import { DayOperations, Operation } from "@shared/interfaces/Operation.interface";
import {OperationFormComponent} from '@components/pages/operations/operation-form/operation-form.component';
import { GetUserCategories } from "@store/categories/categories.actions";
import { SVG } from "@shared/constants/svg-images";
import { NzIconService } from "ng-zorro-antd/icon";

@UntilDestroy()
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit, OnDestroy {
  wallets$: Observable<Wallet[]> = this.store.select(walletsSelector)
  operations$: Observable<DayOperations[]> = this.store.select(operationsSelector)
  operationType: string = this.route.snapshot.routeConfig.path
  datePicker: FormControl = new FormControl(new Date())
  startDate: Dayjs = dayjs(this.datePicker.value).startOf('month')
  finishDate: Dayjs = dayjs(this.datePicker.value).endOf('month')

  constructor(
    private modal: NzModalService,
    private store: Store,
    private route: ActivatedRoute,
    private iconService: NzIconService
  ) {
    this.iconService.addIconLiteral('ng-zorro:operation', SVG.OPERATION)
    this.iconService.addIconLiteral('ng-zorro:sort', SVG.SORT)
  }

  ngOnInit(): void {
    this.dispatchOnInit()
  }

  dispatchOnInit(): void {
    this.store.dispatch(SetCurrentTab({ payload: this.operationType }))
    this.store.dispatch(SetOperationsType({ payload: this.operationType }))
    this.store.dispatch(SetOperationsPeriod({ payload: { startDate: this.startDate, finishDate: this.finishDate } }))
    this.store.dispatch(GetUserCategories({ payload: { type: this.operationType } }))
    this.store.dispatch(GetWallets())
    this.store.dispatch(GetOperations())
  }

  onDateChange(): void {
    this.startDate = dayjs(this.datePicker.value).startOf('month')
    this.finishDate = dayjs(this.datePicker.value).endOf('month')
    this.store.dispatch(SetOperationsPeriod({ payload: { startDate: this.startDate, finishDate: this.finishDate } }))
    this.store.dispatch(GetOperations())
  }

  addOperation(operation: Operation): void {
    this.store.dispatch(AddOperation({ payload: operation }))
  }

  editOperation(id: string, operation: Operation): void {
    this.store.dispatch(EditOperation({ payload: { id, operation } }))
  }

  deleteOperation(id: string): void {
    this.store.dispatch(DeleteOperation({ payload: { id } }))
  }

  printAddOperationModal(): void {
      const modal = this.modal.create({
        nzTitle: `Add ${this.operationType}`,
        nzWidth: MODAL_WIDTH,
        nzContent: OperationFormComponent,
        nzComponentParams: {
          operationType: this.operationType
        },
      });

      modal.afterClose.pipe(untilDestroyed(this)).subscribe(res =>  {
          if(res) {
            this.addOperation(res)
          }
      })
  }

  printEditOperationModal(operation: Operation): void {
      const modal = this.modal.create({
        nzTitle: `Add ${this.operationType}`,
        nzWidth: MODAL_WIDTH,
        nzContent: OperationFormComponent,
        nzComponentParams: {
          operationType: this.operationType,
          operation
        },
      });

      modal.afterClose.pipe(untilDestroyed(this)).subscribe(res =>  {
        if(res) {
          this.editOperation(operation.id, res)
        }
      })
  }

  printImageModal(contentTemplate: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: 'Check',
      nzContent: contentTemplate,
    })
  }

  onAddWalletBtnClick(): void {
    console.log('ADD WALLET')
  }

  onSortBtnClick(): void {
    this.operations$ = this.operations$.pipe(
      map(items => items.slice().reverse())
    )
  }

  ngOnDestroy() {
    this.store.dispatch(ResetOperationsState())
  }
}
