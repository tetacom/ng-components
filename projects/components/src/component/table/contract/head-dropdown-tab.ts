import {TemplateRef} from '@angular/core';
import {TableColumn} from './table-column';

export interface HeadDropdownTabConfig {
  strategy: 'merge' | 'replace';
  tabs?: HeadDropdownTab[];
}

export interface HeadDropdownTab {
  title?: string;
  icon?: string;
  template?: TemplateRef<any>;
  order?: number;
  showTab: (column: TableColumn) => boolean ;
}
