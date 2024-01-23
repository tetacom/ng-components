import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {AccordionItemComponent} from '../accordion-item/accordion-item.component';
import { IconComponent } from '../../icon/icon/icon.component';

@Component({
    selector: 'teta-accordion-head',
    templateUrl: './accordion-head.component.html',
    styleUrls: ['./accordion-head.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent],
})
export class AccordionHeadComponent implements OnInit {
  @HostBinding('class.accordion-head') private readonly accordionHeadClass =
    true;

  @Input() showToggle = true;

  private readonly accordionItem$: AccordionItemComponent;

  constructor(
    @Host()
    @Inject(AccordionItemComponent)
      accordionItem: AccordionItemComponent
  ) {
    this.accordionItem$ = accordionItem;
  }

  @HostListener('click')
  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.accordionItem$.toggle();
  }

  @HostBinding('class.accordion-head_open')
  get open(): boolean {
    return this.accordionItem$.open;
  }

  @HostBinding('class.accordion-head_disabled')
  get disabled(): boolean {
    return this.accordionItem$.disabled;
  }

  ngOnInit() {
  }
}
