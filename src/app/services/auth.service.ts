import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EndpointsServices } from '../const/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly utilsService: UtilsService
  ) {}

  public async login(dataLogin: any) {
    try {
      const response: any = await this.apiService.post(
        EndpointsServices.login,
        dataLogin
      );
      if (response.token) {
        this.sessionService.saveToken(response.token);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
    }
  }

  public async forgotPassword(username: string) {
    try {
      await this.apiService.get(EndpointsServices.FORGOT_PASS + username);
      this.utilsService.showToast(
        'Se ha enviado un correo con instrucciones',
        'info'
      );
    } catch (error) {
      this.utilsService.showToast('Error al recuperar contraseña', 'error');
    }
  }

  public async resetPassword(requestData: any) {
    try {
      const response = await this.apiService.post(
        EndpointsServices.RESET_PASS,
        requestData
      );
      this.utilsService.showToast(
        'Su contraseña se ha actualizado correctamente, por favor iniciar session.',
        'info'
      );
      return response;
    } catch (error) {
      this.utilsService.showToast(
        'Error al actualizar su contraseña por favor intentelo de nuevo',
        'error'
      );
      return null;
    }
  }
}
