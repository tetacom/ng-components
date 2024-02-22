
import {AvatarComponent} from "./avatar/avatar.component";

import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Avatar',
  decorators:[
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  argTypes:{
   viewType:{
     control:{type:'select'},
     options:['rounded','circle','brick']
   },
    size:{
     control:{type:'select'},
      options:['24' , '28' , '32' , '44' , '64' , '128', '200']
    },
    name:{
      control:{type:'text'},
    },
    photo:{
      control:{type:'text'},
    },
    id:{
     control:{type:'number'}
    }
  },
  args:{
    viewType:'circle',
    name:'AA',
    size:'64',
    id:2,
    photo:'https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg'
  },
  component: AvatarComponent,
  moduleMetadata: {
    imports: []
  }
} as Meta;
export const baseAvatar= (args) => ({
  moduleMetadata: {
    imports: [],
  },
  props:args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3 bg-global-bgcard row gap-20">
             <div class="column gap-12 align-center">
                <teta-avatar [photo]="photo" [id]="id" [name]="name" [size]="size" [viewType]="viewType"></teta-avatar>
           </div>
    </div>`,
});


export const avatarAllSizes = () => ({
  moduleMetadata: {
    imports: [],
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

