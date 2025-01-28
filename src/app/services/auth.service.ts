import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilsService } from '@shared/utils/utils.service';

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
      const response: any = await this.apiService.post('User/Login', dataLogin);
      if (response.token) {
        this.sessionService.saveToken(response.token);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
    }
  }
}
