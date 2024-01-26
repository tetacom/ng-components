import { withKnobs } from '@storybook/addon-knobs';
import { AccordionComponent } from './accordion/accordion.component';


import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AccordionModule, IconModule} from "@tetacom/ng-components";
import {AccordionContentDirective} from "./accordion-content.directive";
import {AccordionHeadComponent} from "./accordion-head/accordion-head.component";
import {AccordionItemComponent} from "./accordion-item/accordion-item.component";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Accordion',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: AccordionComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const basicAccordion = () => ({
  moduleMetadata: {
    imports: [AccordionComponent, IconSpriteDirective,AccordionContentDirective,AccordionItemComponent,AccordionHeadComponent],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-global-bgcard">
      <teta-accordion>
        <teta-accordion-item [viewType]="'rounded'">
          <teta-accordion-head >
            Heading 1
          </teta-accordion-head>
          <ng-template tetaAccordionContent>
            <div class="padding-v-3 padding-h-2">I am the content 1</div>
          </ng-template>
        </teta-accordion-item>
        <teta-accordion-item>
          <teta-accordion-head>
            Heading 2 (disabled)
          </teta-accordion-head>
          <ng-template tetaAccordionContent>
            <div class="padding-v-3 padding-h-5">I am the content 2</div>
          </ng-template>
        </teta-accordion-item>
        <teta-accordion-item [viewType]="'brick'">
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
