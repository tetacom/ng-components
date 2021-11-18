import {Component, Input, OnInit} from '@angular/core';
import {Axis} from '../../model/axis';

@Component({
  selector: 'g teta-y-axis',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss']
})
export class YAxisComponent implements OnInit {
  @Input() axis: Axis;

  constructor() {
  }

  ngOnInit(): void {
  }

}
