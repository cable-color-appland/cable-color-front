import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ListTypeRequestComponent } from './components/list-type-request/list-type-request.component';
import { CreateTypeRequestComponent } from './components/create-type-request/create-type-request.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { FormTypeRequestComponent } from './components/form-type-request/form-type-request.component';
import { ModifyTypeRequestComponent } from './components/modify-type-request/modify-type-request.component';
import { TypeRequestRoutingModule } from './type-request-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypeRequestRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
  declarations: [ListTypeRequestComponent,CreateTypeRequestComponent,FormTypeRequestComponent,ModifyTypeRequestComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypeRequestModule { }
