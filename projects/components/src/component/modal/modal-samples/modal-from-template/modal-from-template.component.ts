import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalCloseReason } from '../../model/modal-close-reason.enum';
import { ModalService } from '../../modal.service';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon/icon.component';
import { ButtonComponent } from '../../../button/button/button.component';
import { ToolbarComponent } from '../../../toolbar/toolbar/toolbar.component';
import { IconSpriteDirective } from '../../../icon/icon-sprite.directive';

@Component({
    selector: 'app-modal-from-template',
    templateUrl: './modal-from-template.component.html',
    styleUrls: ['./modal-from-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconSpriteDirective, ToolbarComponent, ButtonComponent, IconComponent, FormsModule]
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
