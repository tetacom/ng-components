import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {IconModule} from '../icon/icon.module';
import {AvatarComponent} from "./avatar/avatar.component";
import {AvatarModule} from "./avatar.module";
import avatar from './assets/avatar.png'

export default {
  title: 'Component/Avatar',
  decorators: [withKnobs],
  component: AvatarComponent,
  moduleMetadata: {
    imports: [AvatarModule]
  }
} as Meta;

export const basicAvatar = () => ({
  moduleMetadata: {
    imports: [AvatarModule, IconModule],
  },

  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-global-bgcard row gap-20">
             <div class="column gap-12 align-center">
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="24" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="28" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="32" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="44" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="64" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="128" [type]="'circle'"></teta-avatar>
                <teta-avatar photo="${avatar}" [id]="1" [name]="'AA'" [size]="200" [type]="'circle'"></teta-avatar>
             </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="1" [name]="'AA'"  [size]="24" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="28" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="32" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="44" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="64" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="128" [type]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="200" [type]="'circle'"></teta-avatar>
             </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="2" [name]="'AA'" [size]="24" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="28" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="32" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="44" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="64" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="128" [type]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="200" [type]="'rounded'"></teta-avatar>
            </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="3" [name]="'AA'" [size]="24" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="28" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="32" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="44" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="64" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="128" [type]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="200" [type]="'brick'"></teta-avatar>
            </div>
    </div>`,
});

