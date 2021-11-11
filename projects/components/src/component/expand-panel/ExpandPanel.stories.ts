import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { ExpandPanelComponent } from './expand-panel/expand-panel.component';
import { ExpandPanelModule } from './expand-panel.module';

export default {
  title: 'Component/File',
  decorators: [withKnobs],
  component: ExpandPanelComponent,
  moduleMetadata: {
    imports: [ExpandPanelModule],
  },
} as Meta;

export const panel = () => ({
  moduleMetadata: {
    imports: [ExpandPanelModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3">
    <teta-expand-panel></teta-expand-panel>
  </div>`,
});
