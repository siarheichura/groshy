import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moneymove-form',
  templateUrl: './moneymove-form.component.html',
  styleUrls: ['./moneymove-form.component.scss'],
})
export class MoneymoveFormComponent implements OnInit {
  moneymoveForm!: FormGroup;

  submitForm(): void {
    if (this.moneymoveForm.valid) {
      console.log('submit', this.moneymoveForm.value);
    } else {
      Object.values(this.moneymoveForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  genderChange(value: string): void {
    console.log('changed');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moneymoveForm = this.fb.group({
      amount: [null, [Validators.required]],
      category: [null, [Validators.required]],
      comment: [null],
    });
  }
}
