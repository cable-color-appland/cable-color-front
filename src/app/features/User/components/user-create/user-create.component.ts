import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EndpointsServices } from 'src/app/const/endpoints';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/assets/Messages/Messages';
import { UserCreateConfig } from './user-create.config';
import { environment } from '@environments/environment';
import { SessionService } from 'src/app/services/session.service';
import { Role } from '@shared/models/role';
import { iif } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  public config = UserCreateConfig;
  countries: any;
  roles: any;
  private _formBuilder = inject(FormBuilder);
  isSuperAdmin: boolean;
  selectedCountry: string = '';
  isTechnicalContractor: boolean;
  constructor(
    private router: Router,
    private apiServie: ApiService,
    private readonly utilsService: UtilsService,
    private readonly sessionService: SessionService
  ) {
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
    this.isTechnicalContractor = this.sessionService.isTechnicalContractor();
    console.log("🚀 ~ UserCreateComponent ~ this.isTechnicalContractor:", this.isTechnicalContractor)
    console.log('🚀 ~ UserCreateComponent ~ isSuperAdmin:', this.isSuperAdmin);
    this.selectedCountry = this.sessionService.getUserField('CountryId');
  }

  userForm = this._formBuilder.group({
    userName: ['', Validators.maxLength(environment.maxlengthInput)],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(environment.maxlengthInput),
      ],
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(20),
      ],
    ],
    dniNumnber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(20),
      ],
    ],
    firstName: [
      '',
      [Validators.required, Validators.maxLength(environment.maxlengthInput)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(environment.maxlengthInput)],
    ],
    rolId: ['', Validators.required],
    countryId: ['', Validators.required],
  });

  ngOnInit() {
    this.loadCountries();
    this.loadRoles();
  }

  submitForm() {
    if (this.userForm.valid) {
      const user = {
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        rolId: this.userForm.value.rolId,
        countryId: this.userForm.value.countryId,
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

  async loadCountries() {
    if (this.isSuperAdmin) {
      await this.apiServie
        .get(EndpointsServices.GET_ALL_COUNTRY)
        .then((response) => {
          this.countries = response;
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      this.setDefaultCountry();
      console.log("values formulario",this.userForm.value);
    }
  }

  async loadRoles() {
    if(!this.isTechnicalContractor){
      const roleName = this.sessionService.getUserField('Role');
      const countryId = this.sessionService.getUserField('CountryId');
      await this.apiServie
        .get<Array<Role>>(
          `${EndpointsServices.GET_ROLES_BY_ID}${roleName}/${countryId}`,
          false
        )
        .then((response: Array<Role>) => {
          this.roles = response;
        })
        .catch((error) => {
          console.error('Error getting roles:', error);
        });
    }else{
      this.setDefaultRoleId();
      console.log("values formulario",this.userForm.value);
    }
  }

  private setDefaultCountry(): void {
    if (!this.isSuperAdmin) {
      this.userForm.patchValue({ countryId: this.selectedCountry }); // Reemplaza con el valor adecuado
    }
  }
  private setDefaultRoleId(): void {
    if (this.isTechnicalContractor) {
      this.userForm.patchValue({ rolId: this.sessionService.getUserField('RoleId') }); // Reemplaza con el valor adecuado
    }
  }
}
