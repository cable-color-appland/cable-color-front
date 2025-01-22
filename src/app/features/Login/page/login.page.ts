import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginConfig } from './loging.config';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from '@shared/utils/utils.service';

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
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
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

  private async login() {
    try {
      this.utilsService.show();
      const { username, password } = this.loginForm.value;
      const dataLogin = {
        username: username,
        password: password,
      };

      const response: any = await this.apiService.post(
        this.config.i18n.endpoint,
        dataLogin
      );
      this.updateData(response);
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
    } finally {
      this.utilsService.hide();
    }
  }

  public updateData(response: any) {
    const token = response.token;
    if (token) {
      this.authService.saveToken(token);
      this.router.navigate(['/home']);
    }
  }
}
