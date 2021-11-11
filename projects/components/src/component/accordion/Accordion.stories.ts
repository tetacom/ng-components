import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {AccordionComponent} from './accordion/accordion.component';
import {AccordionModule} from './accordion.module';
import {IconModule} from '../icon/icon.module';

export default {
  title: 'Component/Accordion',
  decorators: [withKnobs],
  component: AccordionComponent,
  moduleMetadata: {
    imports: [AccordionModule]
  }
} as Meta;

export const basicAccordion = () => ({
  moduleMetadata: {
    imports: [AccordionModule, IconModule]
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-panel-50">
      <teta-accordion class="bg-white-50">
        <teta-accordion-item>
          <teta-accordion-head>
            Heading 1
          </teta-accordion-head>
          <ng-template tetaAccordionContent>
            <div class="padding-v-3 padding-h-5">I am the content 1</div>
          </ng-template>
        </teta-accordion-item>
        <teta-accordion-item [disabled]="true">
          <teta-accordion-head>
            Heading 2 (disabled)
          </teta-accordion-head>
          <ng-template tetaAccordionContent>
            <div class="padding-v-3 padding-h-5">I am the content 2</div>
          </ng-template>
        </teta-accordion-item>
        <teta-accordion-item>
          <teta-accordion-head>
            Heading 3
          </teta-accordion-head>
          <ng-template tetaAccordionContent>
            <div class="padding-v-3 padding-h-5">I am the content 3</div>
          </ng-template>
        </teta-accordion-item>
      </teta-accordion>
    </div>`,
});

