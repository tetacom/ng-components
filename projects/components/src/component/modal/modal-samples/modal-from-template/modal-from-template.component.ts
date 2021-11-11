import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ModalCloseReason } from '../../model/modal-close-reason.enum';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-modal-from-template',
  templateUrl: './modal-from-template.component.html',
  styleUrls: ['./modal-from-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFromTemplateComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;

  closeReason = ModalCloseReason;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  create(template: TemplateRef<any>): void {
    const modal = this.modal.create(template, {
      name: this.name,
      description: this.description,
    });
    modal.onClose.subscribe((_) => {});
  }
}
