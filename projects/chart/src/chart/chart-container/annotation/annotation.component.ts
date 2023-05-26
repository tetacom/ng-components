import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input, OnDestroy,
  ViewChild,
} from '@angular/core';
import {Annotation} from '../../model/annotation';
import * as d3 from 'd3';
import {lastValueFrom, map, Observable, take} from 'rxjs';
import {ScaleService} from '../../service/scale.service';
import {ChartService} from '../../service/chart.service';

@Component({
  selector: '[teta-annotation]',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationComponent implements OnDestroy {
  @Input() visibleRect: DOMRect;

  @Input() set annotation(annotation: Annotation) {
    this._annotation = annotation;
  }

  get annotation(): Annotation {
    return this._annotation;
  }

  @ViewChild('annotationNode', {static: false})
  set node(node: ElementRef) {
    this._node = node;
    this.init();
    this.cdr.detectChanges();
  }

  get node() {
    return this._node;
  }

  x: Observable<any>;
  y: Observable<any>;

  private drag: d3.DragBehavior<any, any, any>;
  private _annotation: Annotation;
  private _node: ElementRef;

  constructor(
    private scaleService: ScaleService,
    private cdr: ChangeDetectorRef,
    private chartService: ChartService) {
    this.x = this.scaleService.scales.pipe(map((_) => _.x.get(this.annotation.xAxisIndex ?? 0)?.scale));
    this.y = this.scaleService.scales.pipe(map((_) => _.y.get(this.annotation.yAxisIndex ?? 0)?.scale));
    this.drag = d3.drag();
  }

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    this.chartService.emitAnnotation({
      event,
      target: this.annotation
    });
  }

  @HostListener('contextmenu', ['$event']) contextMenu(event: MouseEvent) {
    this.chartService.emitAnnotation({
      event,
      target: this.annotation
    });
  }


  ngOnDestroy() {
    this.drag.on('drag end', null);
  }

  private init() {

    d3.select(this.node.nativeElement).datum(this.annotation);

    const offsetPx = 10;
    const nodeRect = this.node.nativeElement.getBoundingClientRect();

    if (this.annotation.draggable) {
      this.drag.on('drag end', async (event, d: Annotation) => {

        const x = await lastValueFrom(this.x.pipe(take(1)));
        const y = await lastValueFrom(this.y.pipe(take(1)));

        d.dx += event.dx;
        d.dy += event.dy;

        // x constraint
        if ((d.dx + x(d.point.x) - offsetPx) <= 0) {
          d.dx = -x(d.point.x) + offsetPx;
        }

        if (d.dx + x(d.point.x) + nodeRect.width - offsetPx >= this.visibleRect.width) {
          d.dx = this.visibleRect.width - x(d.point.x) - nodeRect.width + offsetPx;
        }

        // y constraint
        if ((d.dy + y(d.point.y) - offsetPx) <= 0) {
          d.dy = -y(d.point.y) + offsetPx;
        }

        if (d.dy + y(d.point.y) + nodeRect.height - offsetPx >= this.visibleRect.height) {
          d.dy = Math.abs(y(d.point.y) - this.visibleRect.height) - nodeRect.height +offsetPx;
        }

        this.cdr.detectChanges();
        this.chartService.emitMoveAnnotation({
          event,
          target: d
        });
      });

      d3.select(this.node.nativeElement).call(this.drag);
    }
  }
}
