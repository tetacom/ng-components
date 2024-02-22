import { Component, Input, OnInit } from '@angular/core';
import { CurrentModal } from '../model/current-modal';
import { DynamicData } from '../../../common/contract/dynamic-data';
import { ModalCloseReason } from '../model/modal-close-reason.enum';
import { TranslocoModule } from '@ngneat/transloco';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';
import { ToolbarComponent } from '../../toolbar/toolbar/toolbar.component';

@Component({
    selector: 'teta-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    standalone: true,
    imports: [
        ToolbarComponent,
        ButtonComponent,
        IconComponent,
        TranslocoModule,
    ],
})
export class DialogComponent implements OnInit {
  @Input() message: string;
  @Input() buttonText: string;
  @Input() buttonIcon: string;
  @Input() buttonPalette: string;
  @Input() showCancelButton: boolean;

  constructor(public modal: CurrentModal, private data: DynamicData) {}

  cancel() {
    this.modal.close({
      reason: ModalCloseReason.exit,
    });
  }

  ok() {
    this.modal.close({
      reason: ModalCloseReason.resolve,
    });
  }

  ngOnInit(): void {}
}
