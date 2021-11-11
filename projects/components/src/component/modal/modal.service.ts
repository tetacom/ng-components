import { Inject, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { ModalInstance } from './model/modal-instance';
import { Subject } from 'rxjs';
import { DynamicComponentService } from '../../common/service/dynamic-component.service';
import { ModalCloseReason } from './model/modal-close-reason.enum';
import { IModalConfig } from './model/i-modal-config';
import { CurrentModal } from './model/current-modal';
import { DynamicData } from '../../common/contract/dynamic-data';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { IModalResult } from './model/i-modal-result';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _stack: ModalInstance[] = [];
  private _modalChanged = new Subject<void>();
  private readonly _container: any;

  constructor(
    @Inject(DOCUMENT)
    private _document: any,
    private _injector: Injector,
    private _factory: DynamicComponentService
  ) {
    this._container = this._document.body;

    this._modalChanged.subscribe(() => {
      if (this._stack && this._stack.length > 0) {
        this.focus(this._stack[this._stack.length - 1]);
      }
    });
  }

  closeAll(): void {
    if (this._stack && this._stack.length > 0) {
      this._stack.forEach((instance: ModalInstance) => {
        instance.close({
          reason: ModalCloseReason.exit,
        });
      });
    }
  }

  create(
    content: string | TemplateRef<any> | Type<any>,
    data?: any,
    config?: IModalConfig,
    injector?: Injector
  ): ModalInstance {
    if (content === null || content === undefined) {
      throw new Error('Specify template or component to render');
    }
    if (config === null || config === undefined) {
      config = Object.assign(
        {
          backdrop: true,
          class: [],
          esc: true,
        },
        config
      );
    }
    if (injector === null || injector === undefined) {
      injector = this._injector;
    }
    const currentModal = new CurrentModal();
    const modalData = new DynamicData(data);

    injector = this.getInjector(currentModal, modalData, injector);
    const contentInstance = this._factory.createContent(
      content,
      injector,
      this.getContext(content, modalData, currentModal)
    );
    const window = this._factory.createComponent(
      ModalContainerComponent,
      contentInstance,
      injector,
      this._container
    );
    window.instance.config = config;

    const instance = new ModalInstance(window, contentInstance);
    currentModal.close = instance.close;
    this.register(instance);
    return instance;
  }

  private getContext(
    content: string | TemplateRef<any> | Type<any>,
    context: any,
    currentModal: CurrentModal
  ): any {
    if (content instanceof TemplateRef) {
      return {
        $implicit: {
          modal: currentModal,
          data: context,
        },
        modal: currentModal,
        data: context,
        close: (result: IModalResult): void => {
          currentModal.close(result);
        },
      };
    }
    return context;
  }

  private getInjector(
    currentModal: CurrentModal,
    data: DynamicData,
    parent: Injector
  ): Injector {
    return Injector.create({
      providers: [
        {
          provide: CurrentModal,
          useValue: currentModal,
        },
        {
          provide: DynamicData,
          useValue: data,
        },
      ],
      parent,
    });
  }

  private register(instance: ModalInstance): void {
    this._stack.push(instance);
    this._modalChanged.next();
    instance.onClose.subscribe(() => this.unregister(instance));
  }

  private unregister = (instance: ModalInstance) => {
    const index = this._stack.indexOf(instance);
    if (index > -1) {
      this._stack.splice(index, 1);
      this._modalChanged.next();
    }
  };

  private focus(instance: ModalInstance): void {
    if (instance && instance.window && instance.window.location.nativeElement) {
      setTimeout(() => {
        instance.window.location.nativeElement.focus();
      }, 0);
    }
  }
}
