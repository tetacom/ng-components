import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input, OnChanges,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

import {Base3dThreePoint} from '../model/base-3d-three-point';
import {SceneComponent} from "../scene/scene.component";
import {Camera} from "three";
import {I3dChartConfig} from "../model/i-3d-chart-config";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: '[teta-canvas-3d-host]',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Canvas3dHost implements OnInit,OnChanges {
  @Input() scene: typeof SceneComponent;
  @Input() camera: Camera;
  @Input() data: I3dChartConfig

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.createCanvas()
    this._init = true;

  }

  ngOnChanges(): void {
    if (
      this._init
    ) {
      this.createCanvas()
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  createCanvas() {
    this.viewContainerRef.clear()
    this._componentRef = this.viewContainerRef.createComponent(
      CanvasComponent
    );
    this._componentRef.instance.scene = this.scene
    this._componentRef.instance.camera = this.camera
    this._componentRef.instance.data = this.data
  }
}
