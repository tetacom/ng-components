import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'teta-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AccordionComponent {
  @HostBinding('class.accordion') private readonly accordionClassName = true;
}
