import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { CustomAsyncDataSource } from 'src/app/API/mock/CustomAsyncDataSource';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-async-table',
  templateUrl: './async-table.component.html',
  styleUrls: ['./async-table.component.scss'],
})
export class AsyncTableComponent implements OnInit {
  @Input() dataSource: CustomAsyncDataSource<any>;
  @Input() displayedColumns: CustomAsyncDataSource<any>;
  public numberOfResults: number = 0;
  public sort: any;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  constructor() {}

  ngOnInit(): void {
    this.dataSource.numberOfResults$.subscribe(
      (nb) => (this.numberOfResults = nb)
    );
  }

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
  }
}
