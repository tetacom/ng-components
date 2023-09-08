import { IconModule } from '../icon/icon.module';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Tag',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<div class="column gap-8">
    <div class="row align-center ">
      <div class="tag tag_filled">
        <p>Label</p>
      </div>
      <div class="chip">
        <p>Label</p>
      </div>
    </div>
    <div class="row gap-8 align-center">
      <div class="tag tag_filled row">
        <p>Label</p>
        <teta-icon name="closeCircle"></teta-icon>
      </div>
      <div class="chip row" >
        <p>Label</p>
        <teta-icon name="closeCircle"></teta-icon>
      </div>
    </div>
</div>
</div>`,
});
