import { Component, inject, OnInit } from '@angular/core';
import { RequestPlanningCreateConfig } from './request-planning-create.config';
import { environment } from '@environments/environment';
import { TypeProject } from '@shared/models/type-project';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { SessionService } from 'src/app/services/session.service';
import { EndpointsServices } from 'src/app/const/endpoints';
import { FormBuilder, Validators } from '@angular/forms';
import { PlanningState } from '@shared/models/planning-state';

@Component({
  selector: 'app-create-request-planning',
  templateUrl: './create-request-planning.component.html',
  styleUrls: ['./create-request-planning.component.scss']
})
export class CreateRequestPlanningComponent implements OnInit {

  config = RequestPlanningCreateConfig;
  maxLenghtInput = environment.maxlengthInput;
  maxLenghtTextArea = environment.maxlengthTextArea;
  typeProjects: Array<TypeProject> = [];
  planningStates: Array<PlanningState> = [];
  isLinear = false;

  constructor(private readonly apiService: ApiService,
    private readonly sessionService: SessionService,
    private readonly utilsService: UtilsService,
    private readonly router: Router) { }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    typeProjectId: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(this.maxLenghtInput)]],
    meters: ['', [Validators.required, Validators.maxLength(this.maxLenghtInput), Validators.pattern("^[0-9]*$")]],
    cost: ['', [Validators.required, Validators.maxLength(this.maxLenghtInput), Validators.pattern("^[0-9]*$")]],
    assignmentDate: ['', [Validators.required, Validators.maxLength(this.maxLenghtInput)]],
  });

  ngOnInit() {
    this.loadAllTypeProject();
    this.loadAllPlanningStates();
  }

  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) { // ASCII codes for 0-9
      event.preventDefault();
    }
  }

  loadAllTypeProject() {
    this.apiService.get<Array<TypeProject>>(EndpointsServices.TYPE_PROJECT,true).then((response: Array<TypeProject>) => {
      if (response.length > 0) {
        this.typeProjects = response;
      }
    })
  }

  loadAllPlanningStates() {
    this.apiService.get<Array<PlanningState>>(EndpointsServices.PLANNING_STATE,true).then((response: Array<PlanningState>) => {
      if (response.length > 0) {
        this.planningStates = response;
      }
    });
  }

  validateData() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const requestPlanning =
      {
        name: this.secondFormGroup.value.name,
        meters: this.secondFormGroup.value.meters,
        cost: this.secondFormGroup.value.cost,
        assignmentDate: this.secondFormGroup.value.assignmentDate,
        statusId: this.planningStates.find(status => status.name === this.config.i18n.statusInitial)?.id,
        assignedId: this.sessionService.getUserField('UserId'),
        typeProjectId: this.firstFormGroup.value.typeProjectId,
        attachs: 'temporary attachment',
      }
      this.sendData(requestPlanning);
    } else {
      this.utilsService.showToast(this.config.i18n.requiredField, 'error');
    }
  }

  sendData(requestPlanning: any) {
    this.apiService.post(EndpointsServices.REQUEST_PLANNING, requestPlanning).then((response: any) => {
      if (response) {
        this.utilsService.showToast(this.config.i18n.requestPlanningCreated, 'success');
        this.router.navigate(['/home/request-planning']);
      } else {
        this.utilsService.showToast(this.config.i18n.errorCreatingRequestPlanning, 'error');
      }
    });
  }

}
