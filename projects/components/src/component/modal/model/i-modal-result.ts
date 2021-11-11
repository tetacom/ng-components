import {ModalCloseReason} from './modal-close-reason.enum';

export interface IModalResult {
  /**
   * Любые другие данные которые пользователь желает вернуть при закрытии окна
   */
  [key: string]: any;

  /**
   * Причина закрытия окна
   */
  reason: ModalCloseReason;
}
