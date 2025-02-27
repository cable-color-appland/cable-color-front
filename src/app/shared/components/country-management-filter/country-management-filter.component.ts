import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { Country } from '@shared/models/country';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { CountryFilterCongif } from './country-management-filter.config';

@Component({
  selector: 'app-country-management-filter',
  templateUrl: './country-management-filter.component.html',
  styleUrls: ['./country-management-filter.component.scss']
})
export class CountryManagementFilterComponent implements OnInit {

  countries: Array<Country> = [];
  @Output() countrySelected = new EventEmitter<any>();

  config = CountryFilterCongif;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get<Array<Country>>(EndpointsServices.GET_ALL_COUNTRY).then((response: Array<Country>) => {
      this.countries = response;
    }
    ).catch((error) => {
      console.error('Error getting countries:', error);
    }
    );
  }

  

  onCountrySelected(event: any) {
    this.countrySelected.emit(event);
  }

}
