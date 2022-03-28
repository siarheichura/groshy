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
import { NzUploadFile } from 'ng-zorro-antd/upload';

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

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

  categories$: Observable<MoneyMoveCategory[]>;

  uploadImages: NzUploadFile[] = [];
  previewImage: string = '';
  previewVisible = false;

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

    this.uploadImages =
      this.moneyMoveItem && this.moneyMoveItem.checkBase64
        ? [
            {
              uid: '123',
              name: 'check.png',
              url: this.moneyMoveItem.checkBase64,
            },
          ]
        : [];
  }

  onCancelButtonClick() {
    this.modal.close();
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  onSubmitButtonClick() {
    if (this.moneyMoveForm.valid) {
      this.modal.close({
        ...this.formValue,
        checkBase64: this.uploadImages.length
          ? this.uploadImages[0].thumbUrl
          : '',
      });
    } else {
      markFormControlsDirty(this.moneyMoveForm);
    }
  }
}
