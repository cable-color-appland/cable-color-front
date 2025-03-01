import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuRolePage } from './page/menu-role.page';

const routes: Routes = [
  {
    path: '',
    component: MenuRolePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoleRoutingModule {}
