import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'teta-alert-sample',
  templateUrl: './alert-sample.component.html',
  styleUrls: ['./alert-sample.component.scss'],
})
export class AlertSampleComponent implements OnInit {
  constructor(private _dialog: DialogService) {}

  alert() {
    this._dialog.alert('Some alert text');
  }

  dialog() {
    this._dialog.confirm('Some alert text').subscribe((_) => {
      alert(_.toString());
    });
  }

  dialog2() {
    this._dialog
      .confirm('Some alert text', 'Edit', 'edit', 'red')
      .subscribe((_) => {
        alert(_.toString());
      });
  }

  ngOnInit(): void {}
}
