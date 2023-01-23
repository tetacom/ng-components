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
import {AccordionContentDirective} from '../accordion-content.directive';
import {AccordionComponent} from '../accordion/accordion.component';
import {viewType} from "../../../common/model/view-type.model";

@Component({
  selector: 'teta-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnInit {

  @ContentChild(AccordionContentDirective, {static: false})
  content: AccordionContentDirective;

  @HostBinding('class.accordion-item_active')
  @Input()
  open: boolean;
  @Input() disabled: boolean;
  @Input() viewType: viewType = 'rounded'
  @HostBinding('class.accordion-item') private readonly accordionItemClass =
    true;

  @HostBinding(`class`)
  get class() {
    return `accordion_${this.viewType}`
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

  ngOnInit() {
  }
}
