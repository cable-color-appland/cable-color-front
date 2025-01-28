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

@Component({
  selector: 'app-menu-role',
  templateUrl: './menu-role.page.html',
  styleUrls: ['./menu-role.page.scss'],
})
export class MenurolePage implements OnInit {
  public config = MenuRoleConfig;
  public roles: any = [];
  public selected = '';

  testData = [
    { id: 'oiqweuroiuweo', name: 'test show' },
    { id: 'adfasdfoiqweuroiuweo', name: 'test show 2' },
  ];

  constructor(
    private readonly roleService: RoleService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllRoles();
    console.log('Roles en OnInit:', this.roles);
    this.getAllModules();
  }

  private async getAllRoles() {
    this.roles = await this.roleService.GetRoles(true);
    this.cdr.detectChanges();
  }

  private async getAllModules() {}

  public onRoleSelected() {}

  public onUpdateAccess() {}
}
