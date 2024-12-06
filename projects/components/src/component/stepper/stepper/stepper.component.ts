import { Component, computed, input, Signal } from '@angular/core';
import { IIdName } from '../../../common/contract/i-id-name';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  steps = input.required<IIdName<number>[]>();
  currentStepId = input.required<number>();
  currentIndex: Signal<number> = computed(
    () => this.steps().findIndex((step) => step.id === this.currentStepId()) ?? 0,
  );
}
