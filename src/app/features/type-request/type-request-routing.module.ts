import { Routes, RouterModule } from '@angular/router';
import { ListTypeRequestComponent } from './components/list-type-request/list-type-request.component';
import { CreateTypeRequestComponent } from './components/create-type-request/create-type-request.component';
import { ModifyTypeRequestComponent } from './components/modify-type-request/modify-type-request.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: ListTypeRequestComponent,
  },
  {
    path: 'create',
    component: CreateTypeRequestComponent
  },
  {
    path: 'modify/:id',
    component: ModifyTypeRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TypeRequestRoutingModule { };
