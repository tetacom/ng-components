import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalExampleComponent } from '../modal-example/modal-example.component';
import { ModalService } from '../../modal.service';
import { IconSpriteDirective } from '../../../icon/icon-sprite.directive';
import { ButtonComponent } from '../../../button/button/button.component';

@Component({
    selector: 'teta-modal-from-component',
    templateUrl: './modal-from-component.component.html',
    styleUrls: ['./modal-from-component.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, IconSpriteDirective]
})
export class ModalFromComponentComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  create(): void {
    const modal = this.modal.create(ModalExampleComponent, {
      name: this.name,
      description: this.description,
    });
    modal.onClose.subscribe((_) => {});
  }
}
