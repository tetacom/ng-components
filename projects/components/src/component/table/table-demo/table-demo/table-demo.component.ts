import {Component, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as faker from 'faker';
import {TableColumn} from '../../contract/table-column';
import {FilterType} from '../../../filter/enum/filter-type.enum';
import {IDictionary} from '../../../../common/contract/i-dictionary';
import {IIdName} from '../../../../common/contract/i-id-name';
import {EditType} from '../../enum/edit-type.enum';
import {SelectType} from '../../enum/select-type.enum';
import {EditEvent} from '../../enum/edit-event.enum';
import {TableService} from '../../service/table.service';
import {TableRow} from '../../contract/table-row';
import {ICellEvent} from '../../contract/i-cell-event';
import {ICellInstance} from '../../contract/i-cell-instance';

@Component({
  selector: 'teta-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {
  @Input() size: number;
  @Input() virtual: boolean;
  @Input() editType: EditType;
  @Input() selectType: SelectType;
  @Input() editEvent: EditEvent;
  @ViewChild(TemplateRef, {read: TemplateRef, static: true}) dropdownTpl: TemplateRef<any>;
  @ViewChild(TemplateRef, {read: TemplateRef, static: true}) contextMenu: TemplateRef<any>;
  tableService: TableService<any>;
  activeRow: TableRow<any>;
  selectedRows: TableRow<any>[];
  dict: IDictionary<IIdName<any>[]> = {
    ram: [
      {id: 8, name: '8'},
      {id: 16, name: '16'},
      {id: 32, name: '32'},
      {id: 64, name: '64'},
      {id: 128, name: '128'},
    ],
    long: []
  };
  data: any[] = [];
  columns = [];


  constructor() {
    this.dict['long'] = this.getLong();
  }

  @HostListener('keydown', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('keypress', ['$event'])
  keydown(event: KeyboardEvent) {
    event.stopPropagation();
  }

  log = (name, value) => {
    console.log(name, value);
  };

  ngOnInit(): void {
    this.data = this.getData(this.size);
    this.columns = [
      new TableColumn({
        name: 'name',
        flex: 1,
        locked: true,
        unit: 'v',
        filterType: FilterType.string,
        headDropdownTemplate: this.dropdownTpl
      }),
      new TableColumn({
        name: 'city',
        filterType: FilterType.string,
        locked: true,
        editable: false
      }),
      new TableColumn({
        name: 'date',
        locked: true,
        filterType: FilterType.date,
      }),
      new TableColumn({
        name: 'long',
        locked: true,
        filterType: FilterType.list,
      }),
      new TableColumn({
        name: 'value',
        locked: true,
        filterType: FilterType.number,
      }),
      new TableColumn({
        name: 'summary',
        filterType: FilterType.number,
      }),
      new TableColumn({
        name: 'ram',
        unit: 'Gb',
        caption: 'RAM',
        filterType: FilterType.list,
      }),
      new TableColumn({
        name: 'location',
        columns: [
          new TableColumn({
            name: 'state',
            filterType: FilterType.string,
          }),
          new TableColumn({
            name: 'address',
            flex: 2,
            filterType: FilterType.string,
          }),
          new TableColumn({
            name: 'zip',
            filterType: FilterType.string,
          }),
        ],
      }),
    ];
  }

  getData = (size) => {
    const res = [];
    for (let i = 0; i < size; i++) {
      res.push({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        date: faker.date.between(new Date(2010, 0, 1), new Date(2021, 0, 1)),
        long: faker.helpers.randomize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        value: faker.datatype.number({min: 0, max: 100}),
        summary: faker.datatype.number({min: 0, max: 100000}),
        ram: faker.helpers.randomize([8, 16, 32, 64, 128]),
        address: faker.address.streetAddress(),
        state: faker.address.state(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
      });
    }
    return res;
  };

  getLong = () => {
    const res = [];
    for (let i = 0; i <= 10; i++) {
      res.push({
        id: i,
        name: `${faker.address.city()} ${faker.address.country()} ${faker.address.state()} ${faker.address.zipCode()}`,
      });
    }
    return res;
  };

  cellEditStart(event: ICellInstance<any>) {

  }

  addRow() {
  }

  delete() {

  }

  deleteAll() {

  }

  copy() {
    navigator.clipboard.writeText(
      this.toClipboardString([this.activeRow], this.tableService.getVisibleColumns())
    );
  }

  copyAll() {
    navigator.clipboard.writeText(
      this.toClipboardString(this.selectedRows, this.tableService.getVisibleColumns())
    );
  }

  async paste() {
    const result = await navigator.clipboard.readText();
    console.log(this.fromClipboard(result, this.tableService.getVisibleColumns()));
  }

  private toClipboardString(rows: TableRow<any>[], columns: TableColumn[]) {
    return rows.reduce(
      (res: string, currentRow: TableRow<any>, i: number) =>
        `${res}${i === 0 ? '' : '\n'}${columns.reduce(
          (columnResult: string, column: TableColumn, j: number) =>
            `${columnResult}${j === 0 ? '' : '\t'}${
              currentRow.data[column.name] ?? ''
            }`,
          ''
        )}`,
      ''
    );
  }

  private fromClipboard(data: string, columns: TableColumn[]) {
    const rows = data.split('\n').filter((_) => _?.length > 0);
    const result = rows.map((_) =>
      _.replace('\r', '').replace('\n', '').split('\t')
    );
    return result.map((row: string[]) =>
      row.reduce((res, item, index) => {
        let value: any = item;
        if (
          columns[index]?.filterType === FilterType.number ||
          columns[index]?.filterType === FilterType.list
        ) {
          value = parseFloat(item);
        }
        if (columns[index]?.filterType === FilterType.boolean) {
          value = Boolean(JSON.parse(item.toLowerCase()));
        }
        if (columns[index]) {
          res[columns[index].name] = value;
        }
        return res;
      }, {})
    );
  }
}
