import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {AccordionContentDirective} from "../accordion-content.directive";
import {AccordionItemComponent} from "../accordion-item/accordion-item.component";
import {AccordionHeadComponent} from "../accordion-head/accordion-head.component";

@Component({
    selector: 'teta-accordion1',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    imports:[AccordionContentDirective,AccordionItemComponent,AccordionHeadComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AccordionComponent {
  @HostBinding('class.accordion') private readonly accordionClassName = true;
}
