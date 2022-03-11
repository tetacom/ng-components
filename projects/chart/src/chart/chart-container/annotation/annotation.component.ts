import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input, NgZone,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {Annotation} from '../../model/annotation';
import * as d3annotation from 'd3-svg-annotation';
import * as d3 from 'd3';
import {bufferCount, last, map, Observable, Subject} from "rxjs";
import {ScaleService} from "../../service/scale.service";
import {ChartService} from "../../service/chart.service";
import {throttleTime} from "rxjs/operators";

@Component({
  selector: '[teta-annotation]',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationComponent implements OnInit, OnDestroy {
  @Input() set annotation(annotation: Annotation) {
    this._annotation = Object.assign({}, this.defaultAnnotationConfig, annotation);
  }

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    this.chartService.emitAnnotation({
      event,
      target: this.annotation
    })
  }

  @HostListener('contextmenu', ['$event']) contextMenu(event: MouseEvent) {

    this.chartService.emitAnnotation({
      event,
      target: this.annotation
    })
  }

  get annotation(): Annotation {
    return this._annotation;
  }

  x: Observable<any>;
  y: Observable<any>;
  bBox: Observable<DOMRect>;

  private drag: d3.DragBehavior<any, any, any>;
  private _annotation: Annotation;
  private contentCheckedEvent$ = new Subject();


  private defaultAnnotationConfig  = {
    dx: this.annotation?.dx ?? 0,
    dy: this.annotation?.dy ?? 0
  }

  @ViewChild('annotationNode', {static: false}) node: ElementRef;

  constructor(
      private zone: NgZone,
      private scaleService: ScaleService,
      private cdr: ChangeDetectorRef,
      private chartService: ChartService) {
    this.x = this.scaleService.xScaleMap.pipe(map((_) => _.get(this.annotation.xAxisIndex ?? 0)));
    this.y = this.scaleService.yScaleMap.pipe(map((_) => _.get(this.annotation.yAxisIndex ?? 0)));
    this.drag = d3.drag()
  }

  ngOnInit(): void {

    this.bBox = this.contentCheckedEvent$.asObservable().pipe(
      throttleTime(300, undefined, {trailing: true}),

      map((_) => {
        console.log('get client rect')
        return this.node.nativeElement.getBoundingClientRect()
      })
    )

  }

  ngOnDestroy() {}

  ngAfterContentChecked() {
    this.contentCheckedEvent$.next(null);
  }
  ngAfterViewInit() {

    d3.select(this.node.nativeElement).datum(this.annotation);


    if(this.annotation.draggable) {
      this.drag.on('drag end', null);
      this.drag.on('drag end', (event, d: Annotation) => {
        d.dx += event.dx;
        d.dy += event.dy;

        this.cdr.detectChanges();

        this.chartService.emitMoveAnnotation({
          event,
          target: d
        })
      })

      d3.select(this.node.nativeElement).call(this.drag);
    }
  }
}
