import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalCloseReason } from '../../model/modal-close-reason.enum';
import { DynamicData } from '../../../../common/contract/dynamic-data';
import { CurrentModal } from '../../model/current-modal';

@Component({
  selector: 'teta-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExampleComponent implements OnInit {
  closeReason = ModalCloseReason;

  constructor(public modal: CurrentModal, private data: DynamicData) {}

  ngOnInit(): void {}
}
