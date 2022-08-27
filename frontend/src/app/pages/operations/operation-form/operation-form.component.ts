import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { NzModalRef } from 'ng-zorro-antd/modal'

import { walletsSelector } from '@store/wallets/wallets.selectros'
import { markFormControlsDirty } from '@shared/helpers/form.helper'
import { Operation } from '@shared/interfaces/Operation.interface'
import { Category } from '@shared/interfaces/Category.interface'
import { categoriesSelector } from '@store/categories/categories.selectors'
import { Wallet } from '@shared/interfaces/Wallet.interface'

enum FormControlsEnum {
  Wallet = 'wallet',
  Amount = 'amount',
  Category = 'category',
  Comment = 'comment',
  Date = 'date'
}

interface WalletForTags {
  id: string,
  name: string,
  currency: string,
  checked: boolean
}

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss'],
})
export class OperationFormComponent implements OnInit {
  @Input() operationType: string
  @Input() operation: Operation

  wallets$: Observable<WalletForTags[]> = this.getWalletsForTags(this.store.select(walletsSelector))
  categories$: Observable<Category[]> = this.store.select(categoriesSelector)

  FORM_CONTROLS = FormControlsEnum
  operationForm: FormGroup

  imageUrl: string | ArrayBuffer = ''

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalRef,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.operationForm = this.initOperationFormGroup()
    this.updateModalConfig()
  }

  initOperationFormGroup(): FormGroup {
    this.imageUrl = this.operation ? this.operation.checkImg : ''
    return this.fb.group({
      [this.FORM_CONTROLS.Wallet]: [this.operation ? {
        wallet: '62e8cf6f81564307e767adda',
        currency: this.operation.currency,
        name: this.operation.walletName,
      } : '', Validators.required],
      [this.FORM_CONTROLS.Amount]: [this.operation ? this.operation.amount : '', [Validators.required, Validators.min(0)]],
      [this.FORM_CONTROLS.Category]: [this.operation ? this.operation.category : '', Validators.required],
      [this.FORM_CONTROLS.Comment]: [this.operation ? this.operation.comment : ''],
      [this.FORM_CONTROLS.Date]: [this.operation ? this.operation.date : new Date(), Validators.required],
    })
  }

  updateModalConfig(): void {
    this.modal.updateConfig({
      nzOnOk: () => {
        if (this.operationForm.valid) {
          return {
            ...this.operationForm.value,
            wallet: this.operationForm.value.wallet.wallet,
            currency: this.operationForm.value.wallet.currency,
            walletName: this.operationForm.value.wallet.name,
            type: this.operationType,
            checkImg: this.imageUrl,
          }
        } else {
          markFormControlsDirty(this.operationForm)
          return false
        }
      },
    })
  }

  getWalletsForTags(wallets: Observable<Wallet[]>): Observable<WalletForTags[]> {
    const walletsForTags = wallets.pipe(
      map(wallets => wallets.map(wallet => ({
        id: wallet.id,
        name: wallet.name,
        currency: wallet.currency,
        checked: this.operation && this.operation.walletName === wallet.name,
      }))),
    )
    return walletsForTags
  }

  onCheckWalletTagChange(event: boolean, wallet: WalletForTags): void {
    this.wallets$ = this.wallets$.pipe(
      map(wallets => wallets.map(w => ({ ...w, checked: w.id === wallet.id ? event : false }))),
    )
    this.operationForm.patchValue({ wallet: { wallet: wallet.id, currency: wallet.currency, name: wallet.name } })
  }

  onImageUpload(event: any): void {
    const file = event.target.files.item(0)
    const reader = new FileReader()
    reader.onload = event => {
      this.imageUrl = event.target.result
      this.cdr.detectChanges()
    }
    reader.readAsDataURL(file)
  }

  resetImage(): void {
    this.imageUrl = ''
    this.cdr.detectChanges()
  }
}
