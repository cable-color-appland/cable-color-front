import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loginConfig } from './loging.config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  public config = loginConfig;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  private login() {
    const { username, password } = this.loginForm.value;
    const dataLogin = {
      username: username,
      password: password,
    };
    this.authService.login(dataLogin);
  }
}
