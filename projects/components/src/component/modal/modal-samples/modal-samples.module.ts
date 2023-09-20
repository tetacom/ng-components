import { NgModule } from '@angular/core';
import { ModalFromComponentComponent } from './modal-from-component/modal-from-component.component';
import { ModalFromTemplateComponent } from './modal-from-template/modal-from-template.component';
import { FormsModule } from '@angular/forms';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalModule } from '../modal.module';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { ButtonModule } from '../../button/button.module';
import { IconModule } from '../../icon/icon.module';
import { AlertSampleComponent } from './alert-sample/alert-sample.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    ModalFromComponentComponent,
    ModalFromTemplateComponent,
    ModalExampleComponent,
    AlertSampleComponent,
  ],
  exports: [
    ModalFromComponentComponent,
    ModalFromTemplateComponent,
    ModalExampleComponent,
    AlertSampleComponent,
  ],
  imports: [
    ModalModule,
    ButtonModule,
    ToolbarModule,
    FormsModule,
    IconModule,
    TranslocoModule,
  ],
})
export class ModalSamplesModule {}
