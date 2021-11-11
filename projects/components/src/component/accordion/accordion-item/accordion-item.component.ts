import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { AccordionContentDirective } from '../accordion-content.directive';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'teta-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnInit {
  @ContentChild(AccordionContentDirective, { static: false })
  content: AccordionContentDirective;

  @HostBinding('class.accordion-item_active')
  @Input()
  open: boolean;
  @Input() disabled: boolean;

  @HostBinding('class.accordion-item') private readonly accordionItemClass =
    true;

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

  ngOnInit() {}
}
