import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-country-management-filter',
  templateUrl: './country-management-filter.component.html',
  styleUrls: ['./country-management-filter.component.css']
})
export class CountryManagementFilterComponent implements OnInit {

  countries: any[] = [];
  @Output() countrySelected = new EventEmitter<any>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get(EndpointsServices.GET_ALL_COUNTRY).then((response: any) => {
      this.countries = response;
    }
    ).catch((error) => {
      console.error('Error getting countries:', error);
    }
    );
  }

  

  onCountrySelected(event: any) {
    console.log("🚀 ~ CountryManagementFilterComponent ~ onCountrySelected ~ event:", event)
    this.countrySelected.emit(event);
  }

}
