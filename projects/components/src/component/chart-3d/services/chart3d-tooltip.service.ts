import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { WellMeshData, IntersectionResult } from '../model/chart3d-tooltip';
import { Base3dPoint } from '../model/base-3d-point';

@Injectable({ providedIn: 'root' })
export class Chart3dTooltipService {
  private _raycaster = new THREE.Raycaster();
  private _mouse = new THREE.Vector2();

  constructor() {
    this._raycaster.params.Line.threshold = 2;
  }

  findIntersection(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    camera: THREE.Camera,
    wellMeshes: WellMeshData[]
  ): IntersectionResult | null {
    // 1. Convert mouse coordinates
    const rect = canvas.getBoundingClientRect();
    this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // 2. Raycasting
    this._raycaster.setFromCamera(this._mouse, camera);
    const meshes = wellMeshes.map((_) => _.mesh);
    const intersects = this._raycaster.intersectObjects(meshes, false);

    if (intersects.length === 0) {
      return null;
    }

    // 3. Find well data
    const intersect = intersects[0];
    const wellData = wellMeshes.find((_) => _.mesh === intersect.object);

    if (!wellData) {
      return null;
    }

    // 4. Calculate closest point on curve
    const closestPoint = this.findClosestPointOnCurve(
      intersect.point,
      wellData.curve
    );

    // 5. Find closest data point to get MD
    const closestDataPoint = this.findClosestDataPoint(
      closestPoint,
      wellData.points,
      wellData.scale
    );

    // 6. Calculate TVD and get MD from data point
    const tvd = this.calculateTVD(closestPoint, wellData.scale.y);
    const md = closestDataPoint.md ?? 0;

    return {
      wellData,
      intersectionPoint: intersect.point,
      closestCurvePoint: closestPoint,
      closestDataPoint,
      md,
      tvd,
    };
  }

  findClosestPointOnCurve(
    point: THREE.Vector3,
    curve: THREE.CatmullRomCurve3
  ): THREE.Vector3 {
    let closestPoint = new THREE.Vector3();
    let minDistance = Infinity;
    const samples = 100;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const curvePoint = curve.getPoint(t);
      const distance = point.distanceTo(curvePoint);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = curvePoint;
      }
    }

    return closestPoint;
  }

  private findClosestDataPoint(
    curvePoint: THREE.Vector3,
    dataPoints: Base3dPoint[],
    scale: { x: any; y: any; z: any }
  ): Base3dPoint {
    let closestPoint = dataPoints[0];
    let minDistance = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < dataPoints.length; i++) {
      const point = dataPoints[i];
      // Convert data point to 3D space using scales
      const scaledPoint = new THREE.Vector3(
        scale.x(point.x),
        scale.y(point.y),
        scale.z(point.z)
      );

      const distance = curvePoint.distanceTo(scaledPoint);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
        closestIndex = i;
      }
    }

    // If MD is not available in the closest point, try to interpolate
    if (closestPoint.md === undefined || closestPoint.md === null) {
      // Find first point with MD
      for (const point of dataPoints) {
        if (point.md !== undefined && point.md !== null) {
          return point;
        }
      }
    }

    // Try to interpolate MD between two closest points
    if (closestIndex > 0 && closestIndex < dataPoints.length - 1) {
      const prevPoint = dataPoints[closestIndex - 1];
      const nextPoint = dataPoints[closestIndex + 1];

      if (
        prevPoint.md !== undefined &&
        nextPoint.md !== undefined &&
        closestPoint.md === undefined
      ) {
        // Linear interpolation
        const prevScaled = new THREE.Vector3(
          scale.x(prevPoint.x),
          scale.y(prevPoint.y),
          scale.z(prevPoint.z)
        );
        const nextScaled = new THREE.Vector3(
          scale.x(nextPoint.x),
          scale.y(nextPoint.y),
          scale.z(nextPoint.z)
        );

        const totalDist = prevScaled.distanceTo(nextScaled);
        const distFromPrev = curvePoint.distanceTo(prevScaled);
        const t = distFromPrev / totalDist;

        const interpolatedMD = prevPoint.md + (nextPoint.md - prevPoint.md) * t;

        return {
          ...closestPoint,
          md: interpolatedMD,
        };
      }
    }

    return closestPoint;
  }

  private calculateTVD(point: THREE.Vector3, yScale: any): number {
    return yScale.invert(point.y);
  }
}
