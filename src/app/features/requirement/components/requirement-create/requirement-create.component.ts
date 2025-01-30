import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority } from '@shared/models/priority';
import { TypeRequest } from '@shared/models/TypeRequest';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-requirement-create',
  templateUrl: './requirement-create.component.html',
  styleUrl: './requirement-create.component.scss'
})
export class RequirementCreateComponent implements OnInit {

  typeRequests: Array<TypeRequest> = [];
  priorities: Array<Priority> = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly sessionService: SessionService
  ) {

  }

  isLinear = false;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {

    this.loadAllTypeRequest(this.sessionService.getUserField('Role'));
    this.loadAllPriorities();
  }

  loadAllTypeRequest(roleId: string) {
    this.apiService.post<Array<TypeRequest>>(`${EndpointsServices.GET_ALL_TYPE_REQUEST_BY_ROLE}?roles=${roleId}`, true).then((response) => {
      this.typeRequests = response;
      console.log(this.typeRequests);
    });
  }

  loadAllPriorities() {
    this.apiService.get<Array<Priority>>(EndpointsServices.GET_ALL_PRIORITY, true).then((response:Array<Priority>) => {
      this.priorities = response;
    });
  }

}
