import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { RoleService } from 'src/app/services/role.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/assets/Messages/Messages';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit, AfterViewInit {
  roles: any = [];
  displayedColumns: string[] = ['name', 'actions'];
  showAddRoleInput = false;
  showButtonCreateRole = true;
  newRoleName = '';
  showInput: boolean = false;
  isEditing : boolean = false; 
  RolesForm!: FormGroup;
  dataSource = new MatTableDataSource(this.roles);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly roleService: RoleService,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.LoadFom();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllRoles() {
    this.roleService.GetRoles().then((response) => {
      this.roles = response;
      this.dataSource.data = this.roles;
    }).catch((error) => {
      console.error('Error getting roles:', error);
    });
  }

  toggleAddRole() {
    this.showAddRoleInput = !this.showAddRoleInput;
    this.showButtonCreateRole = !this.showButtonCreateRole;
    this.isEditing = false;
  }
  toggleCancelRole() {
    this.RolesForm.reset();
    this.showAddRoleInput = !this.showAddRoleInput;
    this.showButtonCreateRole = !this.showButtonCreateRole;
  }

  onSubmit() {
    if (this.RolesForm.valid) {
      this.addOrEditRole();
    } else {
      this.RolesForm.markAllAsTouched();
    }
  }

  addOrEditRole() {
    const { RoleName, RoleId } = this.RolesForm.value;
    if(this.isEditing){
      this.roleService.EditRole(RoleId, RoleName).then((response: any) => {
        const roleIndex = this.roles.findIndex((role: any) => role.id === RoleId);
        if (roleIndex !== -1) {
          this.roles[roleIndex] = {
            ...this.roles[roleIndex],
            name: RoleName,
            normalizedName: RoleName.toUpperCase(),
          };
        }
        this.dataSource.data = this.roles;
        this.utilsService.showToast(Messages.ROLE_EDITED, 'success');
        this.RolesForm.reset();
        this.showAddRoleInput = !this.showAddRoleInput;
        this.showButtonCreateRole = !this.showButtonCreateRole;
        this.isEditing = !this.isEditing;
      }).catch((error) => {
        this.utilsService.showToast('Error al intentar guardar el rol' + error, 'error');
        console.error(error);
      });
    }else{
    this.roleService.AddRole(RoleName).then((response: any) => {
      this.roles.push({ id: response.value.id, name: RoleName, normalizedName: RoleName.toUpperCase(), concurrencyStamp: response.value.concurrencyStamp });
      this.roles = [...this.roles];
      this.dataSource.data = this.roles;
      this.utilsService.showToast(Messages.ROLE_CREATED, 'success');
    }).catch((error) => {
      this.utilsService.showToast('Error al intentar guardar el rol' + error, 'error');
      console.error(error);
    });
  }
  }

  editRole(role: any) {
    this.RolesForm.patchValue({
      RoleId: role.id,
      RoleName: role.name,
    });
    this.showAddRoleInput = true;
    this.showButtonCreateRole = false;
    this.isEditing = true;
  }

  LoadFom() {
    {
      this.RolesForm = new FormGroup({
        RoleId: new FormControl(''),
        RoleName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    }
  }
}
