import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/role.service';
import { MenuRoleConfig } from './menu-role.config';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-menu-role',
  templateUrl: './menu-role.page.html',
  styleUrls: ['./menu-role.page.scss'],
})
export class MenuRolePage implements OnInit {
  public config = MenuRoleConfig;
  public roles: any = [];
  public selected = '';
  public modules: any = [];
  public modulesRole: any = [];
  public listModule: any = [];
  public isSuperAdmin: boolean = false;
  selectedCountry: string = '';

  constructor(
    private readonly roleService: RoleService,
    private readonly sessionService: SessionService
  ) {
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
    this.selectedCountry = this.sessionService.getUserField('CountryId');
  }
  ngOnInit(): void {
    this.getAllModules();
    this.getAllRoles(this.sessionService.getUserField('CountryId'));
  }

  private async getAllRoles(countryId: string) {
    this.selected = '';
    this.roles = await this.roleService.getRolesByCountryId(countryId);
  }

  private async getAllModules() {
    this.modules = await this.roleService.GetModules();
  }

  public onRoleSelected() {
    this.getAllModulesById(this.selected);
  }

  private modulesToLoad() {
    this.listModule = [];
    this.modules.forEach((module: any) => {
      const foundItem = this.modulesRole.filter(
        (x: any) => x.moduleId.toString() == module.id
      );
      const selected = Object.keys(foundItem).length !== 0;
      this.listModule.push({ ...module, selected });
    });
  }

  private async getAllModulesById(id: string) {
    this.modulesRole = await this.roleService.GetMenuByRole(id);
    this.modulesToLoad();
  }

  public onCheckboxChange(event: MatCheckboxChange, roleId: string) {
    const updatedDataSource = this.listModule.map((item: any) => {
      if (item.id === roleId) {
        item.selected = event.checked;
      }
      return item;
    });
    this.listModule = updatedDataSource;
  }
  public onUpdateAccess() {
    const modulesAccess: any = [];
    this.listModule.forEach((element: any) => {
      if (element.selected)
        modulesAccess.push({
          moduleId: element.id,
          roleId: this.selected,
          roleName: '',
          moduleName: '',
        });
    });
    this.roleService.UpdateMenuByRole(this.selected, modulesAccess);
  }
  onCountrySelected(country: any): void {
    console.log("🚀 ~ MenuRolePage ~ onCountrySelected ~ country:", country)
    this.listModule = [];
    this.getAllRoles(country.value);
  }
}
