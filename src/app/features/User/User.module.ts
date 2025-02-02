import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './page/User.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, UserCreateComponent],
  imports: [
    ReactiveFormsModule,
    UserRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
      providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
      ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
