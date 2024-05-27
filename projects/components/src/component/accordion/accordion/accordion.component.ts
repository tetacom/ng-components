import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { viewType } from '../../../common/model/view-type.model';

@Component({
  selector: 'teta-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AccordionComponent {
  @HostBinding('class.accordion') private readonly accordionClassName = true;

  @Input()
  viewType: viewType = 'rounded';

  @HostBinding(`class`)
  get class() {
    return `accordion_${this.viewType}`;
  }
}
