import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserRoutingModule } from './user-routing.module';
import { share } from 'rxjs';
import { SharedModule } from '@shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [UserCreateComponent, UserListComponent],
  imports: [
    ReactiveFormsModule,
    UserRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
  ],
      providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
      ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
