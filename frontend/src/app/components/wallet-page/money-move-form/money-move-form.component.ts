import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  MoneyMoveItem,
  MoneyMoveCategory,
} from '../../../shared/interfaces/DayMoneyMove';

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
})
export class MoneyMoveFormComponent implements OnInit {
  @Input() moneyMoveItem: MoneyMoveItem;
  @Input() categories$: Observable<MoneyMoveCategory[]>;

  moneyMoveForm: FormGroup;
  formControls = FormEnum;

  get formValue(): FormValue {
    return this.moneyMoveForm.value as FormValue;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
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
}
