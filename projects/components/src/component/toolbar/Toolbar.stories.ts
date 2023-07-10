import {withKnobs} from '@storybook/addon-knobs';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ToolbarModule} from './toolbar.module';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Toolbar',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  component: ToolbarComponent,
  moduleMetadata: {
    imports: [ToolbarModule],
  },
} as Meta;

export const basicToolbar = () => ({
  moduleMetadata: {
    imports: [ToolbarModule, ButtonModule, IconModule],
  },
  props: {
    data: treeData,
  },
  template: `<teta-toolbar [tetaIconSprite]="'assets/icons.svg'" [palette]="'primary'">
  <button teta-button [palette]="'primary'" [square]="true">
    <teta-icon [name]="'moreVertical'"></teta-icon>
  </button>
  <span class="margin-left-2">Скважины</span>
</teta-toolbar>`,
});

const treeData = [
  {
    name: 'Тетакомовское м-р (4)',
    icon: 'layer',
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
    icon: 'layer',
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
