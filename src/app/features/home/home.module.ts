import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { HomePage } from './page/home.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [HomePage],
  providers: [],
})
export class HomeModule {}
