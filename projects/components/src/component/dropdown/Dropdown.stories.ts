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
  component: DropdownComponent,
  moduleMetadata: {
    imports: [DropdownModule]
  }
} as Meta;

export const dropdownDirective = () => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule]
  },
  props: {
    align: select('align', {
      left: Align.left,
      right: Align.right,
      center: Align.center,
      auto: Align.auto
    }, Align.left),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto],
    autoClose: boolean('autoClose', true),
    autoCloseIgnore: optionsKnob('autoCloseIgnore', {
      esc: 'esc',
      enter: 'enter',
      inside: 'inside',
      outside: 'outside'
    }, ['inside'], {
      display: 'check',
    })
  },
  template: `<div class="padding-4 bg-panel-50 row" style="position: absolute; top: 50%;" [tetaIconSprite]="'assets/icons.svg'">
    <div tetaDropdown
          class="margin-right-4"
          *ngFor="let valign of verticalAlign"
          [align]="align"
          [verticalAlign]="valign"
          [autoClose]="autoClose"
          [autoCloseIgnore]="autoCloseIgnore">
      <button teta-button tetaDropdownHead [palette]="'primary'">
      Click to open
      </button>
      <div tetaDropdownContent class="list overflow-auto" style="width: 200px">
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

export const dropdownComponent = () => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule]
  },
  props: {
    align: select('align', {
      left: Align.left,
      right: Align.right,
      center: Align.center,
      auto: Align.auto
    }, Align.left),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto],
    autoClose: boolean('autoClose', true),
    autoCloseIgnore: optionsKnob('autoCloseIgnore', {
      esc: 'esc',
      enter: 'enter',
      inside: 'inside',
      outside: 'outside'
    }, ['inside'], {
      display: 'check',
    })
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-dropdown *ngFor="let valign of verticalAlign"
                    [align]="align"
                    [verticalAlign]="valign"
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
