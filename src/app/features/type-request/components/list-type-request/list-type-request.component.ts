import { Component, OnInit } from '@angular/core';
import { ListTypeRequestCongif } from './list-type-request.config';
import { TypeRequest } from '@shared/models/TypeRequest';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-list-type-request',
  templateUrl: './list-type-request.component.html',
  styleUrls: ['./list-type-request.component.scss']
})
export class ListTypeRequestComponent implements OnInit {

  public config = ListTypeRequestCongif;
  typeRequest: Array<TypeRequest> = [];
  displayCountryManagement = false;

  constructor(private readonly apiService: ApiService,
    private readonly sessionService: SessionService) {
      this.displayCountryManagement = this.sessionService.isSuperAdmin();
    }

  ngOnInit() {
    if(this.displayCountryManagement){
      this.loadAllTypeRequest(this.sessionService.getUserField('CountryId'));
    }
  }

  onCountrySelected(country: any): void {
    this.loadAllTypeRequest(country.value);
  }

  loadAllTypeRequest(countryId: string = '') {
    this.apiService.get<Array<TypeRequest>>(`${EndpointsServices.GET_ALL_TYPE_REQUESTS}/GetByCountryId/${countryId}`).then((response: Array<TypeRequest>) => {
      this.typeRequest = response;
    }
    ).catch((error) => {
      console.error('Error getting typeRequest:', error);
    }
    );
  }

}
