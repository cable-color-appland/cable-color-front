import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementRoutingModule } from './requirement-routing.module';
import { RequirementListComponent } from './components/requirement-list/requirement-list.component';
import { RequirementCreateComponent } from './components/requirement-create/requirement-create.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '@shared/material/custom-paginator-intl';


@NgModule({
  declarations: [RequirementListComponent,RequirementCreateComponent],
  imports: [
    CommonModule,
    RequirementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
    providers: [
      { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequirementModule { }
