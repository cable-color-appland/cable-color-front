import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  
  Users: User[] = [];
  displayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'firstName', 'lastName', 'rolName', 'countryName'];
  
  dataSource = new MatTableDataSource<User>(this.Users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.get('User').then((response: any) => {
      const users = response as User[];
      this.Users = users;
      console.log("🚀 ~ UserComponent ~ this.apiService.get ~ this.USERS:", this.Users)
      
      this.dataSource.data = this.Users;
    }).catch((error) => {
      console.error('Error getting users:', error);
    });
  }
  ngOnInit(): void {
    
  }

  navigateToCreateUser() {
    this.router.navigate(['/create']);
  }

}
