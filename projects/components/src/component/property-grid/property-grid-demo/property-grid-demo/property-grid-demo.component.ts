import {Component, OnInit, ViewChild} from '@angular/core';
import {TableColumn} from "../../../table/contract/table-column";
import {FilterType} from "../../../filter/enum/filter-type.enum";
import * as faker from 'faker';
import {IIdName} from "../../../../common/contract/i-id-name";
import { NgForm, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {IDictionary} from "../../../../common/contract/i-dictionary";
import { PropertyGridItemDescriptionDirective } from '../../property-grid/property-grid-item-description.directive';
import { PropertyGridComponent } from '../../property-grid/property-grid.component';

@Component({
    selector: 'teta-property-grid-demo',
    templateUrl: './property-grid-demo.component.html',
    styleUrls: ['./property-grid-demo.component.scss'],
    standalone: true,
    imports: [FormsModule, PropertyGridComponent, PropertyGridItemDescriptionDirective, ReactiveFormsModule]
})
export class PropertyGridDemoComponent implements OnInit {
  @ViewChild('form', {
    static: true
  }) form: NgForm;
  item = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    date: faker.date.between(new Date(2010, 0, 1), new Date(2021, 0, 1)),
    value: faker.datatype.number({min: 0, max: 100}),
    summary: faker.datatype.number({min: 0, max: 100000}),
    ram: faker.helpers.randomize([8, 16, 32, 64, 128]),
    address: faker.address.streetAddress(),
    state: faker.address.state(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
  };

  dict: IDictionary<IIdName<any>[]> = {
    ram: [
      {id: 8, name: '8'},
      {id: 16, name: '16'},
      {id: 32, name: '32'},
      {id: 64, name: '64'},
      {id: 128, name: '128'},
    ],
  };

  columns = [
    new TableColumn({
      name: 'name',
      flex: 1,
      locked: true,
      filterType: FilterType.string,
    }),
    new TableColumn({
      name: 'date',
      locked: true,
      filterType: FilterType.date,
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
      caption: 'RAM',
      filterType: FilterType.list,
    })]

  constructor() {
  }

  save(data) {
    console.log(data)
  }

  ngOnInit(): void {
  }

}
