import { Component, OnInit } from '@angular/core';
import { ResetConfig } from './reset-password.config';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  public config = ResetConfig;
  resetPassForm: FormGroup;
  userId!: string;
  code!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.resetPassForm = this.fb.group(
      {
        password: [
          '',
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.config.pattern),
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['Id'];
      this.code = params['Code'];
    });
  }

  get f() {
    return this.resetPassForm.controls;
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.reset();
  }

  private async reset() {
    const { password } = this.resetPassForm.value;

    const resetRequest = {
      username: this.userId,
      token: this.code,
      newPassword: password,
    };
    const response = await this.authService.resetPassword(resetRequest);

    if (response) {
      this.router.navigate(['/login']);
    }
  }
}
