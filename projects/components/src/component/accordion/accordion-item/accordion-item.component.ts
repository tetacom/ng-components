import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  inject,
  Input,
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
  imports: [NgTemplateOutlet],
})
export class AccordionItemComponent {
  accordion = inject(AccordionComponent, {
    optional: true,
  });
  private cdr$ = inject(ChangeDetectorRef);

  @ContentChild(AccordionContentDirective, { static: false })
  content?: AccordionContentDirective;

  @HostBinding('class.accordion-item_active')
  @Input()
  open = false;
  @Input()
  disabled = false;
  @HostBinding('class.accordion-item') readonly accordionItemClass = true;

  @Input()
  divider = false;
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

  constructor() {
    this.accordion$ = this.accordion;
  }

  toggle() {
    this.open = !this.open;
    this.cdr$.detectChanges();
  }
}
