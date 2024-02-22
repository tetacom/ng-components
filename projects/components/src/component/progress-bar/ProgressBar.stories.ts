// eslint-disable-next-line id-blacklist
import { FormsModule } from '@angular/forms';
import {Meta} from "@storybook/angular";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";

export default {
  title: 'Component/ProgressBar',
  moduleMetadata: {
    imports: [FormsModule],
  },
  argTypes:{
    step:{
      control:{type:'number'}
    },
   min:{
      control:{type:'number'}
    },
    max:{
      control:{type:'number'}
    },
    value:{
      control:{type:'number'}
    }
  },
  args:{
    min:0,
    max:100,
    value:50,
    step:0
  },
} as Meta;

export const sample = (args) => ({
  moduleMetadata: {
    imports: [FormsModule,ProgressBarComponent],
    entryComponents: [],
  },
  props: args,
  template: `<div class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-progress-bar [min]="min" [max]="max" [step]="step" [(ngModel)]="value"></teta-progress-bar>
            </div>`,
});
