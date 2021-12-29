import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

import * as d3 from 'd3';
import { Plotband } from '../../model/plotband';
import { ScaleService } from '../../service/scale.service';

import { Axis } from '../../core/axis/axis';
import { ZoomService } from '../../service/zoom.service';

@Component({
  selector: '[teta-plot-band]',
  templateUrl: './plotband.component.html',
  styleUrls: ['./plotband.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotbandComponent implements OnInit, AfterViewInit {
  @Input() plotband: Plotband;
  @Input() axis: Axis;
  @Input() size: DOMRect;

  private scale: any;

  constructor(
    private scaleService: ScaleService,
    private zoomService: ZoomService,
    private cdr: ChangeDetectorRef,
    private element: ElementRef
  ) {
    this.zoomService.zoomed.subscribe(() => {
      this.scale = this.scaleService.xScales.get(this.axis.index);
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.scale = this.scaleService.xScales.get(this.axis.index);
    const plotbandElement = d3
      .select(this.element.nativeElement)
      .select('.plotband');
    const grabElements = d3
      .select(this.element.nativeElement)
      .selectAll('.grabber');

    const drag = d3
      .drag()
      .subject(function () {
        return { x: plotbandElement.attr('x') };
      })
      .on(
        'start drag end',
        (event: d3.D3DragEvent<any, Plotband, any>, d: Plotband) => {
          const width = parseFloat(plotbandElement.attr('width'));
          d.to = this.scale.invert(event.x + width);
          d.from = this.scale.invert(event.x);

          this.cdr.detectChanges();
        }
      );

    let grabberKey;

    const resize = d3
      .drag()
      .on(
        'start drag end',
        (event: d3.D3DragEvent<any, Plotband, any>, d: Plotband) => {
          if (event?.type === 'start') {
            const { grabber } = event?.sourceEvent?.target?.dataset;
            grabberKey = grabber;
          }

          d[grabberKey] = this.scale.invert(event.x);

          this.cdr.detectChanges();
        }
      );

    plotbandElement.datum<Plotband>(this.plotband);
    grabElements.datum<Plotband>(this.plotband);

    if (this.plotband.draggable) {
      plotbandElement.call(drag);
    }

    if (this.plotband.resizable) {
      grabElements.call(resize);
    }
  }

  get width(): number {
    return Math.abs(
      this.scale(this.plotband.to) - this.scale(this.plotband.from)
    );
  }

  get height(): number {
    return this.size.height;
  }

  get from(): number {
    return this.scale(this.plotband.from);
  }

  get to(): number {
    return this.scale(this.plotband.to);
  }

  getFill(d: Plotband): string {
    if (d.style?.plotband?.patternImage) {
      return `url(#${d.style.plotband?.patternImage})`;
    }
    return d.style.plotband?.fill;
  }
}
