// eslint-disable-next-line id-blacklist
import { number, withKnobs } from '@storybook/addon-knobs';

import { FormsModule } from '@angular/forms';
import {Meta} from "@storybook/angular";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";

export default {
  title: 'Component/ProgressBar',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [FormsModule],
  },
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [FormsModule,ProgressBarComponent],
    entryComponents: [],
  },
  props: {
    min: number('min', 0),
    max: number('max', 100),
    value: number('value', 50),
    step: number('step', 0),
  },
  template: `<div class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-progress-bar [min]="min" [max]="max" [step]="step" [(ngModel)]="value"></teta-progress-bar>
            </div>`,
});
