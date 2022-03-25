import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import dayjs from 'dayjs';

import { MoneyMoveCategory } from './../../../shared/interfaces/MoneyMoveCategory.interface';
import { MoneyMoveItem } from './../../../shared/interfaces/MoneyMoveItem.interface';
import {
  categoriesSelector,
  walletCreationDateSelector,
} from 'src/app/store/wallets/wallets.selectros';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

interface FormValue {
  amount: number;
  category: string;
  comment: string;
  date: Date;
}

enum FormEnum {
  Amount = 'amount',
  Category = 'category',
  Comment = 'comment',
  Date = 'date',
}

@Component({
  selector: 'app-money-move-modal-form',
  templateUrl: './money-move-form.component.html',
  styleUrls: ['./money-move-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveFormComponent implements OnInit {
  @Input() moneyMoveType: string = '';
  @Input() moneyMoveItem: MoneyMoveItem;

  disabledDates = (date: Date): boolean => dayjs(date).isAfter(dayjs(), 'day');

  moneyMoveForm: FormGroup;
  formControls = FormEnum;

  categories$: Observable<MoneyMoveCategory[]> = this.store.select(
    categoriesSelector({ type: this.moneyMoveType })
  );

  get formValue(): FormValue {
    return this.moneyMoveForm.value as FormValue;
  }

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(walletCreationDateSelector).subscribe((resp) => {
      this.disabledDates = (date: Date): boolean =>
        dayjs(date).isAfter(dayjs(), 'day') ||
        dayjs(date).isBefore(dayjs(resp), 'day');
    });

    this.categories$ = this.store.select(
      categoriesSelector({ type: this.moneyMoveType })
    );

    this.moneyMoveForm = this.fb.group({
      [this.formControls.Amount]: [
        this.moneyMoveItem ? this.moneyMoveItem.amount : '',
        [Validators.required, Validators.min(0)],
      ],
      [this.formControls.Category]: [
        this.moneyMoveItem ? this.moneyMoveItem.category : '',
        [Validators.required],
      ],
      [this.formControls.Comment]: [
        this.moneyMoveItem ? this.moneyMoveItem.comment : '',
      ],
      [this.formControls.Date]: [
        this.moneyMoveItem ? new Date(this.moneyMoveItem.date) : new Date(),
        Validators.required,
      ],
    });
  }

  onSubmitButtonClick() {
    if (this.moneyMoveForm.valid) {
      this.modal.close(this.formValue);
    } else {
      markFormControlsDirty(this.moneyMoveForm);
    }
  }

  onCancelButtonClick() {
    this.modal.close();
  }
}
