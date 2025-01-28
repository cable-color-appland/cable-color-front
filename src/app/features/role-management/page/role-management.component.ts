import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  roles: any = [];
  displayedColumns: string[] = ['name', 'actions'];
  showAddRoleInput = false;
  newRoleName = '';
  showInput: boolean = false;
  RolesForm!: FormGroup;

  constructor(
    private readonly apiService: ApiService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.LoadFom();
  }

  getAllRoles() {
    this.apiService.get('Role', true).then((response) => {
      this.roles = response;
      console.log(
        '🚀 ~ RoleManagementComponent ~ this.apiService.get ~ roles:',
        this.roles
      );
    });
  }

  toggleAddRole() {
    this.showAddRoleInput = !this.showAddRoleInput;
  }

  onSubmit() {
    if (this.RolesForm.valid) {
      this.addRole();
    } else {
      this.RolesForm.markAllAsTouched();
    }
  }

  addRole() {
    const { RoleName } = this.RolesForm.value;
    // this.apiService
    //   .patchQueryString('Role', { roleName: RoleName })
    //   .then((response) => {
    //     this.roles.push({ name: RoleName });
    //     this.roles = [...this.roles];
    //     console.log(
    //       '🚀 ~ RoleManagementComponent ~ this.apiService.patchQueryString ~ roles:',
    //       this.roles
    //     );
    //     this.RolesForm.reset();
    //     console.log(
    //       '🚀 ~ RoleManagementComponent ~ this.apiService.post ~ response:',
    //       response
    //     );
    //   })
    //   .catch((error) => {
    //     console.error('Error adding role:', error);
    //   });
    // this.roles.push(response);
    this.showAddRoleInput = false;

    this.roleService.GetRoles();
  }

  editRole(role: any) {
    const newName = prompt('Editar nombre del rol:', role.name);
    if (newName !== null && newName.trim()) {
      role.name = newName.trim();
    }
  }

  LoadFom() {
    {
      this.RolesForm = new FormGroup({
        RoleName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      });
    }
  }
}
