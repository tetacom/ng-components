import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit,} from '@angular/core';
import {filter, map, merge, Observable, takeWhile, tap} from 'rxjs';
import {ChartService} from '../../service/chart.service';
import {ZoomService} from '../../service/zoom.service';
import {IDisplayTooltip} from '../../model/i-display-tooltip';
import {DomSanitizer} from '@angular/platform-browser';
import {IChartConfig} from '../../model/i-chart-config';

@Component({
  selector: 'teta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() size: DOMRect;
  @Input() config: IChartConfig;

  position: Observable<{
    left: string;
    top: string;
    bottom: string;
    right: string;
  }>;

  displayTooltips: Observable<string>;

  tooltips = [];

  private alive = true;

  display: Observable<number>;

  constructor(
    private svc: ChartService,
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService,
    private sanitizer: DomSanitizer,
    private _zone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.display = merge(this.svc.pointerMove, this.zoomService.zoomed).pipe(
      map(({event}) => {
        return event?.type === 'mousemove' ? 1 : 0;
      }),
      tap(() => {
        this._zone.runOutsideAngular(() => {
          requestAnimationFrame(() => {
            this.cdr.detectChanges();
          });
        });
      })
    );

    this.position = this.svc.pointerMove.pipe(
      filter((event) => !!event),
      map((_) => {
        return this.getPoisition(_);
      }),
      tap((_) => this.cdr.detectChanges())
    );

    const transformHtml = (html) => {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    };

    const defaultFormatter = (tooltips: IDisplayTooltip[]) => {
      let html = '';

      tooltips.forEach((_) => {
        const indicatorStyle = `display:block; width: 10px; height: 2px; background-color: ${_?.series?.color}`;

        html += `<div class="display-flex align-center"><span class="margin-right-1" style="${indicatorStyle}"></span>
          <span class="font-title-3">${_.series.name}
          <span class="font-body-3">x: ${_.point.x?.toFixed(
          2
        )} y: ${_.point.y?.toFixed(2)}</span></span></div>`;
      });

      return transformHtml(html);
    };

    const formatter = this.config?.tooltip?.format;

    this.displayTooltips = merge(
      this.svc.pointerMove.pipe(tap((_) => (this.tooltips = []))),
      this.svc.tooltips
    ).pipe(
      takeWhile((_) => this.alive),
      filter((_) => !_['event']),
      map((tooltip: any) => {
        if (tooltip) {
          this.tooltips.push(tooltip);
        }

        const formatted = formatter
          ? formatter(this.tooltips)
          : defaultFormatter(this.tooltips);

        return formatted;
      })
    );
  }

  private getPoisition({event}: any) {
    const centerX = this.size.width / 2;
    const centerY = this.size.height / 2;

    const padding = {x: 10, y: 10};

    const scene = {
      left: event.pageX > centerX ? 'initial' : `${event.pageX + padding.x}px`,
      top: event.pageY > centerY ? 'initial' : `${event.pageY + padding.y}px`,
      bottom:
        event.pageY > centerY
          ? `${window.innerHeight - event.pageY}px`
          : 'initial',
      right:
        event.pageX > centerX
          ? `${window.innerWidth - event.pageX + padding.x}px`
          : 'initial',
    };

    return scene;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
