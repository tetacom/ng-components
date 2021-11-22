import { Component, Input, OnInit } from '@angular/core';
import { AxisOptions } from '../../model/axis-options';

@Component({
  selector: 'g teta-x-axis',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
})
export class XAxisComponent implements OnInit {
  @Input() axis: AxisOptions;

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }
}
