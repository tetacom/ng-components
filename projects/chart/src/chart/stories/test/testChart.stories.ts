import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective, ButtonComponent } from '@tetacom/ng-components';
import { TestChartComponent } from './test-chart.component';

export default {
  title: 'Component/Chart',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: TestChartComponent,
  moduleMetadata: {
    imports: [TestChartComponent],
  },
} as Meta;

export const testChart = () => ({
  moduleMetadata: {
    imports: [TestChartComponent, IconSpriteDirective, ButtonComponent],
  },

  props: {},
  template: `

      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-global-bgmain"
            style="width: 100%; height: 100vh">
        <teta-test-chart></teta-test-chart>

      </div>

`,
});
