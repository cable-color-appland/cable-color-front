import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPage } from './page/login.page';
import { MaterialModule } from 'src/app/material.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [LoginPage, ResetPasswordComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPageModule {}
