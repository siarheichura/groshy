import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

enum FormEnum {
  Username = 'username',
  Password = 'password',
}

@Component({
  selector: 'app-aloginuth-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
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
