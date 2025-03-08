import { Component, OnInit } from '@angular/core';
import { ListRequestPlanningConfig } from './list-request-planning.config';
import { ApiService } from 'src/app/services/api.service';
import { RequestPlanning } from '@shared/models/request-planning';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-list-request-planning',
  templateUrl: './list-request-planning.component.html',
  styleUrls: ['./list-request-planning.component.scss']
})
export class ListRequestPlanningComponent implements OnInit {

  config = ListRequestPlanningConfig;
  dataValues: Array<RequestPlanning> = [];

  constructor(private readonly apiService: ApiService) { }

  ngOnInit() {
  }


  loadRequestPlanning() {
    this.apiService.get<Array<RequestPlanning>>(EndpointsServices.REQUEST_PLANNING, true).then((response: Array<RequestPlanning>) => {
      if (response.length > 0) {
        this.dataValues = response;
      }
    }
    );
  }

  handleAction($event: any) {
    console.log($event);
  }

}
