import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import * as d3 from 'd3';
import {Chart3dOptions} from '../model/chart-3d-options';
import {Base3dPoint} from '../model/base-3d-point';
import {Series3d} from '../model/series-3d';
import {ThemeSwitchService} from '../../theme-switch/theme-switch.service';
import {takeWhile, tap} from 'rxjs/operators';
import {OrbitControls} from "three-stdlib";

@Component({
  selector: 'teta-chart3d',
  templateUrl: './chart3d.component.html',
  styleUrls: ['./chart3d.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
  private axesColor: any;

  private _alive = true;

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeSwitchService
  ) {
  }

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
        takeWhile(_ => this._alive),
        tap(_ => {
          this.gridColor = _ ? '#5d6a73' : '#bdbdc6';
          this.axesColor = _ ? '#8e8f9d' : '#7d8f9a';
          this.init();
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.addResizeObserver();
    this.createScene();
    this.startRenderingLoop();
    this.init();
  }

  ngOnDestroy() {
    this._alive = false;
    this.removeResizeObserver();
  }

  private init() {
    if (!this._scene) {
      return;
    }

    while (this._scene.children.length > 0) {
      this._scene.remove(this._scene.children[0]);
    }

    const {x, y, z} = this.getScales(this._config.series);

    this.config.series.forEach((data, idx) => {
      if (!data.points?.length) {
        return;
      }

      const points = data.points.map(
        _ => new THREE.Vector3(x(_.x), y(_.y), z(_.z))
      );

      const color = d3.scaleOrdinal(d3.schemeTableau10);

      const material = new THREE.LineBasicMaterial({
        color: data?.color ?? color(idx.toString()),
      });

      const tubeGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        1024,
        0.5,
        20,
        false
      );

      let tube = new THREE.Line(tubeGeometry, material);
      this._scene.add(tube);
    });

    const circles = x.ticks(this.SIDE_SIZE / 10);

    const material = new THREE.LineBasicMaterial({color: this.axesColor});
    const pointsLines = [];
    pointsLines.push(new THREE.Vector3(0, 0, 0));
    pointsLines.push(new THREE.Vector3(0, 0, z(-z.domain()[1])));

    pointsLines.push(new THREE.Vector3(0, 0, 0));
    pointsLines.push(new THREE.Vector3(x(-x.domain()[1]), 0, 0));

    const geometryLines = new THREE.BufferGeometry().setFromPoints(pointsLines);
    const line = new THREE.Line(geometryLines, material);

    this._scene.add(line);

    circles.forEach(r => {
      const material = new THREE.LineDashedMaterial({
        color: this.gridColor,
        dashSize: 1,
        gapSize: 3,
      });

      const circleGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path()
          .absarc(0, 0, x(r), 0, Math.PI * 2, false)
          .getSpacedPoints(100)
      );

      const circle = new THREE.LineSegments(circleGeometry, material);

      circle.geometry.rotateX(-Math.PI / 2);

      this._scene.add(circle);
    });

    this.drawTicks(x, y, z);

    if (!this._controls) {
      this._controls = new OrbitControls(
        this._camera,
        this._renderer.domElement
      );

      this._controls.enableDamping = true;
      this._controls.enablePan = true;
      this._controls.dampingFactor = 0.25;
      this._controls.screenSpacePanning = true;
      this._controls.minDistance = 0;
      this._controls.maxDistance = 10000;
      this._controls.maxPolarAngle = Math.PI / 2;

      this._controls.enableZoom = true;
    }
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
    this._obs = new ResizeObserver(_ => {
      this.setSize(_[0]?.contentRect.width, _[0]?.contentRect.height);
    });

    this._obs.observe(this._elementRef.nativeElement);
  }

  private removeResizeObserver() {
    this._obs.unobserve(this._elementRef.nativeElement);
    this._obs.disconnect();
  }

  private makeSprite(text: string, opts?: { fontSize?: number }): THREE.Sprite {
    const fontSize = 20;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const textWidth = text.length * 50;
    canvas.height = 50;
    canvas.width = 50;

    if (ctx) {
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
    sprite.scale.set(0.4 * fontSize, 0.4 * fontSize, 0.4 * fontSize);

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
          sprite.position.set(x(_), y(y.domain()[1]), 0);
        }

        if (idx === 1) {
          sprite.position.set(-10, y(_), 0);
        }

        if (idx === 2) {
          sprite.position.set(0, y(y.domain()[1]), z(_));
        }

        ticks.add(sprite);
      });
    });

    const northLabel = this.makeSprite('X', {fontSize: 28});
    const westLabel = this.makeSprite('Y', {fontSize: 28});
    const tvdLabel = this.makeSprite('TVD', {fontSize: 28});

    northLabel.position.set(x(x.domain()[1]) + 5, 0, 0);
    westLabel.position.set(0, 0, y(y.domain()[0]) + 5);
    tvdLabel.position.set(0, z(z.domain()[1]) + 5, 0);

    ticks.add(northLabel, westLabel, tvdLabel);

    const axesHelper = new THREE.AxesHelper(this.SIDE_SIZE);
    axesHelper.setColors(this.axesColor, this.axesColor, this.axesColor);

    this._scene.add(axesHelper);

    this._scene.add(ticks);
  }

  private getScales(series: Series3d<Base3dPoint>[]) {
    const extrems = series.map(_ => ({
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
      {x: [], y: [], z: []}
    );

    const x = d3
      .scaleLinear()
      .domain([
        0,
        this._config?.axes?.max == null
          ? parseInt(d3.max(flattenExtrems.x))
          : this._config.axes.max,
      ])
      .range([0, this.SIDE_SIZE])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([0, parseInt(d3.max(flattenExtrems.y), 10)])
      .range([this.SIDE_SIZE, 0]);

    const z = d3
      .scaleLinear()
      .domain([
        0,
        this._config?.axes?.max == null
          ? parseInt(d3.max(flattenExtrems.z))
          : this._config.axes.max,
      ])
      .range([0, this.SIDE_SIZE])
      .nice();

    return {x, y, z};
  }
}
