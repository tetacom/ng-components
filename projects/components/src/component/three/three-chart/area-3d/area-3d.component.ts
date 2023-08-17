import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { GridHelper } from 'three';
import { extend, NgtArgs } from 'angular-three';

extend(THREE);

@Component({
  selector: 'teta-area-3d',
  templateUrl: './area-3d.component.html',
  standalone: true,
  imports: [CommonModule, NgtArgs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Area3dComponent implements OnInit {
  public area: GridHelper[];

  protected readonly THREE = THREE;

  createArea() {
    const grids: GridHelper[] = [];
    grids.push(this.getMainGrid());
    grids.push(...this.createGrid(4, 25, 3, 'vertical'));
    grids.push(...this.createGrid(4, 25, 3, 'horizontal'));
    return grids;
  }

  getMainGrid() {
    const mainGrid = new GridHelper(100, 12);
    mainGrid.position.set(0, 0, 0);
    mainGrid.rotateZ(Math.PI / 2);
    return mainGrid;
  }

  createGrid(
    gridsCount: number,
    gridSize: number,
    rectsInGrid: number,
    direction: 'vertical' | 'horizontal'
  ) {
    const plane: GridHelper[] = [];
    for (let p = 0; p <= gridsCount - 1; p++) {
      plane[p] = new THREE.GridHelper(gridSize, rectsInGrid, '#666', '#666');
      plane[p].renderOrder = -1;
      switch (direction) {
        case 'horizontal':
          plane[p].position.set(
            gridSize / 2,
            -50,
            gridSize * p + gridSize / 2 - 50
          );
          break;
        case 'vertical':
          plane[p].position.set(
            gridSize / 2,
            gridSize * p + gridSize / 2 - 50,
            -50
          );
          plane[p].rotateZ(Math.PI / 2);
          plane[p].rotateX(Math.PI / 2);
          break;
      }
    }
    return plane;
  }

  ngOnInit(): void {
    this.area = this.createArea();
  }
}
