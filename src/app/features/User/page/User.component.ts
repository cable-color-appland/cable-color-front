import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../userInterface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  
  displayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'firstName', 'lastName', 'rolName'];
  USERS: User[] = [
    {
      id: '1',
      userName: 'johndoe',
      password: 'password123',
      email: 'johndoe@example.com',
      phoneNumber: '+1234567890',
      firstName: 'John',
      lastName: 'Doe',
      rolName: 'Admin',
      countryId: 'a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78'
    },
    {
      id: '2',
      userName: 'janedoe',
      password: 'password456',
      email: 'janedoe@example.com',
      phoneNumber: '+0987654321',
      firstName: 'Jane',
      lastName: 'Doe',
      rolName: 'User',
      countryId: 'b2c3d4e5-f678-9012-ab34-cd56ef78gh90'
    },
    {
      id: '3',
      userName: 'mikesmith',
      password: 'password789',
      email: 'mikesmith@example.com',
      phoneNumber: '+1234908765',
      firstName: 'Mike',
      lastName: 'Smith',
      rolName: 'User',
      countryId: 'c3d4e5f6-7890-1234-ab56-cd78ef90gh12'
    },
    {
      id: '4',
      userName: 'emilyjones',
      password: 'password000',
      email: 'emilyjones@example.com',
      phoneNumber: '+1987654321',
      firstName: 'Emily',
      lastName: 'Jones',
      rolName: 'Moderator',
      countryId: 'd4e5f678-9012-3456-ab78-cd90ef12gh34'
    }
  ];
  
  dataSource = new MatTableDataSource<User>(this.USERS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.get('User').then((response: any) => {
      const users = response as User[];
      this.USERS = users;
      console.log("🚀 ~ UserComponent ~ this.apiService.get ~ this.USERS:", this.USERS)
      
      this.dataSource.data = this.USERS;
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
