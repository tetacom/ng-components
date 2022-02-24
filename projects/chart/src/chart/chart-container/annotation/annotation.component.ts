import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Annotation } from '../../model/annotation';
import * as d3annotation from 'd3-svg-annotation';
import * as d3 from 'd3';

@Component({
  selector: '[teta-annotation]',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  @Input() annotations: Annotation[];
  @Input() xScaleMap: Map<number, any>;
  @Input() yScaleMap: Map<number, any>;

  @ViewChild('svg') node: ElementRef;

  private _node: any;
  private _makeAnnotations: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._node = d3.select(this.node.nativeElement);
    this.drawAnnotations();
  }

  drawAnnotations() {
    if (!this.node) return;

    const annotations = this.annotations?.map((annotation) => {
      const x = this.xScaleMap.get(annotation.xAxisIndex);
      const y = this.yScaleMap.get(annotation.yAxisIndex);

      return {
        note: annotation.note,
        connector: annotation.connector,
        x: x(annotation.point?.x),
        y: y(annotation.point?.y),
        dx: annotation.dx,
        dy: annotation.dy,
        type: annotation.type ?? d3annotation.annotationLabel,
        className: annotation.className,
      };
    });

    this._makeAnnotations = d3annotation
      .annotation()
      .annotations(annotations ?? [])
      .editMode(false);

    this._node.call(this._makeAnnotations as any);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.hasOwnProperty('xScaleMap') &&
      changes.hasOwnProperty('yScaleMap')
    ) {
      this.drawAnnotations();
    }
  }
}
