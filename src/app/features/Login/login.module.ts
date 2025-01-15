import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AbstractFormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPage } from './page/login.page';
import { MaterialModule } from 'src/app/material.module';
import { asapScheduler } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
  ],
  declarations: [LoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPageModule {}
