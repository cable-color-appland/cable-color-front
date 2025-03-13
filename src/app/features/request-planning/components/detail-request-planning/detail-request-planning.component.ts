import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestPlanning } from '@shared/models/request-planning';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { RequestDetailConfig } from './request-planning-detail.config';

@Component({
  selector: 'app-detail-request-planning',
  templateUrl: './detail-request-planning.component.html',
  styleUrls: ['./detail-request-planning.component.scss']
})
export class DetailRequestPlanningComponent implements OnInit {

  requestPlanning!: RequestPlanning;
  config = RequestDetailConfig;

  constructor(private readonly route: ActivatedRoute,
      private readonly router: Router,
      private readonly apiService: ApiService) { }

  ngOnInit() {
    this.validateParameter();
  }

  validateParameter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequestPlanning(id);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadRequestPlanning(id: string): void {
    this.apiService.get<RequestPlanning>(`${EndpointsServices.REQUEST_PLANNING}/${id}`)
    .then((response:RequestPlanning) => {
      this.requestPlanning = response as RequestPlanning;
    });
  }

}
