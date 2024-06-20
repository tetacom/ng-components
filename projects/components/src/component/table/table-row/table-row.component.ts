import {ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, NgForm, UntypedFormControl} from "@angular/forms";
import {TableRow} from "../contract/table-row";

@Component({
  selector: 'teta-table-row',
  standalone: true,
  imports: [],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent<T> implements OnChanges {
  @Input() row: TableRow<T>;

  private _formGroup = inject(ControlContainer, {
    optional: true,
  });

  get control(): FormControl {
    return this.formGroup?.get('id') as FormControl;
  }

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.control) {
      this.formGroup.registerControl(
        'id',
        new UntypedFormControl(
          this.row?.data['id']
        )
      );
    } else {
      this.control.patchValue(this.row?.data['id'], {
        emitEvent: false,
      });
    }
  }
}
