import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ParameterComponent } from './parameter/parameter.component';

const routes: Routes = [
  {
    path: '',
    component: ParameterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterRoutingModule {}
