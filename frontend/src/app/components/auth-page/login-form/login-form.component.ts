import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';

enum FormEnum {
  Username = 'username',
  Password = 'password',
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  formControls = FormEnum;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [this.formControls.Username]: ['', [Validators.required]],
      [this.formControls.Password]: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response) => {
        console.log(response);
      });
    } else {
      markFormControlsDirty(this.loginForm.controls);
    }
  }
}
