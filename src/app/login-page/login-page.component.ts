import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        console.log(control);
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
}
