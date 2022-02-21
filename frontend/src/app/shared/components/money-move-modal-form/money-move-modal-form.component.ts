import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';

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
  templateUrl: './money-move-modal-form.component.html',
  styleUrls: ['./money-move-modal-form.component.scss'],
})
export class MoneyMoveModalFormComponent implements OnInit {
  @Input() moneyMoveItem: Expense | Income;

  moneyMoveForm: FormGroup;
  formControls = FormEnum;

  get formValue(): FormValue {
    return this.moneyMoveForm.value as FormValue;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.moneyMoveForm = this.fb.group({
      [this.formControls.Amount]: [
        this.moneyMoveItem.amount,
        [Validators.required],
      ],
      [this.formControls.Category]: [
        this.moneyMoveItem.category,
        [Validators.required],
      ],
      [this.formControls.Comment]: [this.moneyMoveItem.comment],
      [this.formControls.Date]: [
        new Date(this.moneyMoveItem.date),
        Validators.required,
      ],
    });
  }
}
