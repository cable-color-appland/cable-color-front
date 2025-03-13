import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListRequestPlanningComponent } from "./components/list-request-planning/list-request-planning.component";
import { CreateRequestPlanningComponent } from "./components/create-request-planning/create-request-planning.component";


const routes: Routes = [
  {
    path: '',
    component: ListRequestPlanningComponent,
  },{
    path: 'create',
    component: CreateRequestPlanningComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPlaningRoutingModule { }