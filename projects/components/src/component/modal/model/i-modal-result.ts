import { ModalCloseReason } from './modal-close-reason.enum';

export interface IModalResult<T = any> {
  /**
   * Любые другие данные которые пользователь желает вернуть при закрытии окна
   */
  [key: string]: any;

  data?: T;

  /**
   * Причина закрытия окна
   */
  reason: ModalCloseReason;
}
