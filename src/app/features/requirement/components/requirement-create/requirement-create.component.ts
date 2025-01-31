import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority } from '@shared/models/priority';
import { TypeRequest } from '@shared/models/TypeRequest';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { RequirementCreateConfig } from './requirement-create.config';
import { UtilsService } from 'src/app/services/utils.service';
import { Status } from '@shared/models/Status';
import { Requirement } from '@shared/models/requirement';
import { Router } from '@angular/router';
import { Region } from '@shared/models/region';

@Component({
  selector: 'app-requirement-create',
  templateUrl: './requirement-create.component.html',
  styleUrl: './requirement-create.component.scss'
})
export class RequirementCreateComponent implements OnInit {

  public config = RequirementCreateConfig;
  typeRequests: Array<TypeRequest> = [];
  priorities: Array<Priority> = [];
  statuses: Array<Status> = [];
  regions: Array<Region> = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly sessionService: SessionService,
    private readonly utilsService: UtilsService,
    private readonly router: Router,
  ) {

  }

  isLinear = false;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    typeRequestId: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    client: ['', [Validators.required, Validators.maxLength(50)]],
    place: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    contacts: ['', [Validators.required, Validators.maxLength(100)]],
    priorityId: ['', Validators.required],
  });

  ngOnInit(): void {

    this.loadAllTypeRequest(this.sessionService.getUserField('Role'));
    this.loadAllPriorities();
    this.loadAllStatus();
    this.loadAllRegions();
  }

  loadAllTypeRequest(roleId: string) {
    this.apiService.post<Array<TypeRequest>>(`${EndpointsServices.GET_ALL_TYPE_REQUEST_BY_ROLE}?roles=${roleId}`, true).then((response) => {
      this.typeRequests = response;
    });
  }

  loadAllPriorities() {
    this.apiService.get<Array<Priority>>(EndpointsServices.GET_ALL_PRIORITY, true).then((response: Array<Priority>) => {
      this.priorities = response;
    });
  }

  loadAllStatus() {
    this.apiService.get<Array<Status>>(EndpointsServices.GET_ALL_STATUS, true).then((response: Array<Status>) => {
      this.statuses = response;
    });
  }

  loadAllRegions() {
    this.apiService.get<Array<Region>>(`${EndpointsServices.GET_ALL_REGION_BY_COUNTRY_ID}${this.sessionService.getUserField('CountryId')}`,true)
    .then((response: Array<Region>) => {
      this.regions = response;
    });
  }

  validateData() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const requirement =
      {
        client: this.secondFormGroup.value.client,
        place: this.secondFormGroup.value.place,
        description: this.secondFormGroup.value.description,
        contacts: this.secondFormGroup.value.contacts,
        priorityId: this.secondFormGroup.value.priorityId,
        statusId: this.statuses.find(status => status.name === this.config.i18n.statusInitial)?.id,
        assignedId: this.sessionService.getUserField('UserId'),
        typeRequestId: this.firstFormGroup.value.typeRequestId,
        attachs: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Euismod rhoncus praesent lacus ligula.',
        projectName: 'Lorem ipsum dolor cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat , sunt in culpa.',
        regionId: this.regions.at(0)?.id,
      }
      this.sendData(requirement);
    } else {
      this.utilsService.showToast(this.config.i18n.requiredField, 'error');
    }
  }

  sendData(requirement: any) {
    this.apiService.post<Requirement>(EndpointsServices.REQUIREMENT, requirement).then((response) => {
      this.utilsService.showToast(this.config.i18n.requirementCreated, 'success');
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.utilsService.showToast(this.config.i18n.errorCreatingRequirement, 'error');
    });
  }

}
