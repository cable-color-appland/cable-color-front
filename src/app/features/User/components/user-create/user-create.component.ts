import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EndpointsServices } from 'src/app/const/endpoints';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/assets/Messages/Messages';
import { UserCreateConfig } from './user-create.config';
import { SessionService } from 'src/app/services/session.service';
import { RoleService } from 'src/app/services/role.service';
import { MatSelectChange } from '@angular/material/select';
import { DniValidatorService } from 'src/app/services/dni.service';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  public config = UserCreateConfig;
  countries: any;
  roles: any;
  userForm!: FormGroup;
  isSuperAdmin: boolean;
  selectedCountry: string = '';
  isTechnicalContractor: boolean;
  dniValidator: DniValidatorService;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiServie: ApiService,
    private readonly roleService: RoleService,
    private readonly utilsService: UtilsService,
    private readonly sessionService: SessionService,
    private _dniValidator: DniValidatorService
  ) {
    this.dniValidator = _dniValidator;
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
    this.isTechnicalContractor = this.sessionService.isTechnicalContractor();
    this.selectedCountry = this.sessionService.getUserField('CountryId');
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(13)]],
      dni: ['',     { 
        validators: [Validators.required], 
        asyncValidators: [this.dniValidator.checkDniExists()], 
        updateOn: 'change'
      }],
      roleId: ['', Validators.required],
      countryId: ['', Validators.required]
    });

    this.loadRoles(this.sessionService.getUserField('CountryId'));
    this.setDefaultCountry();
  }

  submitForm() {
    if (this.userForm.valid) {
      const user = {
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        roleId: this.userForm.value.roleId,
        countryId: this.userForm.value.countryId,
        Dni: this.userForm.value.dni,
      };

      this.apiServie
        .post(EndpointsServices.USERS, user)
        .then((response) => {
          this.utilsService.showToast(Messages.USER_CREATED, 'success');
          this.router.navigate(['/home/User']);
        })
        .catch((error) => {
          this.utilsService.showToast(Messages.ERROR_GENERIC, 'error');
        });
    } else {
      this.utilsService.showToast(this.config.i18n.requiredField, 'error');
    }
  }

  async loadRoles(countryId: string) {
    if (!this.isTechnicalContractor) {
      await this.roleService
        .getRolesByCountryId(countryId)
        .then((response) => {
          this.roles = response;
        })
        .catch((error) => {
          console.error('Error getting roles:', error);
        });
    } else {
      this.setDefaultRoleId();
    }
  }

  private setDefaultCountry(): void {
    if (!this.isSuperAdmin) {
      this.userForm.patchValue({ countryId: this.selectedCountry }); // Reemplaza con el valor adecuado
    }
  }
  private setDefaultRoleId(): void {
    if (this.isTechnicalContractor) {
      this.userForm.patchValue({
        roleId: this.sessionService.getUserField('RoleId'),
      });
    }
  }

  onCountrySelected(country: any): void {
    this.loadRoles(country.value);
  }
}
