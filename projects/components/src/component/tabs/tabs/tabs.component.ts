import {
  AfterContentChecked,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { NgTemplateOutlet } from '@angular/common';

export interface ITabChangeEvent {
  activeId: string | null;
  nextId: string;
  preventDefault: () => void;
}

@Component({
    selector: 'teta-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [NgTemplateOutlet]
})
export class TabsComponent implements AfterContentChecked {
  @HostBinding('class.tabs') classTabs = true;
  @HostBinding('class.tabs_vertical') get verticalClassTabs() {
    return this.direction === 'vertical';
  }
  /**
   * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
   */
  @Input() activeId: string | null;

  /**
   * Tabs direction
   */
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Tabs appearance
   */
  @Input() size: 's' | 'm' = 'm';

  /**
   * Whether the closed tabs should be hidden without destroying them
   */
  @Input() destroyOnHide = true;

  /**
   * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
   */
  @Output() tabChange = new EventEmitter<ITabChangeEvent>();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() {}

  /**
   * Selects the tab with the given id and shows its associated pane.
   * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
   */
  select(tabId: string): void {
    const selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      let defaultPrevented = false;

      this.tabChange.emit({
        activeId: this.activeId,
        nextId: selectedTab.id,
        preventDefault: () => {
          defaultPrevented = true;
        },
      });

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }
    }
  }

  ngAfterContentChecked(): void {
    const activeTab = this._getTabById(this.activeId);
    this.activeId = activeTab ? activeTab.id : this.tabs.length ? this.tabs.first.id : null;
  }

  private _getTabById(id: string | null): TabComponent | null {
    const tabsWithId: TabComponent[] = this.tabs.filter((tab) => tab.id === id);
    return tabsWithId.length ? tabsWithId[0] : null;
  }
}
