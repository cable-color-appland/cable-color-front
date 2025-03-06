import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '@shared/models/role';
import { ApiService } from 'src/app/services/api.service';
import { RoleService } from 'src/app/services/role.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/assets/Messages/Messages';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit, AfterViewInit {
  roles: Role[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  showAddRoleInput = false;
  showButtonCreateRole = true;
  newRoleName = '';
  showInput: boolean = false;
  isEditing : boolean = false; 
  RolesForm!: FormGroup;
  dataSource = new MatTableDataSource<Role>([]);
  selectedCountry: string = '';
  displayCountryManagement = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly roleService: RoleService,
    private readonly utilsService: UtilsService,
    private readonly sessionService: SessionService
  ) {
    this.displayCountryManagement = this.sessionService.isSuperAdmin();
    this.selectedCountry = this.sessionService.getUserField('CountryId');
  }

  ngOnInit(): void {
    this.getAllRoles(this.sessionService.getUserField('CountryId'));
    this.LoadFom();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllRoles(countryId: string = '') {
    this.roleService.getRolesByCountryId(countryId).then((response) => {
      this.roles = response ?? [];
      console.log("🚀 ~ RoleManagementComponent ~ this.roleService.getRolesByCountryId ~ this.roles:", this.roles)
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

  async addOrEditRole() {
    const { RoleName, RoleId } = this.RolesForm.value;
    const roleData = {
      id: RoleId || undefined,
      name: RoleName,
      countryId: this.selectedCountry,
      DateCreated: new Date()
    };
  
    try {
      if (this.isEditing) {
        await this.updateRole(roleData);
      } else {
        await this.createRole(roleData);
      }
      this.resetForm();
    } catch (error) {
      this.utilsService.showToast(`Error al intentar guardar o editar el rol: ${error}`, 'error');
      console.error(error);
    }
  }
  
  private async updateRole(roleData: any) {
          this.roleService
            .EditRole(roleData)
            .then((response: any) => {
              const roleIndex = this.roles.findIndex(
                (role: any) => role.id === roleData.id
              );
              if (roleIndex !== -1) {
                this.roles[roleIndex] = {
                  ...this.roles[roleIndex],
                  name: roleData.name,
                  DateCreated: roleData.DateCreated,
                  countryId: roleData.countryId,
                };
              }
              this.dataSource.data = this.roles;
              this.utilsService.showToast(Messages.ROLE_EDITED, 'success');
              this.RolesForm.reset();
              this.showAddRoleInput = !this.showAddRoleInput;
              this.showButtonCreateRole = !this.showButtonCreateRole;
              this.isEditing = !this.isEditing;
            })
            .catch((error) => {
              this.utilsService.showToast(
                'Error al intentar editar el rol' + error,
                'error'
              );
              console.error(error);
            });
  }
  
  private async createRole(roleData: any) {
    this.roleService.AddRole(roleData).then((response:any) => {
          this.roles.push({ id: response.value.id, name: roleData.RoleName, countryId: this.selectedCountry, countryName: '', DateCreated: new Date() });
          this.roles = [...this.roles];
          this.dataSource.data = this.roles;
          this.utilsService.showToast(Messages.ROLE_CREATED, 'success');
        }).catch((error) => {
          this.utilsService.showToast('Error al intentar guardar el rol' + error, 'error');
          console.error(error);
        });
  }
  
  private resetForm() {
    this.RolesForm.reset();
    this.showAddRoleInput = false;
    this.showButtonCreateRole = true;
    this.isEditing = false;
  }
  

  // addOrEditRole() {
  //   const { RoleName, RoleId } = this.RolesForm.value;
  //   if(this.isEditing){
  //     this.roleService.EditRole(RoleId, {id:RoleId,name:RoleName,countryId:this.selectedCountry, DateCreated: new Date()}).then((response: any) => {
  //       const roleIndex = this.roles.findIndex((role: any) => role.id === RoleId);
  //       if (roleIndex !== -1) {
  //         this.roles[roleIndex] = {
  //           ...this.roles[roleIndex],
  //           name: RoleName,
  //           DateCreated: new Date(),
  //         };
  //       }
  //       this.dataSource.data = this.roles;
  //       this.utilsService.showToast(Messages.ROLE_EDITED, 'success');
  //       this.RolesForm.reset();
  //       this.showAddRoleInput = !this.showAddRoleInput;
  //       this.showButtonCreateRole = !this.showButtonCreateRole;
  //       this.isEditing = !this.isEditing;
  //     }).catch((error) => {
  //       this.utilsService.showToast('Error al intentar guardar el rol' + error, 'error');
  //       console.error(error);
  //     });
  //   }else{
  //  
  // }
  // }

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

  onCountrySelected(country: any): void {
    this.selectedCountry = country.value;
    this.getAllRoles(country.value);
  }

}
