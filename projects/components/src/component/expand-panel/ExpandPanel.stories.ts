import { withKnobs } from '@storybook/addon-knobs';
import { ExpandPanelComponent } from './expand-panel/expand-panel.component';
import { ExpandPanelModule } from './expand-panel.module';
import { Meta } from '@storybook/angular';

export default {
  title: 'Component/Expand Panel',
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
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="column bg-global-bgcard font-body-3 padding-3" style="width: fit-content;height: 500px">
    <teta-expand-panel  class="column" [placeholder]="'Фильтр'" >
    <ng-template tetaExpandPanelHead >Панель</ng-template>
    <ng-template tetaExpandPanelContent >Содержимое</ng-template>
</teta-expand-panel>
  </div>`,
});
