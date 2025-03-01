import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MenuRolePage } from './page/menu-role.page';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { SharedModule } from '@shared/shared.module';
import { MenuRoleRoutingModule } from './menu-role-rouing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuRolePage],
  imports: [
    ReactiveFormsModule,
    MenuRoleRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    CommonModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuRoleModule {}
