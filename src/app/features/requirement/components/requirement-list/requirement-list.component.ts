import { Component, OnInit } from '@angular/core';
import { RequirementListConfig } from './requirement-list.config';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Status } from '@shared/models/Status';
import { Requirement } from '@shared/models/requirement';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrl: './requirement-list.component.scss'
})
export class RequirementListComponent implements OnInit {

  public config = RequirementListConfig;

    statuses: Array<Status> = [];
    ongoingRequirements: Array<Requirement> = [];
    finishedRequirements: Array<Requirement> = [];

  constructor(private readonly apiService: ApiService,
      private readonly sessionService: SessionService,) {
  }

  ngOnInit(): void {
    this.loadAllStatus(); 
  }

  loadValues() {  

    // Filter by Ongoing
    const statudIdOngoing = this.statuses.find((status) => status.name === this.config.i18n.statusOngoing)?.id || '';    
    this.loadOngoingRequirements(statudIdOngoing);

    // Filter by finished 
    const statudIdFinish = this.statuses.find((status)=> status.name === this.config.i18n.statusFinish)?.id || '';
    this.loadFinishedRequirements(statudIdFinish);
  }

  loadAllStatus() {
    this.apiService.get<Array<Status>>(EndpointsServices.GET_ALL_STATUS, true).then((response: Array<Status>) => {
      if (response.length > 0) {
        this.statuses = response;
        this.loadValues();
      }
    });
  }

  loadFinishedRequirements(statudId:string) {
    this.apiService.get<Array<Requirement>>(`${EndpointsServices.GET_REQUIREMENT_BY_STATUS}${statudId}`, false).then((response: Array<Requirement>) => {
      this.finishedRequirements = response;
    });
  }

  loadOngoingRequirements(statudId:string) {
    this.apiService.get<Array<Requirement>>(`${EndpointsServices.GET_REQUIREMENT_BY_STATUS}${statudId}`, false).then((response: Array<Requirement>) => {
      this.ongoingRequirements = response;
    });
  }

}
