import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: '[teta-gridlines]',
  templateUrl: './gridlines.component.html',
  styleUrls: ['./gridlines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridlinesComponent {
  @Input() size: DOMRect;
  @Input() xScaleMap: Map<number, any>;
  @Input() yScaleMap: Map<number, any>;

  tickYValues: number[];
  tickXValues: number[];

  constructor() {
  }

  draw() {
    this.tickYValues = this.yScaleMap.get(0).ticks();
    this.tickXValues = this.xScaleMap.get(0).ticks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.hasOwnProperty('xScaleMap') &&
      changes.hasOwnProperty('yScaleMap')
    ) {
      this.draw();
    }
  }
}
