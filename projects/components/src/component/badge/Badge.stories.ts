import {Meta} from '@storybook/angular/types-6-0';
import {IconModule} from '../icon/icon.module';

export default {
  title: 'Component/Badge',
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<div class="column gap-8">
    <div class="row gap-8">
      <div class="badge badge-green_filled" >
        <p>Label</p>
      </div>
      <div class="badge badge-green" >
        <p>Label</p>
      </div>
    </div>
    <div class="row gap-8">
      <div class="badge badge-yellow_filled" >
        <p>Label</p>
      </div>
      <div class="badge badge-yellow" >
        <p>Label</p>
      </div>
    </div>
    <div class="row gap-8">
       <div class="badge badge-red_filled" >
          <p>Label</p>
       </div>
       <div class="badge badge-red" >
          <p>Label</p>
       </div>
    </div>
    <div class="row gap-8">
       <div class="badge badge-text_filled" >
          <p>Label</p>
       </div>
       <div class="badge badge-text" >
          <p>Label</p>
       </div>
    </div>
</div>

</div>`,
});
