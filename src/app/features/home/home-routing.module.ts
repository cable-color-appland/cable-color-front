import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './page/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'Role',
        loadChildren: () =>
          import('../role-management/role-management.module').then(
            (m) => m.RoleManagementModule
          ),
        data: {
          breadcrumb: 'Roles',
          title: 'Roles',
        },
      },
      {
        path: 'MenuRoles',
        loadChildren: () =>
          import('../menu-role/menu-role.module').then((m) => m.MenuRoleModule),
        data: {
          breadcrumb: 'MenuRoles',
          title: 'Menu por Rol',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
