import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Requirement } from '@shared/models/requirement';
import { ListTableConfig } from './list-table.config';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent implements OnInit, AfterViewInit {

public config = ListTableConfig;

@Input() public data: Array<Requirement> = [];
dataSource = new MatTableDataSource<Requirement>();
@ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor() {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    if (this.data.length > 0) {
      this.dataSource.data = this.data;
    }
  }

  detailRequirement(requirement: Requirement) {
    alert('Detalle de requerimiento = '+ requirement.id);
  }

}
