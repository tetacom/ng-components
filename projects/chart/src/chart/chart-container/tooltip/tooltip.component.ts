import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as d3 from 'd3';
import { map, Observable } from 'rxjs';

import { IChartConfig } from '../../model/i-chart-config';
import { IDisplayTooltip } from '../../model/i-display-tooltip';
import { Series } from '../../model/series';
import { ChartService } from '../../service/chart.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { PositionUtil } from '../../core/utils/position-util';
import { Align } from '../../model/enum/align.enum';
import { VerticalAlign } from '../../model/enum/vertical-align.enum';

@Component({
  selector: 'teta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgTemplateOutlet],
})
export class TooltipComponent implements OnInit {
  private svc = inject(ChartService);
  private sanitizer = inject(DomSanitizer);

  @Input() size: DOMRect;
  @Input() config: IChartConfig;

  @ViewChild('tooltip', { static: false, read: ElementRef })
  tooltip: ElementRef;

  private pointerMove = toSignal(this.svc.pointerMove);
  display = computed(() => (this.pointerMove()?.type === 'mousemove' ? 1 : 0));

  position = computed(() => {
    const event = this.pointerMove();
    if (!this.display() || !event) {
      return null;
    }
    return this.getPosition(event);
  });

  displayTooltips: Observable<SafeHtml>;

  tooltips: Observable<IDisplayTooltip[]>;

  constructor() {
    this.tooltips = this.svc.tooltips.pipe(map((_) => [..._.values()]));
  }
  getImplicit(t) {
    return { $implicit: t } as any;
  }
  ngOnInit(): void {
    const transformHtml = (html): SafeHtml => {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    };

    const defaultFormatter = (tooltips: IDisplayTooltip[]): SafeHtml => {
      let html = '';
      const format = d3.timeFormat('%d.%m.%Y');
      tooltips.forEach((_) => {
        const indicatorStyle = `display:block; width: 10px; height: 2px; background-color: ${_?.series?.color}`;

        html += `<div class='display-flex align-center'><span class='margin-right-1' style='${indicatorStyle}'></span>
          <span class='font-title-3'>${_.series.name}
            <span class='font-body-3'>
              x: ${(_.point.x as any) instanceof Date ? format(_.point.x as any) : _.point.x?.toFixed(2)}
              y: ${(_.point.y as any) instanceof Date ? format(_.point.y as any) : _.point.y?.toFixed(2)}
            </span>
          </span></div>`;
      });

      return transformHtml(html);
    };

    const formatter = this.config?.tooltip?.format;

    this.displayTooltips = this.svc.tooltips.pipe(
      map((tooltips: Map<Series<any>, IDisplayTooltip>) => {
        const tooltipList = [...tooltips.values()];
        if (tooltipList?.length < 1) {
          return '';
        }
        return formatter ? transformHtml(formatter(tooltipList)) : defaultFormatter(tooltipList);
      }),
    );
  }

  private getPosition(event: PointerEvent) {
    if (!this.tooltip) {
      return null;
    }
    return PositionUtil.getPosition(
      {
        top: event.pageY,
        bottom: event.pageY,
        left: event.pageX,
        right: event.pageX,
      },
      this.tooltip?.nativeElement?.getBoundingClientRect(),
      Align.auto,
      VerticalAlign.top,
      12,
    );
  }

  format(input: number | Date): string {
    if (input instanceof Date) {
      const format = d3.timeFormat('%d.%m.%Y');
      return format(input);
    }

    const format = d3.format(',.5~r');
    return format(input);
  }
}
