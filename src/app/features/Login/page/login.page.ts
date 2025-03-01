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
  forgotForm: FormGroup;
  public config = loginConfig;
  public isLogin = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.forgotForm = this.fb.group({
      username: ['', [Validators.required]],
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

  showForgot() {
    this.isLogin = !this.isLogin;
  }

  onForgot() {
    const { username } = this.forgotForm.value;
    this.authService.forgotPassword(username);
    this.showForgot();
  }
}
