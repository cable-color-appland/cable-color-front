import { Component, EventEmitter, Input, OnChanges, OnInit, Output, output } from '@angular/core';
import { Country } from '@shared/models/country';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { CountryFilterCongif } from './country-management-filter.config';
import { FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-country-management-filter',
  templateUrl: './country-management-filter.component.html',
  styleUrls: ['./country-management-filter.component.scss']
})
export class CountryManagementFilterComponent implements OnInit, OnChanges {

  countries: Array<Country> = [];
  @Output() countrySelected = new EventEmitter<any>();
  @Input() selectedCountryId: string = '';
  selectedCountry: FormControl = new FormControl();

  config = CountryFilterCongif;
  isSuperAdmin: any;

  constructor(private apiService: ApiService,private readonly sessionService: SessionService) {
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
   }

  ngOnInit() {
    if(this.isSuperAdmin){
      this.apiService.get<Array<Country>>(EndpointsServices.GET_ALL_COUNTRY,true).then((response: Array<Country>) => {
        this.countries = response;
      }
      ).catch((error) => {
        console.error('Error getting countries:', error);
      }
      );   
    }
  }

  onCountrySelected(event: any) {
    this.countrySelected.emit(event);
  }

  ngOnChanges(): void {
    this.selectedCountry.setValue(this.selectedCountryId);
  }

}
