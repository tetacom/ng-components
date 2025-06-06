import { TreeComponent } from './tree/tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconComponent } from '../icon/icon/icon.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { TetaTemplateDirective } from '../../directive/teta-template/teta-template.directive';
import { TreeItemToggleComponent } from '@tetacom/ng-components';

export default {
  title: 'Component/Tree',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: TreeComponent,
} as Meta;

export const basicTree = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      IconComponent,
      IconSpriteDirective,
      TetaTemplateDirective,
      TreeItemToggleComponent,
    ],
  },
  props: {
    data: treeData,
  },
  template: `<teta-tree  [tetaIconSprite]="'assets/icons.svg'" style="width: 400px;" [data]="data">
  <ng-template tetaTemplate let-item>
    <div class="tree__item">
      @if (item.children?.length > 0) {
        <teta-tree-item-toggle [item]="item"></teta-tree-item-toggle>
      }
      <teta-icon [name]="item.icon" class="fill-text-30 margin-right-2"></teta-icon> {{item.name}}
    </div>
  </ng-template>
</teta-tree>`,
});

const treeData = [
  {
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
            children: [],
          },
          {
            name: 'Стресс-тест',
            icon: 'well',
            children: [],
          },
        ],
      },
    ],
  },
  {
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
            children: [
              {
                name: 'ГИС',
                icon: 'map',
                children: [],
              },
              {
                name: 'Конструкция',
                icon: 'tubes',
                children: [],
              },
              {
                name: 'D1',
                icon: 'angle',
                children: [],
              },
              {
                name: 'Дизайн №1 copy',
                icon: 'angle',
                children: [
                  {
                    name: 'Зоны продуктивности',
                    children: [],
                  },
                  {
                    name: 'План закачки',
                    children: [],
                  },
                  {
                    name: 'Опции',
                    children: [],
                  },
                  {
                    name: 'Результаты',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
