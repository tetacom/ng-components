import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** Internal decoration, shared by the component and existing scroll viewports. */
@Component({
  selector: 'teta-scroll-bars',
  template: `
    <div class="teta-scroll-track teta-scroll-track-y"><div class="teta-scroll-thumb"></div></div>
    <div class="teta-scroll-track teta-scroll-track-x"><div class="teta-scroll-thumb"></div></div>
  `,
  host: { 'aria-hidden': 'true', class: 'teta-scroll-bars' },
  styleUrl: './scroll-container.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBarsComponent {}
