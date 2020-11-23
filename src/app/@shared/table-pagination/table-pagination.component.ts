import { ACTIVE_FILTERS } from './../../@core/constants/filters';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { IResultData } from '@core/interfaces/result-data.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { TablePaginationService } from './table-pagination.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USERS_LIST_QUERY;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
  @Output() manageItem = new EventEmitter<Array<any>>();
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('Undefined query');
    }
    if (this.resultData === undefined) {
      throw new Error('Undefined resultData');
    }
    if (this.tableColumns === undefined) {
      throw new Error('Undefined tableColumns');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    };
    // console.log(this.infoPage.itemsPage);
    this.loadData();
  }

  loadData() {
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues
    };
    console.log(variables.itemsPage);
    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      }
    ));
  }
  changePage(){
    this.loadData();
  }

  manageAction(action: string, data: any) {
    console.log(action, data);
    this.manageItem.emit([action, data]);
  }

}

