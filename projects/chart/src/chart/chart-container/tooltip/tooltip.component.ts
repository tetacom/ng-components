import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  bufferCount,
  debounce,
  debounceTime,
  filter,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';
import { ChartService } from '../../chart.service';
import { IPointer } from '../../model/i-pointer';

@Component({
  selector: 'teta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() size: DOMRect;

  position: Observable<{
    left: string;
    top: string;
    bottom: string;
    right: string;
  }>;

  constructor(private svc: ChartService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.position = this.svc.pointerMove.pipe(
      filter(({ event }) => event),
      map((_) => {
        return this.getPoisition(_);
      }),
      tap((_) => this.cdr.detectChanges())
    );

    this.svc.tooltips
      .pipe(
        map((_) => {
          console.log(_);
        })
      )
      .subscribe();
  }

  private getPoisition({ event }: IPointer) {
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
}
