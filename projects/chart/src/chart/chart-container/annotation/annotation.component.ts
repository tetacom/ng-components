import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input, OnDestroy,
  ViewChild,
} from '@angular/core';
import {Annotation} from '../../model/annotation';
import * as d3 from 'd3';
import {map, Observable} from 'rxjs';
import {ScaleService} from '../../service/scale.service';
import {ChartService} from '../../service/chart.service';

@Component({
  selector: '[teta-annotation]',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationComponent implements OnDestroy {
  @Input() set annotation(annotation: Annotation) {

    this._annotation = annotation
  }

  get annotation(): Annotation {
    return this._annotation;
  }

  @ViewChild('annotationNode', {static: false})
  set node(node: ElementRef) {
    this._node = node;
    this.bBox = node.nativeElement.getBoundingClientRect();
    this.init();
    this.cdr.detectChanges();
  }

  get node() {
    return this._node;
  }

  x: Observable<any>;
  y: Observable<any>;
  bBox: DOMRect;

  private drag: d3.DragBehavior<any, any, any>;
  private _annotation: Annotation;
  private _node: ElementRef;

  constructor(
    private scaleService: ScaleService,
    private cdr: ChangeDetectorRef,
    private chartService: ChartService) {
    this.x = this.scaleService.xScaleMap.pipe(map((_) => _.get(this.annotation.xAxisIndex ?? 0)));
    this.y = this.scaleService.yScaleMap.pipe(map((_) => _.get(this.annotation.yAxisIndex ?? 0)));
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
    if (this.annotation.draggable) {
      this.drag.on('drag end', (event, d: Annotation) => {
        d.dx += event.dx;
        d.dy += event.dy;
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
