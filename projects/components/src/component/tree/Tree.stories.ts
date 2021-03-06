import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {TreeComponent} from './tree/tree.component';
import {TreeModule} from './tree.module';
import {TetaTemplateModule} from '../../directive/teta-template/teta-template.module';
import {IconModule} from '../icon/icon.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export default {
  title: 'Component/Tree',
  decorators: [withKnobs],
  component: TreeComponent
} as Meta;

export const basicTree = () => ({
  moduleMetadata: {
    imports: [TreeModule, TetaTemplateModule, IconModule, BrowserAnimationsModule]
  },
  props: {
    data: treeData
  },
  template: `<teta-tree [tetaIconSprite]="'assets/icons.svg'" style="width: 400px;" [data]="data">
  <ng-template tetaTemplate let-item>
    <teta-icon [name]="item.icon" class="fill-text-30 margin-right-2"></teta-icon> {{item.name}}
  </ng-template>
</teta-tree>`,
});

const treeData = [{
  name: 'Тетакомовское м-р (4)',
  icon: 'layers',
  children: [
    {
      name: 'Скважины для тестирования',
      icon: 'folder',
      children: [
        {
          name: 'Тестовая скважина №1',
          icon: 'well',
          children: []
        }, {
          name: 'Стресс-тест',
          icon: 'well',
          children: []
        }
      ]
    }
  ]
}, {
  name: 'Test only (1)',
  icon: 'layers',
  children: [
    {
      name: 'Group (1)',
      icon: 'folder',
      children: [
        {
          name: 'well',
          icon: 'well',
          children: [{
            name: 'ГИС',
            icon: 'map',
            children: []
          }, {
            name: 'Конструкция',
            icon: 'tubes',
            children: []
          }, {
            name: 'D1',
            icon: 'angle',
            children: []
          }, {
            name: 'Дизайн №1 copy',
            icon: 'angle',
            children: [{
              name: 'Зоны продуктивности',
              children: []
            }, {
              name: 'План закачки',
              children: []
            }, {
              name: 'Опции',
              children: []
            }, {
              name: 'Результаты',
              children: []
            }]
          }]
        }
      ]
    }
  ]
}];
