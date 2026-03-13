import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { WellMeshData, IntersectionResult } from '../model/chart3d-tooltip';
import { Base3dPoint } from '../model/base-3d-point';

@Injectable({ providedIn: 'root' })
export class Chart3dTooltipService {
  private _raycaster = new THREE.Raycaster();
  private _mouse = new THREE.Vector2();

  // Kept for marker/orientation logic in the component (not used for MD now)
  findClosestPointOnCurveLocal(point: THREE.Vector3, curve: THREE.CatmullRomCurve3): THREE.Vector3 {
    let closestPoint = new THREE.Vector3();
    let minDistance = Infinity;
    const samples = 200;

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

    // Prefer the closest intersection by distance (Three usually returns sorted,
    // but keeping it explicit avoids surprises across versions)
    intersects.sort((a, b) => a.distance - b.distance);

    // 3. Find well data
    const intersect = intersects[0];

    const wellData = wellMeshes.find((_) => _.mesh === intersect.object);

    if (!wellData) {
      return null;
    }

    // 4. Calculate closest point on the trajectory curve using the mouse ray.
    // Using the curve parameter t makes the tooltip smooth even for very low-point trajectories (e.g. 3 points).
    const hit = this.findClosestPointOnCurveToRay(this._raycaster.ray, wellData.curve, wellData.points);
    const closestPoint = hit.point;
    const intersectPoint = hit.hitPoint ?? intersect.point;
    const intersectDistance = hit.hitDistance ?? intersect.distance;
    // Override intersection with a stable point derived from ray→trajectory projection
    (intersect as any).point = intersectPoint;
    (intersect as any).distance = intersectDistance;

    // 5. Find closest data point (useful for other fields)
    const closestDataPoint = this.findClosestDataPoint(closestPoint, wellData.points, wellData.scale);

    // 6. Calculate TVD and MD
    const tvd = this.calculateTVD(closestPoint, wellData.scale.y);
    const md = hit.md;  // smoothly interpolated along curve parameter t


    return {
      wellData,
      intersectionPoint: (intersect as any).point,
      closestCurvePoint: closestPoint,
      closestDataPoint,
      md,
      tvd,
    };
  }

  private findClosestPointOnCurveToRay(
    ray: THREE.Ray,
    curve: THREE.CatmullRomCurve3,
    orderedDataPoints: Base3dPoint[],
  ): { point: THREE.Vector3; md: number; hitPoint?: THREE.Vector3; hitDistance?: number } {
    // Compute closest point on the rendered curve to the mouse ray.
    // We sample t densely (fast enough) and then refine with a few iterations.
    // MD is interpolated along the dataPoints md range using the same t.

    if (!orderedDataPoints.length) {
      return { point: new THREE.Vector3(), md: 0 };
    }

    if (orderedDataPoints.length === 1) {
      // Degenerate curve
      const p = curve.getPoint(0);
      const s = Math.max(0, ray.direction.dot(new THREE.Vector3().subVectors(p, ray.origin)));
      const hitPoint = ray.at(s, new THREE.Vector3());
      return {
        point: p,
        md: orderedDataPoints[0].md ?? 0,
        hitPoint,
        hitDistance: s,
      };
    }

    const mdMin = orderedDataPoints[0].md ?? 0;
    const mdMax = orderedDataPoints[orderedDataPoints.length - 1].md ?? mdMin;

    const d = ray.direction.clone().normalize();

    // IMPORTANT: use getPointAt(u) (u = arc-length parameter), not getPoint(t).
    // CatmullRomCurve3 "t" is not proportional to arc length and causes MD to change non-uniformly,
    // especially noticeable when there are very few control points.
    const distSqAt = (u: number) => {
      const p = curve.getPointAt(u);
      const s = Math.max(0, d.dot(new THREE.Vector3().subVectors(p, ray.origin)));
      const r = ray.at(s, new THREE.Vector3());
      return { distSq: r.distanceToSquared(p), p, s, r };
    };

    // 1) coarse scan over arc-length parameter u
    const samples = 400;
    let bestU = 0;
    let best = distSqAt(0);

    for (let i = 1; i <= samples; i++) {
      const u = i / samples;
      const cur = distSqAt(u);
      if (cur.distSq < best.distSq) {
        best = cur;
        bestU = u;
      }
    }

    // 2) refine around bestU
    let left = Math.max(0, bestU - 1 / samples);
    let right = Math.min(1, bestU + 1 / samples);

    for (let iter = 0; iter < 10; iter++) {
      const u1 = left + (right - left) / 3;
      const u2 = right - (right - left) / 3;
      const f1 = distSqAt(u1);
      const f2 = distSqAt(u2);

      if (f1.distSq < f2.distSq) {
        right = u2;
        best = f1;
        bestU = u1;
      } else {
        left = u1;
        best = f2;
        bestU = u2;
      }
    }

    // Final eval at bestU
    const final = distSqAt(bestU);
    const md = mdMin + (mdMax - mdMin) * bestU;

    return {
      point: final.p,
      md,
      hitPoint: final.r,
      hitDistance: final.s,
    };
  }


  private findClosestDataPoint(
    curvePoint: THREE.Vector3,
    dataPoints: Base3dPoint[],
    scale: { x: any; y: any; z: any }
  ): Base3dPoint {
    let closestPoint = dataPoints[0];
    let minDistance = Infinity;

    for (let i = 0; i < dataPoints.length; i++) {
      const point = dataPoints[i];
      // Convert data point to 3D space using scales
      const scaledPoint = new THREE.Vector3(scale.x(point.x), scale.y(point.y), scale.z(point.z));
      const distance = curvePoint.distanceTo(scaledPoint);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }

    return closestPoint;
  }


  private calculateTVD(point: THREE.Vector3, yScale: any): number {
    return yScale.invert(point.y);
  }
}
