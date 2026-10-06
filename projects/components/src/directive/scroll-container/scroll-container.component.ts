import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollContainerDirective } from './scroll-container.directive';

/** A native scroll container with overlay scrollbars and no content wrapper. */
@Component({
  selector: 'teta-scroll-container',
  template: '<ng-content />',
  hostDirectives: [{ directive: ScrollContainerDirective, inputs: ['showScrollbars'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainerComponent {}
