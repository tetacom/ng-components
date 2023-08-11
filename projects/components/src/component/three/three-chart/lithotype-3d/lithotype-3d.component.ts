import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtsText } from 'angular-three-soba/abstractions';
import { extend, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { Texture } from 'three';
import { ChartService } from '../service/chart.service';
import { map, Observable } from 'rxjs';
import { Lithotype3dSeries } from '../model/lithotype-3d-series';

extend(THREE);
@Component({
  selector: 'teta-lithotype-3d',
  templateUrl: './lithotype-3d.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtArgs, NgtsText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Lithotype3dComponent implements OnInit {
  @Input() series: Lithotype3dSeries;
  public lithotypes: Observable<
    THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[][]
  >;

  protected readonly chartService = inject(ChartService);
  protected readonly Math = Math;
  ngOnInit(): void {
    this.lithotypes = this.chartService.scales.pipe(
      map((scales) => {
        return this.series?.data.map((_) => {
          return this.createSVGTexture(
            scales.z(_.z),
            scales.z(_.z1),
            this.series.lithotypeId
          );
        });
      })
    );
  }
  createSVGTexture(z: number, z1: number, litotypeId: number) {
    const max = Math.max(z, z1);
    const min = Math.min(z, z1);
    const height = max - min;
    const icon = document.querySelector(`#icon${litotypeId}`);
    const svgString = `<svg width="100" height="100" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">${icon.innerHTML}</svg>`;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
    );
    const plane = this.createTexturedPlane(texture, 100, height);
    const plane1 = this.createTexturedPlane(texture, 25, height);
    plane.rotation.set(0, Math.PI / 2, 0);
    plane.position.set(0.17, 50 - min - height / 2, 0);
    plane1.position.set(25 / 2, 50 - min - height / 2, -50 + 0.17);
    return [plane, plane1];
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
    const plane = new THREE.Mesh(geometry, material);
    return plane;
  }
}
