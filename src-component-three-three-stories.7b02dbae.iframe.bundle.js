(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[141],{"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static#_=IconService_1=this;static#_2=this._loaded=[];static#_3=this._pending=[];constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static#_4=this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static#_=this.ctorParameters=()=>[{type:IconService}];static#_2=this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/three/src/component/three/three.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,customSeries:()=>customSeries,default:()=>three_stories,lithotypeChart:()=>lithotypeChart});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var three_chart_componentngResource=__webpack_require__("./projects/three/src/component/three/three-chart/three-chart.component.scss?ngResource"),three_chart_componentngResource_default=__webpack_require__.n(three_chart_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),angular_three=__webpack_require__("./node_modules/angular-three/fesm2022/angular-three.mjs"),three_module=__webpack_require__("./node_modules/three/build/three.module.js");var angular_three_soba_controls=__webpack_require__("./node_modules/angular-three-soba/fesm2022/angular-three-soba-controls.mjs");(0,angular_three.X$)(three_module);let Area3dComponent=class Area3dComponent{constructor(){this.THREE=three_module}createArea(){const grids=[];return grids.push(this.getMainGrid()),grids.push(...this.createGrid(4,25,3,"vertical")),grids.push(...this.createGrid(4,25,3,"horizontal")),grids}getMainGrid(){const mainGrid=new three_module.GridHelper(100,12);return mainGrid.position.set(0,0,0),mainGrid.rotateZ(Math.PI/2),mainGrid}createGrid(gridsCount,gridSize,rectsInGrid,direction){const plane=[];for(let p=0;p<=gridsCount-1;p++)switch(plane[p]=new three_module.GridHelper(gridSize,rectsInGrid,"#666","#666"),plane[p].renderOrder=-1,direction){case"horizontal":plane[p].position.set(gridSize/2,-50,gridSize*p+gridSize/2-50);break;case"vertical":plane[p].position.set(gridSize/2,gridSize*p+gridSize/2-50,-50),plane[p].rotateZ(Math.PI/2),plane[p].rotateX(Math.PI/2)}return plane}ngOnInit(){this.area=this.createArea()}};Area3dComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-area-3d",template:'<ngt-mesh>\n  <ngt-mesh-basic-material [side]="THREE.DoubleSide"></ngt-mesh-basic-material>\n  @for (rect of area; track rect) {\n  <ngt-primitive *args="[rect]"></ngt-primitive>\n  }\n</ngt-mesh>\n',standalone:!0,imports:[common.CommonModule,angular_three.nQ],changeDetection:core.ChangeDetectionStrategy.OnPush,schemas:[core.CUSTOM_ELEMENTS_SCHEMA]})],Area3dComponent);var angular_three_soba_abstractions=__webpack_require__("./node_modules/angular-three-soba/fesm2022/angular-three-soba-abstractions.mjs"),src=__webpack_require__("./node_modules/d3/src/index.js"),ReplaySubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js");let Chart3dService=class Chart3dService{constructor(){this.data$=new ReplaySubject.m(1),this.data=this.data$.asObservable(),this.minMax=this.data.pipe((0,map.T)((_=>this.getAxesMinMax(_)))),this.scales=this.minMax.pipe((0,map.T)((minMax=>this.getScales(minMax))),(0,shareReplay.t)(1))}setData(data){this.data$.next(data)}getAxesMinMax(data){const zArr=data.series.map((_=>_?.data?.map((d=>d?.z)))).flat().filter((_=>null!=_)),xArr=data.series.map((_=>_?.data?.map((d=>d?.x)))).flat().filter((_=>null!=_)),yArr=data.series.map((_=>_?.data?.map((d=>d?.y)))).flat().filter((_=>null!=_)),ZMinMaxVal=[Math.min(...zArr),Math.max(...zArr)],XMinMaxVal=[Math.min(...xArr),Math.max(...xArr)],YMinMaxVal=[Math.min(...yArr),Math.max(...yArr)];return{z:this.getMinMaxRange(ZMinMaxVal,data.zAxis?.min,data.zAxis?.max),x:this.getMinMaxRange(XMinMaxVal,data.xAxis?.min,data.xAxis?.max),y:this.getMinMaxRange(YMinMaxVal,data.yAxis?.min,data.yAxis?.max)}}getMinMaxRange(minMax,axisMin,axisMax){return[axisMin||(Math.abs(minMax[0]-minMax[1])<1e-7?minMax[0]-.1*Math.abs(minMax[0]-1):minMax[0]),axisMax||(Math.abs(minMax[0]-minMax[1])<1e-7?minMax[1]+.1*Math.abs(minMax[1]+1):minMax[1])]}getScales(axesMinMax){const z=src.m4Y().domain(axesMinMax.z).range([50,-50]);return{x:src.m4Y().domain(axesMinMax.x).range([25,0]),y:src.m4Y().domain(axesMinMax.y).range([50,-50]),z}}static#_=this.ctorParameters=()=>[]};Chart3dService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[])],Chart3dService);var combineLatest=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js"),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");(0,angular_three.X$)(three_module);let Axes3dComponent=class Axes3dComponent{constructor(){this._alive=!0,this.chartService=(0,core.inject)(Chart3dService),this.axes=(0,combineLatest.z)([this.chartService.scales,this.chartService.minMax]).pipe((0,takeWhile.v)((()=>this._alive)),(0,map.T)((([scales,minMax])=>this.createAxes(scales,minMax))))}createAxes(scales,minMax){return{z:this.generateTicks(minMax.z,12).map((_=>({value:_.toFixed(1),position:scales.z(_)}))),y:this.generateTicks(minMax.y,12).map((_=>({value:_.toFixed(1),position:scales.y(_)}))),x:this.generateTicks(minMax.x,4).map((_=>({value:_.toFixed(1),position:scales.x(_)})))}}generateTicks(extremes,count=10){const[min,max]=extremes,tickStep=(max-min)/count;return src.y17(min,max+tickStep,tickStep).filter((step=>step<=max))}ngOnDestroy(){this._alive=!1}static#_=this.ctorParameters=()=>[];static#_2=this.propDecorators={rotation:[{type:core.Input}]}};Axes3dComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-axes-3d",template:'@if ({axes: axes|async}; as data) { @for (tick of data.axes?.x; track tick; ) {\n<ngts-text\n  [text]="tick.value + \'-\'"\n  [color]="\'var(--color-text-90)\'"\n  [rotation]="rotation"\n  [fontSize]="2.5"\n  [position]="[tick.position, -50, 50]"\n  [anchorX]="\'right\'"\n  [anchorY]="\'middle\'"\n  [textAlign]="\'right\'"\n></ngts-text>\n} @for (tick of data.axes?.y; track tick; ) {\n<ngts-text\n  [text]="tick.value + \'-\'"\n  [color]="\'var(--color-text-90)\'"\n  [rotation]="rotation"\n  [fontSize]="2.5"\n  [position]="[0, tick.position, 50]"\n  [anchorX]="\'right\'"\n  [anchorY]="\'middle\'"\n  [textAlign]="\'right\'"\n></ngts-text>\n} @for (tick of data.axes?.z; track tick; ) {\n<ngts-text\n  [text]="tick.value"\n  [color]="\'var(--color-text-90)\'"\n  [rotation]="rotation"\n  [fontSize]="2.5"\n  [position]="[25, -50, tick.position]"\n></ngts-text>\n} }\n',standalone:!0,imports:[common.CommonModule,angular_three_soba_abstractions.Ix],schemas:[core.CUSTOM_ELEMENTS_SCHEMA],changeDetection:core.ChangeDetectionStrategy.OnPush}),(0,tslib_es6.Sn)("design:paramtypes",[])],Axes3dComponent);var base3d_series_componentngResource=__webpack_require__("./projects/three/src/component/three/three-chart/base-3d-series/base3d-series.component.scss?ngResource"),base3d_series_componentngResource_default=__webpack_require__.n(base3d_series_componentngResource);let Base3dSeriesComponent=class Base3dSeriesComponent{set series(series){this._series=series}get series(){return this._series}constructor(svc,ngtStore){this.svc=svc,this.ngtStore=ngtStore}static#_=this.ctorParameters=()=>[{type:Chart3dService},{type:angular_three.PW}];static#_2=this.propDecorators={series:[{type:core.Input}]}};Base3dSeriesComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-base3d-series",standalone:!0,imports:[common.CommonModule],template:"<p>base3d-series works!</p>\n",styles:[base3d_series_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[Chart3dService,angular_three.PW])],Base3dSeriesComponent),(0,angular_three.X$)(three_module);let Block3dComponent=class Block3dComponent extends Base3dSeriesComponent{constructor(svc,ngtStore){super(svc,ngtStore),this.svc=svc,this.ngtStore=ngtStore,this._alive=!0,this.Math=Math,this.blocks=this.svc.scales.pipe((0,takeWhile.v)((()=>this._alive)),(0,map.T)((scales=>this.series?.data?.map((_=>this.createSVGTexture(scales.y(_?.y),scales.y(_?.y1),_?.iconId))))))}createSVGTexture(y,y1,iconId){const max=Math.max(y,y1),min=Math.min(y,y1),height=Math.abs(max-min),icon=iconId?document.querySelector(`#${iconId}`):null,svgString=icon?`<svg width='100' height='100' viewBox='0 0 16 16' fill='none'  xmlns='http://www.w3.org/2000/svg'>${icon?.innerHTML}</svg>`:null,texture=(new three_module.TextureLoader).load(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`),plane=this.createTexturedPlane(texture,100,height,!!icon),plane1=this.createTexturedPlane(texture,25,height,!!icon);return plane.rotation.set(0,Math.PI/2,0),plane.position.set(.17,min+height/2,0),plane1.position.set(12.5,min+height/2,-49.83),[{component:plane,position:min+height/2},{component:plane1,position:min+height/2}]}createTexturedPlane(texture,width,height,visible){texture.wrapS=three_module.RepeatWrapping,texture.wrapT=three_module.RepeatWrapping,texture.repeat.set(10,height/9);const material=new three_module.MeshBasicMaterial({map:texture,visible}),geometry=new three_module.PlaneGeometry(width,height,1,1),uvs=geometry.attributes.uv.array,newUvs=new Float32Array(uvs);return newUvs[0]=0,newUvs[1]=1,newUvs[2]=width/100,newUvs[3]=1,newUvs[4]=0,newUvs[5]=0,newUvs[6]=width/100,newUvs[7]=0,geometry.attributes.uv.needsUpdate=!0,geometry.setAttribute("uv",new three_module.BufferAttribute(newUvs,2)),new three_module.Mesh(geometry,material)}ngOnDestroy(){this._alive=!1}static#_=this.ctorParameters=()=>[{type:Chart3dService},{type:angular_three.PW}]};Block3dComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-block-3d",template:'@if ({ blocks: blocks | async, scales: svc.scales | async }; as data) { @for (mesh of data.blocks; let i = $index; track\nmesh) {\n<ngt-primitive *args="[mesh[0].component]"></ngt-primitive>\n<ngts-text\n  [text]="series.data[i].name"\n  color="black"\n  [fontSize]="2.5"\n  [rotation]="[0, Math.PI / 2, 0]"\n  [position]="[1, mesh[0].position, 5]"\n  [textAlign]="\'left\'"\n  [anchorX]="\'center\'"\n  [anchorY]="\'middle\'"\n></ngts-text>\n<ngt-primitive *args="[mesh[1].component]"></ngt-primitive>\n} }\n',standalone:!0,changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[angular_three.nQ,angular_three_soba_abstractions.Ix,common.AsyncPipe],schemas:[core.CUSTOM_ELEMENTS_SCHEMA]}),(0,tslib_es6.Sn)("design:paramtypes",[Chart3dService,angular_three.PW])],Block3dComponent);(0,angular_three.X$)(three_module);let Line3dComponent=class Line3dComponent extends Base3dSeriesComponent{constructor(svc,ngtStore){super(svc,ngtStore),this.svc=svc,this.ngtStore=ngtStore,this._alive=!0,this.Math=Math,this.points=this.svc.scales.pipe((0,takeWhile.v)((()=>this._alive)),(0,map.T)((scales=>this.getPoints(scales))))}getPoints(scales){return this.series?.data?.map((_=>[scales.x(_?.x),scales.y(_?.y),scales.z(_?.z)])).flat()}ngOnDestroy(){this._alive=!1}static#_=this.ctorParameters=()=>[{type:Chart3dService},{type:angular_three.PW}]};var Series3dType;Line3dComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-line-3d",standalone:!0,changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[common.CommonModule,angular_three_soba_abstractions.Lr,angular_three.nQ],schemas:[core.CUSTOM_ELEMENTS_SCHEMA],template:'@if ({points: points|async}; as data) { @if (data?.points?.length) {\n<ngt-mesh>\n  <ngts-line [color]="series.color" [lineWidth]="2" [points]="data.points"></ngts-line>\n  <ngt-line-basic-material></ngt-line-basic-material>\n</ngt-mesh>\n} }\n'}),(0,tslib_es6.Sn)("design:paramtypes",[Chart3dService,angular_three.PW])],Line3dComponent),function(Series3dType){Series3dType[Series3dType.line=0]="line",Series3dType[Series3dType.block=1]="block"}(Series3dType||(Series3dType={}));let Series3dHost=class Series3dHost{constructor(viewContainerRef){this.viewContainerRef=viewContainerRef,this.seriesMap=(new Map).set(Series3dType.line,Line3dComponent).set(Series3dType.block,Block3dComponent),this._init=!1}ngOnInit(){Object.prototype.isPrototypeOf.call(Base3dSeriesComponent,this.series.component)||(this.series.component=this.seriesMap.get(this.series.type)),this._componentRef=this.viewContainerRef.createComponent(this.series.component),this._componentRef.instance.series=this.series,this._init=!0}ngOnChanges(changes){this._init&&(Object.prototype.hasOwnProperty.call(changes,"series")||changes.hasOwnProperty("config"))&&(this._componentRef.instance.series=this.series,this._componentRef.injector.get(core.ChangeDetectorRef).detectChanges())}static#_=this.ctorParameters=()=>[{type:core.ViewContainerRef}];static#_2=this.propDecorators={series:[{type:core.Input}]}};Series3dHost=(0,tslib_es6.Cg)([(0,core.Component)({selector:"[teta-series-3d-host]",template:"",standalone:!0,changeDetection:core.ChangeDetectionStrategy.OnPush}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef])],Series3dHost);let SceneComponent=class SceneComponent{constructor(){this.store=(0,core.inject)(angular_three.PW),this.Math=Math,this.chartService=(0,core.inject)(Chart3dService),this._cdr=(0,core.inject)(core.ChangeDetectorRef),this.data=this.chartService.data}setRotation(){this.rotation=null,this._cdr.detectChanges(),this.rotation=this.store.get("camera").rotation,this._cdr.detectChanges()}ngOnInit(){this.rotation=this.store.get("camera").rotation}static#_=this.ctorParameters=()=>[]};SceneComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"teta-scene",template:'@if ({data: data|async}; as config) {\n<ngt-scene>\n  <ngts-orbit-controls\n    [minAzimuthAngle]="0"\n    [maxAzimuthAngle]="Math.PI / 2"\n    [maxZoom]="30"\n    [minZoom]="2"\n    (change)="setRotation()"\n  ></ngts-orbit-controls>\n</ngt-scene>\n<teta-area-3d></teta-area-3d>\n@for (s of config.data?.series; track s) {\n<div teta-series-3d-host [series]="s"></div>\n}\n<teta-axes-3d [rotation]="rotation"></teta-axes-3d>\n}\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[angular_three_soba_controls.H,common.CommonModule,Area3dComponent,Line3dComponent,Axes3dComponent,Block3dComponent,Series3dHost],schemas:[core.CUSTOM_ELEMENTS_SCHEMA]}),(0,tslib_es6.Sn)("design:paramtypes",[])],SceneComponent);var canvas_componentngResource=__webpack_require__("./projects/three/src/component/three/three-chart/canvas/canvas.component.scss?ngResource"),canvas_componentngResource_default=__webpack_require__.n(canvas_componentngResource);let CanvasComponent=class CanvasComponent{static#_=this.propDecorators={scene:[{type:core.Input}],camera:[{type:core.Input}],data:[{type:core.Input}]}};CanvasComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-canvas",standalone:!0,template:'@if (data?.series?.length) {\n<ngt-canvas [sceneGraph]="scene" [camera]="camera"> </ngt-canvas>\n} @else {\n<p>{{ data?.noDataText || \'no data\' }}</p>\n}\n',schemas:[core.CUSTOM_ELEMENTS_SCHEMA],changeDetection:core.ChangeDetectionStrategy.OnPush,providers:[angular_three.PW],imports:[angular_three.og,SceneComponent,common.CommonModule],styles:[canvas_componentngResource_default()]})],CanvasComponent);let Canvas3dHost=class Canvas3dHost{constructor(viewContainerRef){this.viewContainerRef=viewContainerRef,this._init=!1}ngOnInit(){this.createCanvas(),this._init=!0}ngOnChanges(){this._init&&(this.createCanvas(),this._componentRef.injector.get(core.ChangeDetectorRef).detectChanges())}createCanvas(){this.viewContainerRef.clear(),this._componentRef=this.viewContainerRef.createComponent(CanvasComponent),this._componentRef.instance.scene=this.scene,this._componentRef.instance.camera=this.camera,this._componentRef.instance.data=this.data}static#_=this.ctorParameters=()=>[{type:core.ViewContainerRef}];static#_2=this.propDecorators={scene:[{type:core.Input}],camera:[{type:core.Input}],data:[{type:core.Input}]}};Canvas3dHost=(0,tslib_es6.Cg)([(0,core.Component)({selector:"[teta-canvas-3d-host]",template:"",standalone:!0,changeDetection:core.ChangeDetectionStrategy.OnPush}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef])],Canvas3dHost),(0,angular_three.X$)(three_module);let ThreeChartComponent=class ThreeChartComponent{constructor(){this.chartService=(0,core.inject)(Chart3dService),this.store=(0,core.inject)(angular_three.PW),this.cdr=(0,core.inject)(core.ChangeDetectorRef)}ngOnInit(){this.scene=SceneComponent,this.camera=new three_module.OrthographicCamera(20,20,20,20,.1,1e3),this.camera.position.set(100,20,70),this.camera.zoom=4.5,this.camera.updateProjectionMatrix()}ngOnChanges(changes){this.data?.series?.length&&this.chartService.setData(this.data)}static#_=this.propDecorators={data:[{type:core.Input}]}};ThreeChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-three-chart",template:'<div class="column_auto column justify-content-center align-center" style="height: 100%; width: 100%">\n  <div teta-canvas-3d-host [camera]="camera" [data]="data" [scene]="scene"></div>\n</div>\n',standalone:!0,schemas:[core.CUSTOM_ELEMENTS_SCHEMA],changeDetection:core.ChangeDetectionStrategy.OnPush,providers:[angular_three.PW],imports:[angular_three.og,SceneComponent,common.CommonModule,CanvasComponent,Canvas3dHost],styles:[three_chart_componentngResource_default()]})],ThreeChartComponent);(0,angular_three.X$)(three_module);let CustomSeriesComponent=class CustomSeriesComponent extends Base3dSeriesComponent{constructor(svc,ngtStore){super(svc,ngtStore),this.svc=svc,this.ngtStore=ngtStore,this.scales=this.svc.scales}ngOnInit(){setTimeout((()=>{this.ngtStore.get("camera").zoom=2,this.ngtStore.get("camera").updateProjectionMatrix()}),1e3)}static#_=this.ctorParameters=()=>[{type:Chart3dService},{type:angular_three.PW}]};CustomSeriesComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-custom-series",standalone:!0,imports:[common.CommonModule,angular_three.nQ],schemas:[core.CUSTOM_ELEMENTS_SCHEMA],changeDetection:core.ChangeDetectionStrategy.OnPush,template:'@if ({scales: scales|async}; as scales) {\n<ngt-mesh\n  [position]="[\n    scales.scales.x(this.series.data[0].x),\n    scales.scales.y(this.series.data[0].y),\n    scales.scales.z(this.series.data[0].z)\n  ]"\n>\n  <ngt-box-geometry *args="[5, 5, 5]"></ngt-box-geometry>\n  <ngt-mesh-basic-material></ngt-mesh-basic-material>\n</ngt-mesh>\n}\n'}),(0,tslib_es6.Sn)("design:paramtypes",[Chart3dService,angular_three.PW])],CustomSeriesComponent);var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");const three_stories={title:"Component/Three",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)()]})],component:ThreeChartComponent,moduleMetadata:{imports:[ThreeChartComponent,icon_sprite_directive._]}},lithotypeChart=()=>({moduleMetadata:{imports:[ThreeChartComponent,icon_sprite_directive._]},props:{data:{noDataText:"s",series:[{type:Series3dType.line,color:"red",data:[{x:0,y:0,z:0},{x:0,y:50,z:2e3}]},{type:Series3dType.line,color:"red",data:[{x:0,y:0,z:0},{x:0,y:70,z:2e3},{x:50,y:700,z:100},{x:150,y:1700,z:1200}]},{type:Series3dType.block,data:[{iconId:"icon1",name:"Гранит",x:0,y:0,y1:100,z:0},{iconId:"icon2",name:"Глина",x:0,y:100,y1:500,z:0},{iconId:"icon3",name:"Грунт",x:0,y:500,y1:4e3,z:0}]}],yAxis:{min:0,max:4e3},xAxis:{min:0,max:1e3}}},template:'<div [tetaIconSprite]="\'assets/lithotype-icons.svg\'" class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">\n                  <teta-three-chart [data]="data"></teta-three-chart>\n    </div>'}),customSeries=()=>({moduleMetadata:{imports:[ThreeChartComponent]},props:{data:{noDataText:"s",series:[{type:Series3dType.line,color:"red",component:CustomSeriesComponent,data:[{x:500,y:555,z:333}]}]}},template:'<div [tetaIconSprite]="\'assets/lithotype-icons.svg\'"  class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">\n                  <teta-three-chart [data]="data"></teta-three-chart>\n    </div>'}),__namedExportsOrder=["lithotypeChart","customSeries"];lithotypeChart.parameters={...lithotypeChart.parameters,docs:{...lithotypeChart.parameters?.docs,source:{originalSource:"() => ({\n  moduleMetadata: {\n    imports: [ThreeChartComponent, IconSpriteDirective]\n  },\n  props: {\n    data: {\n      noDataText: 's',\n      series: [{\n        type: Series3dType.line,\n        color: 'red',\n        data: [{\n          x: 0,\n          y: 0,\n          z: 0\n        }, {\n          x: 0,\n          y: 50,\n          z: 2000\n        }]\n      }, {\n        type: Series3dType.line,\n        color: 'red',\n        data: [{\n          x: 0,\n          y: 0,\n          z: 0\n        }, {\n          x: 0,\n          y: 70,\n          z: 2000\n        }, {\n          x: 50,\n          y: 700,\n          z: 100\n        }, {\n          x: 150,\n          y: 1700,\n          z: 1200\n        }]\n      }, {\n        type: Series3dType.block,\n        data: [{\n          iconId: 'icon1',\n          name: 'Гранит',\n          x: 0,\n          y: 0,\n          y1: 100,\n          z: 0\n        }, {\n          iconId: 'icon2',\n          name: 'Глина',\n          x: 0,\n          y: 100,\n          y1: 500,\n          z: 0\n        }, {\n          iconId: 'icon3',\n          name: 'Грунт',\n          x: 0,\n          y: 500,\n          y1: 4000,\n          z: 0\n        }]\n      }],\n      yAxis: {\n        min: 0,\n        max: 4000\n      },\n      xAxis: {\n        min: 0,\n        max: 1000\n      }\n    }\n  },\n  template: `<div [tetaIconSprite]=\"'assets/lithotype-icons.svg'\" class=\"font-body-3 padding-3 column column_auto gap-20 content-block \" style=\"width: 1000px;height: 600px\">\n                  <teta-three-chart [data]=\"data\"></teta-three-chart>\n    </div>`\n})",...lithotypeChart.parameters?.docs?.source}}},customSeries.parameters={...customSeries.parameters,docs:{...customSeries.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [ThreeChartComponent]\n  },\n  props: {\n    data: {\n      noDataText: \'s\',\n      series: [{\n        type: Series3dType.line,\n        color: \'red\',\n        component: CustomSeriesComponent,\n        data: [{\n          x: 500,\n          y: 555,\n          z: 333\n        }]\n      }]\n    }\n  },\n  template: `<div [tetaIconSprite]="\'assets/lithotype-icons.svg\'"  class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">\n                  <teta-three-chart [data]="data"></teta-three-chart>\n    </div>`\n})',...customSeries.parameters?.docs?.source}}}},"./projects/three/src/component/three/three-chart/base-3d-series/base3d-series.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/three/src/component/three/three-chart/canvas/canvas.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  width: 100%;\n  height: 100%;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/three/src/component/three/three-chart/three-chart.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  width: 100%;\n  height: 100%;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);