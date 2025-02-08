import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequirementListComponent } from './components/requirement-list/requirement-list.component';
import { RequirementCreateComponent } from './components/requirement-create/requirement-create.component';
import { RequirementDetailComponent } from './components/requirement-detail/requirement-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RequirementListComponent,
  },
  {
    path: 'create',
    component: RequirementCreateComponent
  },
  {
    path: 'detail/:id',
    component: RequirementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequirementRoutingModule { }
