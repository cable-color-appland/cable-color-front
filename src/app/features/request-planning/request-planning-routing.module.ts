import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListRequestPlanningComponent } from "./components/list-request-planning/list-request-planning.component";


const routes: Routes = [
  {
    path: '',
    component: ListRequestPlanningComponent,
  },{
    path: 'create',
    component: ListRequestPlanningComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPlaningRoutingModule { }