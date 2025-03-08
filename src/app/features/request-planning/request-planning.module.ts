import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RequestPlaningRoutingModule } from './request-planning-routing.module';
import { CreateRequestPlanningComponent } from './components/create-request-planning/create-request-planning.component';
import { ListRequestPlanningComponent } from './components/list-request-planning/list-request-planning.component';

@NgModule({
  imports: [
    CommonModule,
    RequestPlaningRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CreateRequestPlanningComponent,ListRequestPlanningComponent],
      providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
      ],
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestPlanningModule { }
