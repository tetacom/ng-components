import { AccordionComponent } from './accordion/accordion.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionHeadComponent } from './accordion-head/accordion-head.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Accordion',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  argTypes: {
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: { type: 'select' },
    },
    showToggle: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  args: {
    viewType: 'circle',
    showToggle: true,
  },
  component: AccordionComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const basicAccordion = (args) => ({
  moduleMetadata: {
    imports: [
      AccordionComponent,
      AccordionContentDirective,
      AccordionItemComponent,
      AccordionHeadComponent,
      IconSpriteDirective,
    ],
  },
  props: args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-global-bgcard">
         <h1 style="margin-bottom: 0.5em">Аккордион</h1>
        <teta-accordion>
             <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head [showToggle]="showToggle">Heading 1</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head [showToggle]="showToggle">Heading 2</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head [showToggle]="showToggle">Heading 3</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
        </teta-accordion>
    </div>`,
});
export const disabledAccordion = (args) => ({
  moduleMetadata: {
    imports: [
      AccordionComponent,
      AccordionContentDirective,
      AccordionItemComponent,
      AccordionHeadComponent,
      IconSpriteDirective,
    ],
  },
  props: args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-global-bgcard">
        <h1 style="margin-bottom: 0.5em">Аккордион</h1>
       <teta-accordion>
             <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head>Heading 1</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType" [disabled]="true">
              <teta-accordion-head>Heading 2</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head>Heading 3</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="padding-v-3 padding-h-2">I am the content 1</div>
              </ng-template>
            </teta-accordion-item>
        </teta-accordion>
    </div>`,
});
