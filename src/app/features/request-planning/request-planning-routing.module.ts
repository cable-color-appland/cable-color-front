import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListRequestPlanningComponent } from "./components/list-request-planning/list-request-planning.component";
import { CreateRequestPlanningComponent } from "./components/create-request-planning/create-request-planning.component";
import { DetailRequestPlanningComponent } from "./components/detail-request-planning/detail-request-planning.component";


const routes: Routes = [
  {
    path: '',
    component: ListRequestPlanningComponent,
  },{
    path: 'create',
    component: CreateRequestPlanningComponent,
  },{
    path: 'detail/:id',
    component: DetailRequestPlanningComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPlaningRoutingModule { }