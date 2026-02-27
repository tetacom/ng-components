import * as THREE from 'three';
import { Series3d } from './series-3d';
import { Base3dPoint } from './base-3d-point';

export interface WellMeshData {
  mesh: THREE.Mesh;
  series: Series3d<Base3dPoint>;
  scale: { x: any; y: any; z: any };
  curve: THREE.CatmullRomCurve3;
  points: Base3dPoint[];
}

export interface IntersectionResult {
  wellData: WellMeshData;
  intersectionPoint: THREE.Vector3;
  closestCurvePoint: THREE.Vector3;
  closestDataPoint: Base3dPoint;
  md: number;
  tvd: number;
}
