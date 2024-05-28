import { AccordionComponent } from './accordion/accordion.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionHeadComponent } from './accordion-head/accordion-head.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { IconComponent } from '../icon/icon/icon.component';

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
    divider: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  args: {
    viewType: 'rounded',
    showToggle: true,
    divider: false,
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
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3 bg-global-bgcard">
         <h1 style="margin-bottom: 0.5em">Аккордион</h1>
        <teta-accordion>
             <teta-accordion-item [viewType]="viewType" [divider]="divider">
              <teta-accordion-head [showToggle]="showToggle">Heading 1</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 1</p>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType" [divider]="divider">
              <teta-accordion-head [showToggle]="showToggle">Heading 2</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 2</p>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head [showToggle]="showToggle">Heading 3</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 3</p>
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
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3 bg-global-bgcard">
        <h1 style="margin-bottom: 0.5em">Аккордион</h1>
       <teta-accordion>
             <teta-accordion-item [viewType]="viewType" [divider]="divider">
              <teta-accordion-head>Heading 1</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 1</p>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType" [divider]="divider" [disabled]="true">
              <teta-accordion-head>Heading 2</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 2</p>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head>Heading 3</teta-accordion-head>
              <ng-template tetaAccordionContent>
                <p>I am the content 3</p>
              </ng-template>
            </teta-accordion-item>
        </teta-accordion>
    </div>`,
});

export const filesListAccordion = (args) => ({
  moduleMetadata: {
    imports: [
      AccordionComponent,
      AccordionContentDirective,
      AccordionItemComponent,
      AccordionHeadComponent,
      IconSpriteDirective,
      IconComponent,
    ],
  },
  props: args,
  template: `<div [tetaIconSprite]="'assets/file-icons.svg'">
        <h1 style="margin-bottom: 0.5em">Аккордион</h1>
        <div class="padding-3 bg-global-bgcard" style="width: 275px; border-radius: 8px;">
            <teta-accordion>
             <teta-accordion-item [viewType]="viewType" [divider]="divider">
              <teta-accordion-head>
                <div style="display: grid; grid-template-columns: 32px auto; align-items: center; gap: 12px;">
                  <teta-icon [name]="'file_txt'" style="width: 32px; height: 40px;"></teta-icon>
                  <div style="display: grid; gap: 4px;">
                    <h3 class="font-title-3">Long file name lable</h3>
                    <p class="font-caption">1 Mb, 21.02.2022, 14:13</p>
                  </div>
                </div>
              </teta-accordion-head>
              <ng-template tetaAccordionContent>
               <div class="flex flex-wrap gap-8">
                  <div class="chip"><p>DEPTH</p></div>
                  <div class="chip"><p>CL</p></div>
                  <div class="chip"><p>COL</p></div>
                  <div class="chip"><p>FLUID</p></div>
                  <div class="chip"><p>GK</p></div>
                  <div class="chip"><p>LITO</p></div>
                  <div class="chip"><p>PEF</p></div>
                  <div class="chip"><p>POR</p></div>
                </div>
              </ng-template>
            </teta-accordion-item>
              <teta-accordion-item [viewType]="viewType" [divider]="divider">
                <teta-accordion-head>
                  <div style="display: grid; grid-template-columns: 32px auto; align-items: center; gap: 12px;">
                    <teta-icon [name]="'file_pdf'" style="width: 32px; height: 40px;"></teta-icon>
                    <div style="display: grid; gap: 4px;">
                      <h3 class="font-title-3">Long file name lable</h3>
                      <p class="font-caption">1 Mb, 21.02.2022, 14:13</p>
                    </div>
                  </div>
                </teta-accordion-head>
                <ng-template tetaAccordionContent>
                 <div class="flex flex-wrap gap-8">
                  <div class="chip"><p>DEPTH</p></div>
                  <div class="chip"><p>CL</p></div>
                  <div class="chip"><p>COL</p></div>
                  <div class="chip"><p>FLUID</p></div>
                  <div class="chip"><p>GK</p></div>
                  <div class="chip"><p>LITO</p></div>
                  <div class="chip"><p>PEF</p></div>
                  <div class="chip"><p>POR</p></div>
                </div>
                </ng-template>
              </teta-accordion-item>
              <teta-accordion-item [viewType]="viewType" [divider]="divider">
              <teta-accordion-head>
                <div style="display: grid; grid-template-columns: 32px auto; align-items: center; gap: 12px;">
                  <teta-icon [name]="'file_csv'" style="width: 32px; height: 40px;"></teta-icon>
                  <div style="display: grid; gap: 4px;">
                    <h3 class="font-title-3">Long file name lable</h3>
                    <p class="font-caption">1 Mb, 21.02.2022, 14:13</p>
                  </div>
                </div>
              </teta-accordion-head>
              <ng-template tetaAccordionContent>
               <div class="flex flex-wrap gap-8">
                  <div class="chip"><p>DEPTH</p></div>
                  <div class="chip"><p>CL</p></div>
                  <div class="chip"><p>COL</p></div>
                  <div class="chip"><p>FLUID</p></div>
                  <div class="chip"><p>GK</p></div>
                  <div class="chip"><p>LITO</p></div>
                  <div class="chip"><p>PEF</p></div>
                  <div class="chip"><p>POR</p></div>
                </div>
              </ng-template>
            </teta-accordion-item>
            <teta-accordion-item [viewType]="viewType">
              <teta-accordion-head>
                <div style="display: grid; grid-template-columns: 32px auto; align-items: center; gap: 12px;">
                  <teta-icon [name]="'file_txt'" style="width: 32px; height: 40px;"></teta-icon>
                  <div style="display: grid; gap: 4px;">
                    <h3 class="font-title-3">Long file name lable</h3>
                    <p class="font-caption">1 Mb, 21.02.2022, 14:13</p>
                  </div>
                </div>
              </teta-accordion-head>
              <ng-template tetaAccordionContent>
                <div class="flex flex-wrap gap-8">
                  <div class="chip"><p>DEPTH</p></div>
                  <div class="chip"><p>CL</p></div>
                  <div class="chip"><p>COL</p></div>
                  <div class="chip"><p>FLUID</p></div>
                  <div class="chip"><p>GK</p></div>
                  <div class="chip"><p>LITO</p></div>
                  <div class="chip"><p>PEF</p></div>
                  <div class="chip"><p>POR</p></div>
                </div>
              </ng-template>
            </teta-accordion-item>
        </teta-accordion>
        </div>
    </div>`,
});
