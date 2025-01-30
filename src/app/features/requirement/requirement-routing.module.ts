import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequirementListComponent } from './components/requirement-list/requirement-list.component';
import { RequirementCreateComponent } from './components/requirement-create/requirement-create.component';

const routes: Routes = [
  {
    path: '',
    component: RequirementListComponent,
  },
  {
    path: 'create',
    component: RequirementCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequirementRoutingModule { }
