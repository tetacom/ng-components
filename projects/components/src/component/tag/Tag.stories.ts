import {applicationConfig, Meta} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Tag',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<div class="column gap-8">
    <div class="row align-center ">
      <div class="tag tag_filled">
        <p>Label</p>
      </div>
      <div class="tag tag_filled row">
        <p>Label</p>
        <teta-icon name="closeCircle"></teta-icon>
      </div>
    </div>
</div>`,
});
