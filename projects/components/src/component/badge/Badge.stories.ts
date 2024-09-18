import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';

export default {
  title: 'Component/Badge',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<h1 style="margin-bottom: 0.5em">Бейдж</h1>
<div class="column gap-8">
    <div class="row gap-8">
      <div class="badge badge-primary" >
        <p>Primary badge</p>
      </div>
      <div class="badge badge-primary_filled" >
        <p>Primary filled badge</p>
      </div>
    </div>
    <div class="row gap-8">
      <div class="badge badge-green" >
        <p>Green badge</p>
      </div>
      <div class="badge badge-green_filled" >
        <p>Green filled badge</p>
      </div>
    </div>
    <div class="row gap-8">
      <div class="badge badge-yellow" >
        <p>Yellow badge</p>
      </div>
      <div class="badge badge-yellow_filled" >
        <p>Yellow filled badge</p>
      </div>
    </div>
    <div class="row gap-8">
       <div class="badge badge-red" >
          <p>Red badge</p>
       </div>
       <div class="badge badge-red_filled" >
          <p>Red filled badge</p>
       </div>
    </div>
    <div class="row gap-8">
       <div class="badge badge-text" >
          <p>Text badge</p>
       </div>
       <div class="badge badge-text_filled" >
          <p>Text filled badge</p>
       </div>
    </div>
</div>

</div>`,
});
