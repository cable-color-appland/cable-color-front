import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';


@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccessDeniedModule { }
