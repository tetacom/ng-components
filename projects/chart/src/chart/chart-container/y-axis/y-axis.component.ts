import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Axis } from '../../core/axis/axis';

import { ScaleService } from '../../service/scale.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: '[teta-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YAxisComponent {
  private scaleService = inject(ScaleService);
  yScales = toSignal(this.scaleService.scales.pipe(map((_) => _.y)));
  axis = input<Axis>();
  size = input<DOMRect>();

  y = computed(() => {
    return this.yScales().get(this.axis().index)?.scale;
  });

  getLabelTransform = computed(() => {
    return `translate(${this.axis().options.opposite ? this.axis().selfSize : -this.axis().selfSize}, ${
      this.size().height / 2
    }) rotate(-90)`;
  });
}
