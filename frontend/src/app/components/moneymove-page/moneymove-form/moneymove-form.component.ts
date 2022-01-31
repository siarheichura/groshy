import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { markFormControlsDirty } from './../../../shared/helpers/form.helper';

@Component({
  selector: 'app-moneymove-form',
  templateUrl: './moneymove-form.component.html',
  styleUrls: ['./moneymove-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveFormComponent implements OnInit {
  moneymoveForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moneymoveForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  submitForm(): void {
    if (this.moneymoveForm.valid) {
    } else {
      markFormControlsDirty(this.moneymoveForm.controls);
    }
  }
}
