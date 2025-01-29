import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPage } from './page/login.page';
import { MaterialModule } from 'src/app/material.module';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  { path: 'errorpage', component: NotFoundComponent },
  { path: '**', redirectTo: '/errorpage' },
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
