import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EndpointsServices } from '../const/endpoints';
import { Messages } from 'src/assets/Messages/Messages';

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
      this.utilsService.showToast(Messages.FORGOT_PASSWORD, 'info');
    } catch (error) {
      this.utilsService.showToast(Messages.ERROR_FORGOT_PASSWORD, 'error');
    }
  }

  public async resetPassword(requestData: any) {
    try {
      const response = await this.apiService.post(
        EndpointsServices.RESET_PASS,
        requestData
      );
      this.utilsService.showToast(Messages.PASSWORD_UPDATED, 'info');
      return response;
    } catch (error) {
      this.utilsService.showToast(Messages.ERROR_PASSWORD_UPDATED, 'error');
      return null;
    }
  }
}
