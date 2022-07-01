import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';

import {map, Observable} from "rxjs";
import {ScaleService} from "../../service/scale.service";

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XAxisComponent implements OnInit {
  x: Observable<any>;

  @Input() axis: Axis;
  @Input() size: DOMRect;

  private _alive = true;

  constructor(private scaleService: ScaleService) {
    this.x = this.scaleService.xMap.pipe(map((_) => {
      return _.get(this.axis.index)?.scale
    }))
  }

  getLabelTransform() {
    return `translate(${
      this.size.width / 2
    }, ${this.axis.options.opposite ? -32 : 32})`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }

}
