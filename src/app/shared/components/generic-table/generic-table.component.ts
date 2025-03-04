import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

interface TableColumn {
  field: string;
  title: string;
  component?: any;
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Output() actionEvent = new EventEmitter<{ action: string; row: any }>();
  @Input() enableCheckbox = false;

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private readonly injector: Injector) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.enableCheckbox
      ? ['select', ...this.columns.map((col) => col.field)]
      : [...this.columns.map((col) => col.field)];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleAllRows(): void {
    this.selection.hasValue()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onActionClick(action: any, row: any) {
    this.actionEvent.emit({ action, row });
  }

  createInjector(row: any): Injector {
    return Injector.create({
      providers: [
        { provide: 'data', useValue: row },
        { provide: 'actionEvent', useValue: this.actionEvent },
      ],
      parent: this.injector,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
