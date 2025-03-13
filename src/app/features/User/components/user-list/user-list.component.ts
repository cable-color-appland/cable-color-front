import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '@shared/models/user';
import { map } from 'rxjs';
import { EndpointsServices } from 'src/app/const/endpoints';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  Users: User[] = [];
  displayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'firstName', 'lastName','countryName'];
  
  dataSource = new MatTableDataSource<User>();
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));
  countryId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEmptyTable: any;
  isSuperAdmin: boolean = false;
  selectedCountry: any;

  constructor(private apiService: ApiService, private router: Router, 
    private readonly sessionService: SessionService) {
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
    this.selectedCountry = this.sessionService.getUserField('CountryId');
  }

  ngOnInit(): void {
    this.LoadUsers(this.sessionService.getUserField('CountryId'));
  }
  private LoadUsers(countryId: string) {
    this.apiService.get<Array<User>>(`${EndpointsServices.GET_ALL_USERS_BY_COUNTRY_ID}${countryId}`,false).then((response: Array<User>) => {
      this.Users  = response;
      this.isEmptyTable = this.Users.length === 0;
      this.dataSource.data = this.Users;
    }).catch((error) => {
      console.error('Error getting users:', error);
    });
  }
  navigateToCreateUser() {
    this.router.navigate(['/create']);
  }

  onCountrySelected(country: any): void {
    this.LoadUsers(country.value);
  }

}
