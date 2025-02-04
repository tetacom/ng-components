import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Axis } from '../../core/axis/axis';
import { BehaviorSubject, map } from 'rxjs';
import { ScaleService } from '../../service/scale.service';
import { getTextWidth } from '../../core/utils/get-text-width';
import * as d3 from 'd3';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XAxisComponent {
  private scaleService = inject(ScaleService);

  xScales = toSignal(this.scaleService.scales.pipe(map((_) => _.x)));
  axis = input<Axis>();
  size = input<DOMRect>();

  x = computed(() => {
    return this.xScales().get(this.axis().index)?.scale;
  });
  ticks = computed(() => {
    const tickSize = this.x()
      .ticks()
      .map((_) =>
        getTextWidth(
          this.axis().options.tickFormat ? this.axis().options.tickFormat(_) : this.axis().defaultFormatter()(_),
          0.45,
          11,
        ),
      );
    return this.x().ticks(this.size().width / parseInt(d3.max(tickSize), 10) / 5);
  });

  getLabelTransform = computed(() => {
    return `translate(${this.size().width / 2}, ${this.axis().options.opposite ? -32 : 32})`;
  });
}
