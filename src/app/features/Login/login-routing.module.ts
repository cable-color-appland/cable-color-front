import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { LoginPage } from './page/login.page';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  { path: 'errorpage', component: NotFoundComponent },
  { path: '**', redirectTo: '/errorpage' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
