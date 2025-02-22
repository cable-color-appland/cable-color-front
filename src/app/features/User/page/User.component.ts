import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  
  Users: User[] = [];
  displayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'firstName', 'lastName', 'rolName', 'countryName'];
  
  dataSource = new MatTableDataSource<User>(this.Users);
  countryId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router, 
    private readonly sessionService: SessionService) {

  }

  ngOnInit(): void {
    if(!this.sessionService.isSuperAdmin()){
      this.LoadUsers(this.sessionService.getUserField('CountryId'));
    }
  }
  private LoadUsers(countryId: string) {
    this.apiService.get('User').then((response: any) => {
      const users = response as User[];
      this.Users = users;
      this.dataSource.data = this.Users;
    }).catch((error) => {
      console.error('Error getting users:', error);
    });
  }


  navigateToCreateUser() {
    this.router.navigate(['/create']);
  }

  onCountrySelected(country: any): void {
    console.log("Selected country:", country);
   // this.loadUsers(country.id);
  }

}
