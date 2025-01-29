import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { HomePage } from './page/home.page';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [HomePage],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
