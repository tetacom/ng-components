import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionHeadComponent,
  AccordionItemComponent,
  InputComponent,
  OnlyNumberDirective,
  ScrollContainerComponent,
} from '@tetacom/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartService } from '../../../service/chart.service';
import { AxisOrientation } from '../../../model/enum/axis-orientation';
import { IScalesMap } from '../../../model/i-scales-map';

@Component({
  selector: 'teta-axis-controls',
  imports: [
    AccordionComponent,
    AccordionContentDirective,
    AccordionHeadComponent,
    AccordionItemComponent,
    InputComponent,
    ReactiveFormsModule,
    ScrollContainerComponent,
    OnlyNumberDirective,
    FormsModule,
  ],
  templateUrl: './axis-controls.html',
  styleUrl: './axis-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AxisControls {
  private chartService = inject(ChartService);

  scales = input<IScalesMap>();

  setAxisBound(orientation: AxisOrientation, index: number, bound: 'min' | 'max', value: string | number) {
    value = Number(value);
    if (value !== undefined && !Number.isFinite(value)) {
      return;
    }
    this.chartService.updateAxisBound(orientation, index, bound, value);
  }

  protected readonly AxisOrientation = AxisOrientation;
}
