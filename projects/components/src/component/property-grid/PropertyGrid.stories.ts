import { Meta } from '@storybook/angular';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { provideTranslocoScope } from '@jsverse/transloco';
import { PropertyGridDemoComponent } from './property-grid-demo/property-grid-demo/property-grid-demo.component';

export default {
  title: 'Component/PropertyGrid',
  moduleMetadata: {
    imports: [PropertyGridDemoComponent],
    providers: [provideTranslocoScope('errors')],
  },
} as Meta;

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, PropertyGridDemoComponent],
    entryComponents: [],
    providers: [provideTranslocoScope('errors')],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid-demo></teta-property-grid-demo>
            </div>`,
});
