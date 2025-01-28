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
      },
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full',
      //   data: {
      //     breadcrumb: 'Inicio',
      //     title: 'Inicio',
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
