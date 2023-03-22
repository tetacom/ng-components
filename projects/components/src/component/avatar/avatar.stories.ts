import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {IconModule} from '../icon/icon.module';
import {AvatarComponent} from "./avatar/avatar.component";
import {AvatarModule} from "./avatar.module";

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
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="24" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="28" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="32" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="44" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="64" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="128" [viewType]="'circle'"></teta-avatar>
                <teta-avatar photo="https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" [id]="1" [name]="'AA'" [size]="200" [viewType]="'circle'"></teta-avatar>
             </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="1" [name]="'AA'"  [size]="24" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="28" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="32" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="44" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="64" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="128" [viewType]="'circle'"></teta-avatar>
                <teta-avatar [id]="1" [name]="'AA'" [size]="200" [viewType]="'circle'"></teta-avatar>
             </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="2" [name]="'AA'" [size]="24" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="28" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="32" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="44" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="64" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="128" [viewType]="'rounded'"></teta-avatar>
                <teta-avatar [id]="2" [name]="'AA'" [size]="200" [viewType]="'rounded'"></teta-avatar>
            </div>
            <div class="column gap-12 align-center">
                <teta-avatar [id]="3" [name]="'AA'" [size]="24" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="28" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="32" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="44" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="64" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="128" [viewType]="'brick'"></teta-avatar>
                <teta-avatar [id]="3" [name]="'AA'" [size]="200" [viewType]="'brick'"></teta-avatar>
            </div>
    </div>`,
});

