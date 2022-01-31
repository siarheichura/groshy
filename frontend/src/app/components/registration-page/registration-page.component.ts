import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { markFormControlsDirty } from './../../shared/helpers/form.helper';

enum FormEnum {
  Username = 'username',
  Email = 'email',
  Password = 'password',
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  formControls = FormEnum;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      [this.formControls.Username]: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      [this.formControls.Email]: ['', [Validators.required, Validators.email]],
      [this.formControls.Password]: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      markFormControlsDirty(this.registrationForm.controls);
    }
  }
}
