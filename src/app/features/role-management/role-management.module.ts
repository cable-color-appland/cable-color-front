import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManagementComponent } from './page/role-management.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: RoleManagementComponent,
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
  ],
  declarations: [RoleManagementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoleManagementModule { }
