import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, map, merge, Observable, takeWhile, tap } from 'rxjs';
import { ChartService } from '../../service/chart.service';
import { ZoomService } from '../../service/zoom.service';
import { IChartEvent } from '../../model/i-chart-event';

@Component({
  selector: 'teta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() size: DOMRect;

  position: Observable<{
    left: string;
    top: string;
    bottom: string;
    right: string;
  }>;

  tooltips = [];

  private alive = true;

  display: Observable<number>;

  constructor(
    private svc: ChartService,
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService
  ) {}

  ngOnInit(): void {
    this.display = merge(this.svc.pointerMove, this.zoomService.zoomed).pipe(
      map(({ event }) => {
        return event?.type === 'mousemove' || event?.type === 'end' ? 1 : 0;
      }),
      tap(() =>
        setTimeout(() => {
          this.cdr.detectChanges();
        })
      )
    );

    this.position = this.svc.pointerMove.pipe(
      filter(({ event }) => event),
      map((_) => {
        return this.getPoisition(_);
      }),
      tap((_) => this.cdr.detectChanges())
    );

    merge(
      this.svc.pointerMove.pipe(tap((_) => (this.tooltips = []))),
      this.svc.tooltips
    )
      .pipe(
        takeWhile((_) => this.alive),
        filter((_) => !_?.event),
        map((tooltip: any) => {
          if (tooltip) {
            this.tooltips.push(tooltip);
          }
          return this.tooltips;
        })
      )
      .subscribe();
  }

  private getPoisition({ event }: IChartEvent) {
    const centerX = this.size.width / 2;
    const centerY = this.size.height / 2;

    const padding = { x: 10, y: 10 };

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
