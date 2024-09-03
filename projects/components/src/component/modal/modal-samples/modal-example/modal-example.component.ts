import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalCloseReason } from '../../model/modal-close-reason.enum';
import { DynamicData } from '../../../../common/contract/dynamic-data';
import { CurrentModal } from '../../model/current-modal';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon/icon.component';
import { ButtonComponent } from '../../../button/button/button.component';
import { ToolbarComponent } from '../../../toolbar/toolbar/toolbar.component';

@Component({
  selector: 'teta-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ToolbarComponent, ButtonComponent, IconComponent, FormsModule],
})
export class ModalExampleComponent implements OnInit {
  closeReason = ModalCloseReason;

  constructor(public modal: CurrentModal, private data: DynamicData) {}

  ngOnInit(): void {}
}
