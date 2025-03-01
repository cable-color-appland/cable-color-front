import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTypeRequestCongif } from './list-type-request.config';
import { TypeRequest } from '@shared/models/TypeRequest';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { EndpointsServices } from 'src/app/const/endpoints';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-type-request',
  templateUrl: './list-type-request.component.html',
  styleUrls: ['./list-type-request.component.scss']
})
export class ListTypeRequestComponent implements OnInit {

  public config = ListTypeRequestCongif;
  typeRequests: Array<TypeRequest> = [];
  displayCountryManagement = false;

  dataSource = new MatTableDataSource<TypeRequest>(this.typeRequests);
  noData: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedCountry: string = '';

  constructor(private readonly apiService: ApiService,
    private readonly sessionService: SessionService) {
    this.displayCountryManagement = this.sessionService.isSuperAdmin();
  }

  ngOnInit() {
    this.selectedCountry = this.sessionService.getUserField('CountryId');
    this.loadAllTypeRequest(this.selectedCountry);
  }

  onCountrySelected(country: any): void {
    this.loadAllTypeRequest(country.value);
  }

  loadAllTypeRequest(countryId: string = '') {
    this.apiService.get<Array<TypeRequest>>(`${EndpointsServices.GET_ALL_TYPE_REQUESTS}/GetByCountryId/${countryId}`).then((response: Array<TypeRequest>) => {
      if (response.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
        this.typeRequests = response;
      }
    }).catch((error) => {
      console.error('Error getting typeRequest:', error);
    }
    );
  }

}
