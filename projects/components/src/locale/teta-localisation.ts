export interface TetaLocalisation {
  apply: string;
  cancel: string;
  clear: string;
  pin: string;
  unpin: string;
  sortAsc: string;
  sortDesc: string;
  clearSort: string;
  clearAllSort: string;
  clearFilter: string;
  clearAllFilters: string;
  autosizeColumn: string;
  autosizeAll: string;
  resetColumnsSize: string;
  from: string;
  to: string;
  all: string;
  min: string;
  max: string;
  sum: string;
  avg: string;
  search: string;
  selected:string;
  notFound:string;
  notSelected: string;
  yes: string;
  no: string;
  months: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  days: [
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  daysShort: [
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
}
