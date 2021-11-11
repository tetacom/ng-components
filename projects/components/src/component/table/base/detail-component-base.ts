import {TableRow} from '../contract/table-row';
import {TableColumn} from '../contract/table-column';

export abstract class DetailComponentBase<T> {
  /**
   * The row details are displayed for
   */
  abstract row: TableRow<T>;
  /**
   * displayed columns
   */
  abstract columns: TableColumn[];
}
