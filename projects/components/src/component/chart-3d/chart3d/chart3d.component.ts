import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as d3 from 'd3';
import { Chart3dOptions } from '../model/chart-3d-options';
import { Base3dPoint } from '../model/base-3d-point';
import { Series3d } from '../model/series-3d';
import { ThemeSwitchService } from '../../theme-switch/theme-switch.service';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'teta-chart3d',
  templateUrl: './chart3d.component.html',
  styleUrls: ['./chart3d.component.scss'],
})
export class Chart3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef: ElementRef;

  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.Renderer;
  private _controls: OrbitControls;
  private _obs: ResizeObserver;
  private _config: Chart3dOptions;

  private SIDE_SIZE = 100;
  private gridColor: any;

  private _alive = true;

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeSwitchService
  ) {}

  @Input() set config(config: Chart3dOptions) {
    if (config) {
      this._config = config;
      this.init();
    }
  }

  get config() {
    return this._config;
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit(): void {
    this._themeService.theme
      .pipe(
        takeWhile((_) => this._alive),
        tap((_) => {
          this.gridColor = _ ? '#474751' : '#d7dee3';
          this.init();
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.addResizeObserver();
    this.createScene();
    this.startRenderingLoop();
  }

  ngOnDestroy() {
    this._alive = false;
  }

  private init() {
    if (!this._scene) {
      return;
    }

    while (this._scene.children.length > 0) {
      this._scene.remove(this._scene.children[0]);
    }

    const { x, y, z } = this.getScales(this._config.series);

    this.config.series.forEach((data, idx) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        data.points.map((_) => new THREE.Vector3(x(_.x), z(_.z), y(_.y)))
      );

      const color = d3.scaleOrdinal(d3.schemeTableau10);

      const material = new THREE.LineBasicMaterial({
        color: data?.color ?? color(idx.toString()),
      });

      const line = new THREE.Line(geometry, material);

      line.computeLineDistances();
      line.scale.set(1, 1, 1);
      this._scene.add(line);
    });

    const plane = new THREE.GridHelper(
      this.SIDE_SIZE,
      this.SIDE_SIZE / 10,
      this.gridColor,
      this.gridColor
    );

    plane.position.set(this.SIDE_SIZE / 2, 0, this.SIDE_SIZE / 2);
    this._scene.add(plane);

    const gridX = new THREE.GridHelper(
      this.SIDE_SIZE,
      this.SIDE_SIZE / 10,
      this.gridColor,
      this.gridColor
    );
    gridX.geometry.rotateX(-Math.PI / 2);
    gridX.position.set(this.SIDE_SIZE / 2, this.SIDE_SIZE / 2, 0);
    this._scene.add(gridX);

    const gridY = new THREE.GridHelper(
      this.SIDE_SIZE,
      this.SIDE_SIZE / 10,
      this.gridColor,
      this.gridColor
    );
    gridY.geometry.rotateZ(Math.PI / 2);
    gridY.position.set(0, this.SIDE_SIZE / 2, this.SIDE_SIZE / 2);
    this._scene.add(gridY);

    this.drawTicks(x, y, z);

    this._controls = new OrbitControls(this._camera, this._renderer.domElement);

    this._controls.enableDamping = true;
    this._controls.enablePan = true;
    this._controls.dampingFactor = 0.25;
    this._controls.screenSpacePanning = true;
    this._controls.minDistance = 0;
    this._controls.maxDistance = 10000;
    this._controls.maxPolarAngle = Math.PI / 2;

    this._controls.enableZoom = true;
  }

  private createScene() {
    this._scene = new THREE.Scene();

    const aspectRatio =
      this._elementRef.nativeElement.clientWidth /
      this._elementRef.nativeElement.clientHeight;

    const fieldOfView = 10;
    const nearClippingPane = 1;
    const farClippingPane = 10000;

    this._camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearClippingPane,
      farClippingPane
    );

    this._camera.position.set(1300, 1300, 1300).setLength(1300);
    this._scene.add(this._camera);
  }

  private setSize(width: number, height: number) {
    this._camera.aspect = width / height;
    this._renderer.setSize(width, height);

    this._camera.updateProjectionMatrix();
  }

  private render() {
    this._renderer.render(this._scene, this._camera);
  }

  private startRenderingLoop() {
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    const animate = () => {
      requestAnimationFrame(animate);
      this._controls?.update();
      this.render();
    };

    animate();
  }

  private addResizeObserver() {
    this._obs = new ResizeObserver((_) => {
      this.setSize(_[0]?.contentRect.width, _[0]?.contentRect.height);
    });

    this._obs.observe(this._elementRef.nativeElement);
  }

  private makeSprite(text: string, opts?: { fontSize?: number }): THREE.Sprite {
    const fontSize = 20;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const textWidth = text.length * 50;
    canvas.height = 50;
    canvas.width = 50;

    if(ctx) {
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#A0A0A0';
      ctx.fillText(text, 25, 25);
    }

    const texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(5, 5, 5);

    return sprite;
  }

  private drawTicks(x: any, y: any, z: any) {
    const ticks = new THREE.Object3D();
    const scalesExtrems: any[] = [];

    [x, y, z].forEach((scale, idx) => {
      const generatedTicks = scale.ticks(this.SIDE_SIZE / 10);

      scalesExtrems.push(d3.max(generatedTicks));

      generatedTicks.forEach((_: any) => {
        const sprite = this.makeSprite(_);

        if (idx === 0) {
          sprite.position.set(x(_), z(0), -5);
        }

        if (idx === 1) {
          sprite.position.set(-5, z(0), y(_));
        }

        if (idx === 2) {
          sprite.position.set(0, z(_), -5);
        }

        ticks.add(sprite);
      });
    });

    const northLabel = this.makeSprite('North', { fontSize: 28 });
    const westLabel = this.makeSprite('West', { fontSize: 28 });
    const tvdLabel = this.makeSprite('TVD', { fontSize: 28 });

    northLabel.position.set(x(scalesExtrems[0]) + 10, 0, 0);
    westLabel.position.set(0, 0, y(scalesExtrems[1]) + 10);
    tvdLabel.position.set(0, z(scalesExtrems[2]), 0);

    ticks.add(northLabel, westLabel, tvdLabel);

    this._scene.add(ticks);
  }

  private getScales(series: Series3d<Base3dPoint>[]) {
    const extrems = series.map((_) => ({
      x: d3.extent(_.points, (p: any) => p.x),
      y: d3.extent(_.points, (p: any) => p.y),
      z: d3.extent(_.points, (p: any) => p.z),
    }));

    const flattenExtrems = extrems.reduce(
      (acc: any, _): { x: [number]; y: [number]; z: [number] } => {
        acc.x = acc.x.concat(_.x);
        acc.y = acc.y.concat(_.y);
        acc.z = acc.z.concat(_.z);
        return acc as any;
      },
      { x: [], y: [], z: [] }
    );

    const x = d3
      .scaleLinear()
      .domain([
        d3.min(flattenExtrems.x) as any,
        this._config?.axes?.max == null
          ? d3.max(flattenExtrems.x)
          : this._config.axes.max,
      ])
      .range([0, this.SIDE_SIZE])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(flattenExtrems.y) as any,
        this._config?.axes?.max == null
          ? d3.max(flattenExtrems.y)
          : this._config.axes.max,
      ])
      .range([0, this.SIDE_SIZE])
      .nice();

    const z = d3
      .scaleLinear()
      .domain([
        d3.min(flattenExtrems.z) as any,
        this._config?.axes?.max == null
          ? d3.max(flattenExtrems.z)
          : this._config.axes.max,
      ])
      .range([this.SIDE_SIZE, 0])
      .nice();

    return { x, y, z };
  }
}
