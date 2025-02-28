import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Role } from '@shared/models/role';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { FormTypeRequestCongif } from './form-type-request.config';
import { environment } from '@environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { TypeRequest } from '@shared/models/TypeRequest';
import { count } from 'rxjs';

@Component({
  selector: 'app-form-type-request',
  templateUrl: './form-type-request.component.html',
  styleUrls: ['./form-type-request.component.scss']
})
export class FormTypeRequestComponent implements OnInit {

  config = FormTypeRequestCongif;
  maxLenghtInput = environment.maxlengthInput;

  @Output() entity = new EventEmitter<any>();
  @Input() typeRequestData: any = null;

  displayCountryManagement = false;
  roles: Array<Role> = [];

  constructor(private readonly apiService: ApiService,
      private readonly utilsService: UtilsService,
      private readonly sessionService: SessionService) {
          this.displayCountryManagement = this.sessionService.isSuperAdmin(); 
       }
  private formBuilder = inject(FormBuilder);
  typeRequestForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(this.maxLenghtInput)]],
        roleId: ['', [Validators.required]],
        countryId: ['', [Validators.required]]
      });;     

  ngOnInit() {
    if(!this.displayCountryManagement){
      const countryId = this.sessionService.getUserField('CountryId');
      this.typeRequestForm.get('countryId')?.setValue(countryId);
      this.loadRolesByCountry(countryId);
    }

    if(this.typeRequestData){
      this.typeRequestForm.patchValue(this.typeRequestData);
    }
  }

  onCountrySelected(country: any): void {
    this.typeRequestForm.get('countryId')?.setValue(country.value);
    this.loadRolesByCountry(country.value);
  }

  loadRolesByCountry(countryId: string = '') {
    this.apiService.get<Array<Role>>(`${EndpointsServices.Roles}/GetRolesByCountryId/${countryId}`).then((response: Array<Role>) => {
      this.roles = response;
    }
    ).catch((error) => {
      console.error('Error getting typeRequest:', error);
    }
    );
  }

  submitForm() {
    if (this.typeRequestForm.valid) {
      this.entity.emit(this.typeRequestForm.value);
    }else{
      this.utilsService.showToast(this.config.i18n.requiredField, 'error');
    }
  }

}
