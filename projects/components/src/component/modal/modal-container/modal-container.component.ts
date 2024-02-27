import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IModalConfig } from '../model/i-modal-config';
import { IModalResult } from '../model/i-modal-result';
import { ModalCloseReason } from '../model/modal-close-reason.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'teta-modal-container',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ top: '-100%' }),
                animate('150ms ease-in', style({ top: '0' })),
            ]),
            transition('* => void', [animate('150ms ease-in', style({ top: '-100%' }))]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ModalContainerComponent {
  @Input() config: IModalConfig;
  @Output() closeEvent = new EventEmitter<IModalResult>();

  @HostBinding('attr.tabindex') tabindex = -1;
  @HostBinding('@dialog') dialog = true;

  @HostBinding('class')
  get classList(): string {
    const classList = ['modal__window'];
    if (this.config) {
      if (this.config && this.config.class) {
        classList.push(...this.config.class);
      }
      if (this.config.backdrop) {
        classList.push('modal__backdrop');
      }
    }
    return classList.join(' ');
  }

  constructor(private elRef$: ElementRef) {}

  @HostListener('keyup', ['$event']) keyup(event: KeyboardEvent): void {
    if (this.config && this.config.esc && !event.defaultPrevented) {
      const key = event.key || event.keyCode;

      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeEvent.emit({
          reason: ModalCloseReason.esc,
        });
      }
    }
  }

  @HostListener('click', ['$event']) click(event: MouseEvent): void {
    if (
      this.config.closeOnBackdropClick === true &&
      this.elRef$.nativeElement === event.target
    ) {
      this.closeEvent.emit({
        reason: ModalCloseReason.backdrop,
      });
    }
  }
}
