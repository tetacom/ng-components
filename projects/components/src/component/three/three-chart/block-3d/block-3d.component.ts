import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
} from '@angular/core';
import { extend, NgtArgs, NgtStore } from 'angular-three';
import { NgtsText } from 'angular-three-soba/abstractions';
import { map, Observable, takeWhile } from 'rxjs';
import * as THREE from 'three';
import { Texture } from 'three';

import { Base3dSeriesComponent } from '../base-3d-series/base3d-series.component';
import { Block3dPoint } from '../model/block3d-point';
import { Chart3dService } from '../service/chart-3d.service';

extend(THREE);

@Component({
  selector: 'teta-block-3d',
  templateUrl: './block-3d.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtArgs, NgtsText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Block3dComponent<T extends Block3dPoint>
  extends Base3dSeriesComponent<T>
  implements OnDestroy
{
  public blocks: Observable<
    {
      component: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      position: number;
    }[][]
  >;
  private _alive = true;
  protected readonly Math = Math;

  constructor(
    override svc: Chart3dService,
    override ngtStore: NgtStore
  ) {
    super(svc, ngtStore);
    this.blocks = this.svc.scales.pipe(
      takeWhile(() => this._alive),
      map(scales => {
        return this.series?.data.map(_ => {
          return this.createSVGTexture(scales.y(_.y), scales.y(_.y1), _.iconId);
        });
      })
    );
  }

  // ngOnInit(): void {}

  createSVGTexture(y: number, y1: number, iconId: number) {
    const max = Math.max(y, y1);
    const min = Math.min(y, y1);
    const height = Math.abs(max - min);
    const icon = document.querySelector(`#${iconId}`);
    const svgString = `<svg width='100' height='100' viewBox='0 0 16 16' fill='none'  xmlns='http://www.w3.org/2000/svg'>${icon.innerHTML}</svg>`;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
    );
    const plane = this.createTexturedPlane(texture, 100, height);
    const plane1 = this.createTexturedPlane(texture, 25, height);
    plane.rotation.set(0, Math.PI / 2, 0);
    plane.position.set(0.17, min + height / 2, 0);
    plane1.position.set(25 / 2, min + height / 2, -50 + 0.17);
    return [
      { component: plane, position: min + height / 2 },
      { component: plane1, position: min + height / 2 },
    ];
  }

  createTexturedPlane(texture: Texture, width: number, height: number) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 9);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const uvs = geometry.attributes['uv'].array;
    const newUvs = new Float32Array(uvs);
    newUvs[0] = 0;
    newUvs[1] = 0;
    newUvs[2] = width / 100;
    newUvs[3] = 0;
    newUvs[4] = 0;
    newUvs[5] = height / 100;
    newUvs[6] = width / 100;
    newUvs[7] = height / 100;
    geometry.attributes['uv'].needsUpdate = true;
    geometry.setAttribute('uv', new THREE.BufferAttribute(newUvs, 2));
    return new THREE.Mesh(geometry, material);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
