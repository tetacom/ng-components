import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';

import {ScaleService} from "../../service/scale.service";
import {map, Observable} from "rxjs";

@Component({
  selector: '[teta-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YAxisComponent implements OnInit, AfterViewInit {

  y: Observable<any>;

  @Input() axis: Axis;
  @Input() size: DOMRect;

  private _alive = true;

  constructor(private scaleService: ScaleService) {
    this.y = this.scaleService.yScaleMap.pipe(map((_) => {
      return _.get(this.axis.index)
    }))
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngAfterViewInit() {
  }

  getLabelTransform() {
    return `translate(${
      this.axis.options.opposite
        ? this.axis.selfSize - 24
        : -this.axis.selfSize + 24
    }, ${this.size.height / 2}) rotate(${
      this.axis.options.opposite ? '90' : '-90'
    })`;
  }

}
