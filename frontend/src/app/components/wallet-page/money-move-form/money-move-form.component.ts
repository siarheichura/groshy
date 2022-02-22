import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { markFormControlsDirty } from '../../../shared/helpers/form.helper';

@Component({
  selector: 'app-money-move-form',
  templateUrl: './money-move-form.component.html',
  styleUrls: ['./money-move-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveFormComponent implements OnInit {
  @Input() categories: string[];

  @Output() onSubmit = new EventEmitter();

  moneymoveForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.moneymoveForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  submitForm(): void {
    if (this.moneymoveForm.valid) {
      this.onSubmit.emit(this.moneymoveForm.value);
      this.moneymoveForm.reset();
    } else {
      markFormControlsDirty(this.moneymoveForm);
    }
  }
}
