import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { TabContentDirective } from '../tab-content.directive';
import { TabTitleDirective } from '../tab-title.directive';

let nextId = 0;

@Component({
  selector: 'teta-tab',
  template: '',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements AfterContentChecked {
  /**
   * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
   */
  @Input() id = `teta-tab-${nextId++}`;
  /**
   * Simple (string only) title. Use the "ItskTabTitleDirective" directive for more complex use-cases.
   */
  @Input() title: string;
  /**
   * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
   */
  @Input() disabled = false;

  @ContentChild(TabTitleDirective, { static: false })
  titleTpl: TabTitleDirective;
  @ContentChild(TabContentDirective, { static: false })
  contentTpl: TabContentDirective;
  // titleTpl: TabTitleDirective | null;
  // contentTpl: TabContentDirective | null;

  ngAfterContentChecked(): void {
    // this.titleTpl = this.titleTemplates.first;
    // this.contentTpl = this.contentTemplates.first;
  }
}
