import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import {filter, map, Observable, tap} from 'rxjs';
import {ChartService} from '../../service/chart.service';
import {ZoomService} from '../../service/zoom.service';
import {IDisplayTooltip} from '../../model/i-display-tooltip';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {IChartConfig} from '../../model/i-chart-config';
import {Series} from '../../model/series';
import * as d3 from 'd3';
@Component({
  selector: 'teta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
  @Input() size: DOMRect;
  @Input() config: IChartConfig;

  position: Observable<{
    left: string;
    top: string;
    bottom: string;
    right: string;
  }>;

  displayTooltips: Observable<SafeHtml>;
  display: Observable<number>;
  tooltips: Observable<IDisplayTooltip[]>

  constructor(
    private svc: ChartService,
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService,
    private sanitizer: DomSanitizer,
    private _zone: NgZone
  ) {
    this.tooltips = this.svc.tooltips.pipe(map((_) => [..._.values()]))
  }

  ngOnInit(): void {
    this.display = this.svc.pointerMove.pipe(
      map((event: PointerEvent) => {
        return event.type === 'mousemove' ? 1 : 0;
      }),
      tap(() => {
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      })
    );

    this.position = this.svc.pointerMove.pipe(
      filter((event) => !!event),
      map((_) => {
        return this.getPosition(_);
      }),
      tap(() => this.cdr.detectChanges())
    );

    const transformHtml = (html): SafeHtml => {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    };

    const defaultFormatter = (tooltips: IDisplayTooltip[]): SafeHtml => {
      let html = '';
      const format = d3.timeFormat('%d.%m.%Y');
      tooltips.forEach((_) => {
        const indicatorStyle = `display:block; width: 10px; height: 2px; background-color: ${_?.series?.color}`;

        html += `<div class="display-flex align-center"><span class="margin-right-1" style="${indicatorStyle}"></span>
          <span class="font-title-3">${_.series.name}
            <span class="font-body-3">
              x: ${(_.point.x as any) instanceof Date ? format(_.point.x as any) :  _.point.x?.toFixed(2)}
              y: ${(_.point.y as any) instanceof Date ? format(_.point.y as any) :  _.point.y?.toFixed(2)}
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
        const formatted = formatter
          ? transformHtml(formatter(tooltipList))
          : defaultFormatter(tooltipList);
        return formatted;
      })
    );
  }

  private getPosition(event: PointerEvent) {
    const centerX = this.size.width / 2;
    const centerY = this.size.height / 2;

    const padding = this.config?.tooltip?.padding;

    const scene = {
      left: event.pageX > centerX ? 'initial' : `${event.pageX + padding.x}px`,
      top: event.pageY > centerY ? 'initial' : `${event.pageY + padding.y}px`,
      bottom:
        event.pageY > centerY
          ? `${window.innerHeight - event.pageY + padding.y}px`
          : 'initial',
      right:
        event.pageX > centerX
          ? `${window.innerWidth - event.pageX + padding.x}px`
          : 'initial',
    };

    return scene;
  }


  format(input: number | Date): string {

    if(input instanceof Date) {
      const format = d3.timeFormat('%d.%m.%Y');
      return format(input);
    }

    const format = d3.format(',.5~r')
    return format(input)
  }
}
