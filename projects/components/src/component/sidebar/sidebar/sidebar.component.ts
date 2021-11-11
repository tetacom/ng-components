import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SidebarPosition } from '../sidebar-position.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'teta-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sidebar', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate(300, style({ opacity: '1' })),
      ]),
      transition('* => void', [animate(300, style({ opacity: '0' }))]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() position: SidebarPosition = SidebarPosition.left;
  @Input() backdrop: boolean;
  @Input() open: boolean;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() className: string | string[];

  @HostBinding('style.z-index') zIndex = 10;

  sidebarPosition = SidebarPosition;

  constructor() {}

  setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(this.open);
  }

  ngOnInit(): void {}
}
