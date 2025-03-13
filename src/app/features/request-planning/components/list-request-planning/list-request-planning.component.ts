import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListRequestPlanningConfig } from './list-request-planning.config';
import { ApiService } from 'src/app/services/api.service';
import { RequestPlanning } from '@shared/models/request-planning';
import { EndpointsServices } from 'src/app/const/endpoints';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-request-planning',
  templateUrl: './list-request-planning.component.html',
  styleUrls: ['./list-request-planning.component.scss']
})
export class ListRequestPlanningComponent implements OnInit, AfterViewInit {

  config = ListRequestPlanningConfig;
  dataValues: Array<RequestPlanning> = [];
  dataSource = new MatTableDataSource<RequestPlanning>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private readonly apiService: ApiService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadRequestPlanning();
  }


  loadRequestPlanning() {
    this.apiService.get<Array<RequestPlanning>>(EndpointsServices.REQUEST_PLANNING).then((response: Array<RequestPlanning>) => {
      if (response.length > 0) {
        this.dataSource.data = response;
      }
    }
    );
  }
}
