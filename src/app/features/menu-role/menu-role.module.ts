import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MenurolePage } from './page/menu-role.page';

const routes: Routes = [
  {
    path: '',
    component: MenurolePage,
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
  ],
  declarations: [MenurolePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuRoleModule {}
