import {Meta} from '@storybook/angular/types-6-0';
// eslint-disable-next-line id-blacklist
import {boolean, optionsKnob, select, withKnobs} from '@storybook/addon-knobs';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {DropdownComponent} from './dropdown/dropdown.component';
import {DropdownModule} from './dropdown.module';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';

export default {
  title: 'Component/Dropdown',
  decorators: [withKnobs],
  // component: DropdownComponent,
  moduleMetadata: {
    imports: [DropdownModule]
  },
  argTypes: {
    align: {
      defaultValue: Align.right,
      control: {
        type: 'select',
        options: [Align.left, Align.right, Align.center, Align.auto],
        labels: ['left', 'right', 'center', 'auto'],
      },
    },
    autoCloseIgnore: {
      defaultValue: [2],
      options: ['esc', 'enter', 'inside', 'outside'],
      control: {
        type: 'check'
      },
    },
    transform: {
      defaultValue: 0,
      control: {
        type: 'radio',
        options: [0, 1],
        labels: ['False', 'True']
      }
    },
    autoClose: {
      defaultValue: 1,
      control: {
        type: 'radio',
        options: [0, 1],
        labels: ['False', 'True']
      }
    },
    appendToBody: {
      defaultValue: 0,
      control: {
        type: 'radio',
        options: [0, 1],
        labels: ['False', 'True']
      }
    }
  }
} as Meta;

const alignMap = new Map<VerticalAlign, string>().set(
  VerticalAlign.bottom, 'bottom'
).set(
  VerticalAlign.top, 'top'
).set(
  VerticalAlign.center, 'center'
).set(
  VerticalAlign.auto, 'auto'
);

export const dropdownDirective = (args) => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule]
  },
  props: {
    ...args,
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto],
    alignMap
  },
  template: `<div class="padding-10 bg-panel-50 row"
                  style="width: 500px;"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [style.margin]="transform ? '' : '100px 100px'"
                  [tetaIconSprite]="'assets/icons.svg'">
                  <div style="position: fixed; top: 0; left: 0;">Fixed</div>
                  <div style="position: fixed; top: 0; right: 0;transform: translateX(0px)">Fixed trans</div>
    <div tetaDropdown
          class="margin-right-4"
          *ngFor="let valign of verticalAlign"
          [align]="align"
          [verticalAlign]="valign"
          [appendToBody]="appendToBody"
          [autoClose]="autoClose"
          [autoCloseIgnore]="autoCloseIgnore">
      <button teta-button tetaDropdownHead [palette]="'primary'">
        {{alignMap.get(valign)}}
      </button>
      <div tetaDropdownContent class="list scrollable" style="width: 200px">
        <ng-container *ngFor="let i of [1,2,3]">
          <div class="list-item">
            <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
          </div>
          <div class="list-item">
            <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
          </div>
          <div class="list-item">
            <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
          </div>
          <div class="list-item">
            <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
          </div>
          <div class="list-item">
            <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
          </div>
        </ng-container>
      </div>
    </div>
  </div>`
});
export const dropdownComponent = (args) => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule]
  },
  props: {
    ...args,
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto],
  },
  template: `<div class="padding-10 bg-panel-50"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [tetaIconSprite]="'assets/icons.svg'">
    <teta-dropdown *ngFor="let valign of verticalAlign"
                    [align]="align"
                    [verticalAlign]="valign"
                    [appendToBody]="appendToBody"
                    [autoClose]="autoClose"
                    [autoCloseIgnore]="autoCloseIgnore">
      <button teta-button tetaDropdownHead [palette]="'primary'">
        Click to open
      </button>
      <div tetaDropdownContent class="list overflow-auto" style="width: 200px">
        <div class="list-item">
          <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
        </div>
        <div class="list-item">
          <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
        </div>
        <div class="list-item">
          <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
        </div>
        <div class="list-item">
          <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
        </div>
        <div class="list-item">
          <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
        </div>
      </div>
    </teta-dropdown>
  </div>`
});
