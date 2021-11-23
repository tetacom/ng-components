import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Axis} from '../../core/axis';
import {ScaleService} from '../../scale.service';
import {ChartService} from '../../chart.service';
import {takeWhile, tap} from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
})
export class XAxisComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() axis: Axis;
  @ViewChild('svg') node: ElementRef;

  private _alive = true;

  constructor(
    private scaleService: ScaleService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {
    this.chartService.size
      .pipe(
        takeWhile(() => this._alive),
        tap(() => {
          this.drawAxis();
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngAfterViewInit() {
    this.drawAxis();
  }

  private drawAxis() {
    const scale = this.scaleService.xScales.get(this.axis.index);

    const axis = this.axis.options.opposite
      ? d3.axisTop(scale)
      : d3.axisBottom(scale);

    d3.select(this.node.nativeElement)
      .call(axis);
  }
}
