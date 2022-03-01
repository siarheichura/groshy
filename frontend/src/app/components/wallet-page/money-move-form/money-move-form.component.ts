import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MoneyMoveCategory } from './../../../shared/interfaces/DayMoneyMove';
import { markFormControlsDirty } from '../../../shared/helpers/form.helper';

interface FormValue {
  amount: number;
  category: string;
  comment: string;
}

enum FormEnum {
  Amount = 'amount',
  Category = 'category',
  Comment = 'comment',
}

@Component({
  selector: 'app-money-move-form',
  templateUrl: './money-move-form.component.html',
  styleUrls: ['./money-move-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveFormComponent implements OnInit {
  @Input() categories: MoneyMoveCategory[];
  @Output() onSubmit = new EventEmitter();

  moneymoveForm: FormGroup;
  formControls = FormEnum;

  get formValue(): FormValue {
    return this.moneymoveForm.value as FormValue;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moneymoveForm = this.fb.group({
      [FormEnum.Amount]: ['', [Validators.required]],
      [FormEnum.Category]: ['', [Validators.required]],
      [FormEnum.Comment]: [''],
    });
  }

  submitForm(): void {
    if (this.moneymoveForm.valid) {
      this.onSubmit.emit(this.formValue);
      this.moneymoveForm.reset();
    } else {
      markFormControlsDirty(this.moneymoveForm);
    }
  }
}
