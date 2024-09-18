import { NgModule } from '@angular/core';
import { ModalFromComponentComponent } from './modal-from-component/modal-from-component.component';
import { ModalFromTemplateComponent } from './modal-from-template/modal-from-template.component';
import { FormsModule } from '@angular/forms';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalModule } from '../modal.module';

import { AlertSampleComponent } from './alert-sample/alert-sample.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  exports: [ModalFromComponentComponent, ModalFromTemplateComponent, ModalExampleComponent, AlertSampleComponent],
  imports: [
    ModalModule,
    FormsModule,
    TranslocoModule,
    ModalFromComponentComponent,
    ModalFromTemplateComponent,
    ModalExampleComponent,
    AlertSampleComponent,
  ],
})
export class ModalSamplesModule {}
