import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ExpandPanelContentDirective } from '../expand-panel-content.directive';
import { ExpandPanelHeadDirective } from '../expand-panel-head.directive';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';
import { ToolbarComponent } from '../../toolbar/toolbar/toolbar.component';

@Component({
    selector: 'teta-expand-panel',
    templateUrl: './expand-panel.component.html',
    styleUrls: ['./expand-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ToolbarComponent,
        ButtonComponent,
        IconComponent,
        NgTemplateOutlet,
    ],
})
export class ExpandPanelComponent implements OnInit {
  @ContentChild(ExpandPanelContentDirective, { static: false })
  content: ExpandPanelContentDirective;

  @ContentChild(ExpandPanelHeadDirective, { static: false })
  head: ExpandPanelHeadDirective;

  @Input() placeholder: string;
  @Input() open = true;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() cookieName: string;
  @Input() direction: 'left' | 'right' = 'left';

  constructor() {}

  openPanel() {
    this.open = true;
    this.openChange.emit(true);
    this.saveCookie();
  }

  closePanel() {
    this.open = false;
    this.openChange.emit(false);
    this.saveCookie();
  }

  ngOnInit(): void {
    this.restoreCookie();
  }

  private saveCookie() {
    if (!this.cookieName?.length) {
      return;
    }
    localStorage.setItem(this.cookieName, JSON.stringify(this.open));
  }

  private restoreCookie() {
    if (!this.cookieName?.length) {
      return;
    }
    const cookie = localStorage.getItem(this.cookieName);
    this.open = cookie != null ? JSON.parse(cookie) : true;
    this.openChange.emit(this.open);
  }
}
