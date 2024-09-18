import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { IconComponent } from '../icon/icon/icon.component';

export default {
  title: 'Component/Chip',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    photo: {
      control: { type: 'text' },
    },
  },
  args: {
    photo:
      'https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg',
  },
} as Meta;

export const sample = (args) => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent],
  },
  props: args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
  <div class="column gap-8">
    <h1 style="margin-bottom: 0.5em">Чипы</h1>
    <div class="row gap-8">
      <div class="chip">
        <p>Label</p>
      </div>
      <div class="chip">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_primary">
        <p>Label</p>
      </div>
      <div class="chip chip_primary">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_primary">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_primary">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_primary">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_primary_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_primary_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_primary_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_primary_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_primary_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_green">
        <p>Label</p>
      </div>
      <div class="chip chip_green">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_green">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_green">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_green">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_green_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_green_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_green_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_green_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_green_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_yellow">
        <p>Label</p>
      </div>
      <div class="chip chip_yellow">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_yellow">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_yellow">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_yellow">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_yellow_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_yellow_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_yellow_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_yellow_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_yellow_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_red">
        <p>Label</p>
      </div>
      <div class="chip chip_red">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_red">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_red">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_red">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_red_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_red_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_red_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_red_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_red_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_text">
        <p>Label</p>
      </div>
      <div class="chip chip_text">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_text">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_text">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_text">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
    <div class="row gap-8">
      <div class="chip chip_text_outlined">
        <p>Label</p>
      </div>
      <div class="chip chip_text_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
      </div>
      <div class="chip chip_text_outlined">
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_text_outlined">
        <teta-icon name="tick"></teta-icon>
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
      <div class="chip chip_text_outlined">
        <img [src]="photo" alt="" />
        <p>Label</p>
        <teta-icon name="closeCircleFilled"></teta-icon>
      </div>
    </div>
  </div>`,
});
