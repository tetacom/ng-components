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

import { viewType } from '../../../common/model/view-type.model';
import { AccordionComponent } from '../accordion/accordion.component';
import { AccordionContentDirective } from '../accordion-content.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'teta-accordion-item',
    templateUrl: './accordion-item.component.html',
    styleUrls: ['./accordion-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet],
})
export class AccordionItemComponent {
  @ContentChild(AccordionContentDirective, { static: false })
  content?: AccordionContentDirective;

  @HostBinding('class.accordion-item_active')
  @Input()
  open = false;
  @Input()
  disabled = false;
  @Input()
  viewType: viewType = 'rounded';
  @HostBinding('class.accordion-item') private readonly accordionItemClass =
    true;

  @HostBinding(`class`)
  get class() {
    return `accordion_${this.viewType}`;
  }

  private readonly accordion$: AccordionComponent;

  constructor(
    @Optional() @Inject(AccordionComponent) accordion: AccordionComponent,
    private cdr$: ChangeDetectorRef
  ) {
    this.accordion$ = accordion;
  }

  toggle() {
    this.open = !this.open;
    this.cdr$.detectChanges();
  }
}
