import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  Inject,
  Input,
  Optional,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { AccordionComponent } from '../accordion/accordion.component';
import { AccordionContentDirective } from '../accordion-content.directive';
import { viewType } from '../../../common/model/view-type.model';

@Component({
    selector: 'teta-accordion-item',
    templateUrl: './accordion-item.component.html',
    styleUrls: ['./accordion-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class AccordionItemComponent {
  @ContentChild(AccordionContentDirective, { static: false })
  content?: AccordionContentDirective;

  @HostBinding('class.accordion-item_active')
  @Input()
  open = false;
  @Input()
  disabled = false;
  @HostBinding('class.accordion-item') private readonly accordionItemClass = true;

  @Input()
  divider: boolean = false;
  @HostBinding('class.accordion-item_divider') get dividerClass() {
    return this.divider;
  }

  @Input()
  viewType: viewType = 'rounded';
  @HostBinding(`class`)
  get class() {
    return `accordion-item_${this.viewType}`;
  }

  private readonly accordion$: AccordionComponent;

  constructor(
    @Optional() @Inject(AccordionComponent) accordion: AccordionComponent,
    private cdr$: ChangeDetectorRef,
  ) {
    this.accordion$ = accordion;
  }

  toggle() {
    this.open = !this.open;
    this.cdr$.detectChanges();
  }
}
