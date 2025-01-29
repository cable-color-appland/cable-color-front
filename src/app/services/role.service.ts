import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointsServices } from '../const/endpoints';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(
    private readonly apiService: ApiService,
    private readonly utilsService: UtilsService
  ) {}

  public async GetRoles(useCache: boolean = false) {
    try {
      return await this.apiService.get(EndpointsServices.Roles);
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }

  public async AddRole(role: any) {
    try {
      return await this.apiService.post(`${EndpointsServices.Roles}?roleName=${role}`, role);
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }

  public async EditRole(roleId: number, roleName: string) {
    try {
      return await this.apiService.put(`${EndpointsServices.Roles}?roleId=${roleId}&roleName=${roleName}`,null);
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }

  public async GetModules() {
    try {
      const roles = await this.apiService.get(
        EndpointsServices.GetModules,
        true
      );
      return roles;
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }

  public async GetMenuByRole(roleId: string) {
    try {
      const roles = await this.apiService.get(
        `${EndpointsServices.GetModulesByRole}/${roleId}`,
        false
      );
      return roles;
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }
  public async UpdateMenuByRole(roleId: string, menu: any[]) {
    try {
      const roles = await this.apiService.post(
        `${EndpointsServices.postModuleRole}/${roleId}`,
        menu
      );
      this.utilsService.showToast('Menu actualizado para el role', 'success');
      return roles;
    } catch (error) {
      this.utilsService.showToast('Error al ingresar' + error, 'error');
      console.log(error);
      return null;
    }
  }
}
