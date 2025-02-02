import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  countries: any;
  roles: any;
  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rolName: ['', Validators.required],
      countryId: ['', Validators.required],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (this.userForm.valid) {
      //this.userService.addUser(this.userForm.value);
      this.router.navigate(['/users']); // Redirigir a la lista de usuarios
    }
  }
}
