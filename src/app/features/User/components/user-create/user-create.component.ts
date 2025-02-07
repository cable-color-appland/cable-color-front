import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EndpointsServices } from 'src/app/const/endpoints';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/assets/Messages/Messages';
import { UserCreateConfig } from './user-create.config';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  public config = UserCreateConfig;
  countries: any;
  roles: any;
   private _formBuilder = inject(FormBuilder);
  constructor(
    private router: Router,
    private apiServie: ApiService,
     private readonly utilsService: UtilsService,
  ) {
  }

  userForm = this._formBuilder.group({
    userName: ['', Validators.maxLength(environment.maxlengthInput)],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(environment.maxlengthInput)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(20)]],
    firstName: ['', [Validators.required, Validators.maxLength(environment.maxlengthInput)]],
    lastName: ['', [Validators.required, Validators.maxLength(environment.maxlengthInput)]],
    rolName: ['', Validators.required],
    countryId: ['', Validators.required],
  });

  ngOnInit() {
    this.loadCountries();
    this.loadRoles();
  }

  submitForm() {
    if (this.userForm.valid) {
      const user =
      {
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        rolName: this.userForm.value.rolName,
        countryId: this.userForm.value.countryId,
      }
      
      this.apiServie.post(EndpointsServices.USERS, user).then((response) => {
        this.utilsService.showToast(Messages.USER_CREATED, 'success');
        this.router.navigate(['/home/User']);
      }).catch((error) => {
        this.utilsService.showToast(Messages.ERROR_GENERIC, 'error');
      });
    }else{
      this.utilsService.showToast(this.config.i18n.requiredField, 'error');
    }
  }

  async loadCountries() {
    await this.apiServie
      .get(EndpointsServices.GET_ALL_COUNTRY)
      .then((response) => {
        this.countries = response;
        console.log("🚀 ~ UserCreateComponent ~ .then ~ this.countries:", this.countries)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadRoles() {
    await this.apiServie
      .get(EndpointsServices.Roles)
      .then((response) => {
        this.roles = response;
        console.log("🚀 ~ UserCreateComponent ~ .then ~ this.roles:", this.roles)
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
