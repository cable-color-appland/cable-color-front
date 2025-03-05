import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { ParameterRoutingModule } from './parameter-routing.module';
import { ParameterComponent } from './parameter/parameter.component';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { ButtonEditComponent } from './parameter/components/button-edit/button-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ParameterRoutingModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
  declarations: [
    ParameterComponent,
    GenericTableComponent,
    ButtonEditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParameterModule {}
