import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ScaleService} from "../../service/scale.service";
import {map, Observable, tap} from "rxjs";
import {ChartService} from "../../service/chart.service";

@Component({
  selector: '[teta-crosshair]',
  templateUrl: './crosshair.component.html',
  styleUrls: ['./crosshair.component.scss']
})
export class CrosshairComponent implements OnInit {

  @Input() size: DOMRect;
  transform: Observable<any>;

  constructor(private scaleService: ScaleService, private chartService: ChartService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.transform = this.chartService.pointerMove.pipe(
      map((event: PointerEvent) => {
        const composedPath = event.composedPath() as HTMLElement[];
        const classes = composedPath.map((_) => _.classList?.contains('crosshair')).filter((_) => _)
        console.log(classes)


        return {
          x: event.type === 'mouseleave' ? -9999 : event.offsetX,
          y: event.type === 'mouseleave' ? -9999 : event.offsetY
        }
      }),
      tap(() => {
        setTimeout(() => {
          this.cdr.detectChanges();
        })

      })
    )

  }

}
