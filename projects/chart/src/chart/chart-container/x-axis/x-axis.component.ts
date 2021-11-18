import {Component, Input, OnInit} from '@angular/core';
import {Axis} from '../../model/axis';

@Component({
  selector: 'g teta-x-axis',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss']
})
export class XAxisComponent implements OnInit {
  @Input() axis: Axis;

  constructor() {
  }

  ngOnInit(): void {
  }

}
