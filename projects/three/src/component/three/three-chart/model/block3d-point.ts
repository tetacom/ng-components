import { Base3dThreePoint } from './base-3d-three-point';

export interface Block3dPoint extends Base3dThreePoint {
  iconId: number;
  name?: string;
}
