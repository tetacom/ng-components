import {IconModule} from '../icon/icon.module';
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Tag',
  decorators:[
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ]
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<div class="column gap-8">
    <div class="row gap-8">
      <div class="tag tag_filled">
        <p>Label</p>
      </div>
      <div class="tag">
        <p>Label</p>
      </div>
    </div>
        <div class="row gap-8">
      <div class="tag tag_filled row gap-8">
        <p>Label</p>
        <teta-icon name="closeCircle"></teta-icon>
      </div>
      <div class="tag row gap-8" >
        <p>Label</p>
        <teta-icon name="closeCircle"></teta-icon>
      </div>
    </div>
</div>
</div>`,
});
