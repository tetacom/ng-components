import { Observable } from 'rxjs';

export interface IModalConfig {
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  class?: string[];
  esc?: boolean;
  beforeClose?: Observable<any>;
  beforeOpen?: Observable<any>;
}
