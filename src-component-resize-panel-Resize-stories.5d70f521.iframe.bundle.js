(self.webpackChunkteta_components=self.webpackChunkteta_components||[]).push([[9258],{"./projects/components/src/component/resize-panel/Resize.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>Resize_stories,horizontal:()=>horizontal,vertical:()=>vertical});var dist=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");var _class,resize_panel_componentngResource=__webpack_require__("./projects/components/src/component/resize-panel/resize-panel/resize-panel.component.scss?ngResource"),resize_panel_componentngResource_default=__webpack_require__.n(resize_panel_componentngResource);let ResizePanelComponent=((_class=class ResizePanelComponent{set direction(val){this._direction=val}get direction(){return this._direction}get icon(){return"horizontal"===this.direction?"moreHorizontal":"moreVertical"}set grabPosition(val){this._grabPosition=val}get grabPosition(){return"vertical"===this.direction?["left","right"].includes(this._grabPosition)?this._grabPosition:"left":["top","bottom"].includes(this._grabPosition)?this._grabPosition:"bottom"}constructor(_elementRef,_renderer,_document){this._elementRef=_elementRef,this._renderer=_renderer,this._document=_document,this.size=8,this.resizePanelClass=!0,this._direction="horizontal",this._grabPosition="left",this._positionMap=(new Map).set("left","resize-grab_left").set("right","resize-grab_right").set("top","resize-grab_top").set("bottom","resize-grab_bottom")}resizeStart(event){this.setStartPosition(),"vertical"===this.direction?(this._startSize=this._elementRef.nativeElement.clientWidth,this._startPosition=event.clientX):(this._startSize=this._elementRef.nativeElement.clientHeight,this._startPosition=event.clientY)}resizeProcess(event){event.preventDefault(),"vertical"===this.direction?this.manageVertical(event):this.manageHorizontal(event)}resizeEnd(event){window.dispatchEvent(new Event("resize"))}ngOnInit(){this.restorePosition()}ngOnDestroy(){}getClassName(){return this._positionMap.get(this.grabPosition)||""}setStartPosition(){"vertical"===this.direction?this._renderer.setStyle(this._elementRef.nativeElement,"width",`${this._elementRef.nativeElement.offsetWidth}px`):this._renderer.setStyle(this._elementRef.nativeElement,"height",`${this._elementRef.nativeElement.offsetHeight}px`),this._renderer.setStyle(this._elementRef.nativeElement,"flex-grow","0"),this._renderer.setStyle(this._elementRef.nativeElement,"flex-shrink","0"),this._renderer.setStyle(this._elementRef.nativeElement,"flex","none")}manageHorizontal(event){let newSize="bottom"===this.grabPosition?this._startSize+(event.clientY-this._startPosition):this._startSize-(event.clientY-this._startPosition);this.maxSize&&newSize>this.maxSize&&(newSize=this.maxSize),this.minSize&&newSize<this.minSize&&(newSize=this.minSize),this._renderer.setStyle(this._elementRef.nativeElement,"height",`${newSize}px`),this.save()}manageVertical(event){let newSize="right"===this.grabPosition?this._startSize+(event.clientX-this._startPosition):this._startSize-(event.clientX-this._startPosition);this.maxSize&&newSize>this.maxSize&&(newSize=this.maxSize),this.minSize&&newSize<this.minSize&&(newSize=this.minSize),this._renderer.setStyle(this._elementRef.nativeElement,"width",`${newSize}px`),this.save()}restore(){if(this.name?.length>0)return JSON.parse(localStorage.getItem(`resize-panel${this.name}`))}restorePosition(){const savedSize=this.restore();savedSize&&("vertical"===this.direction?this._renderer.setStyle(this._elementRef.nativeElement,"width",`${savedSize}px`):this._renderer.setStyle(this._elementRef.nativeElement,"height",`${savedSize}px`),this._renderer.setStyle(this._elementRef.nativeElement,"flex-grow","0"),this._renderer.setStyle(this._elementRef.nativeElement,"flex-shrink","0"),this._renderer.setStyle(this._elementRef.nativeElement,"flex","none"))}save(){this.name?.length>0&&("vertical"===this.direction?localStorage.setItem(`resize-panel${this.name}`,this._elementRef.nativeElement.clientWidth):localStorage.setItem(`resize-panel${this.name}`,this._elementRef.nativeElement.clientHeight))}}).ctorParameters=()=>[{type:core.ElementRef},{type:core.Renderer2},{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]}],_class.propDecorators={size:[{type:core.Input}],direction:[{type:core.Input}],grabPosition:[{type:core.Input}],name:[{type:core.Input}],minSize:[{type:core.Input}],maxSize:[{type:core.Input}],resizePanelClass:[{type:core.HostBinding,args:["class.resize-panel"]}]},_class);ResizePanelComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-resize-panel",template:'<ng-content></ng-content>\n<div #grab class="resize-grab"\n     [style.width.px]="direction === \'vertical\' ? size : \'\'"\n     [style.height.px]="direction === \'horizontal\' ? size : \'\'"\n     (resizeStart)="resizeStart($event)"\n     (resizeProcess)="resizeProcess($event)"\n     (resizeEnd)="resizeEnd($event)"\n     [tetaResizeDrag]="direction"\n     [ngClass]="getClassName()">\n  <teta-icon [name]="icon" [palette]="\'text\'"></teta-icon>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[resize_panel_componentngResource_default()]})],ResizePanelComponent);var icon_module=__webpack_require__("./projects/components/src/component/icon/icon.module.ts"),resize_drag_module=__webpack_require__("./projects/components/src/directive/resize-drag/resize-drag.module.ts");let ResizePanelModule=class ResizePanelModule{};ResizePanelModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[ResizePanelComponent],exports:[ResizePanelComponent],imports:[common.CommonModule,icon_module.Q,resize_drag_module.E]})],ResizePanelModule);const Resize_stories={title:"Component/ResizePanel",decorators:[dist.withKnobs]},horizontal=()=>({moduleMetadata:{imports:[ResizePanelModule]},props:{maxSize:(0,dist.number)("maxSize",500,{min:300,max:450,range:!0,step:10}),minSize:(0,dist.number)("minSize",50,{min:50,max:150,range:!0,step:10}),grabPosition:(0,dist.select)("grabPosition",["left","right"],"left")},template:'<div class="bg-panel-50 padding-10 margin-10">\n                <div class="row bg-white-50"\n                      style="width: 500px; height: 500px;">\n                  <div class="column_6 bg-primary-5">\n                    I will surrender\n                  </div>\n                  <teta-resize-panel\n                        [maxSize]="maxSize"\n                        [minSize]="minSize"\n                        [direction]="\'vertical\'"\n                        [grabPosition]="grabPosition"\n                        class="column_6 bg-red-5">\n                    I will resize\n                  </teta-resize-panel>\n                </div>\n              </div>'}),vertical=()=>({moduleMetadata:{imports:[ResizePanelModule]},props:{maxSize:(0,dist.number)("maxSize",500,{min:300,max:450,range:!0,step:10}),minSize:(0,dist.number)("minSize",50,{min:50,max:150,range:!0,step:10}),grabPosition:(0,dist.select)("grabPosition",["top","bottom"],"top")},template:'<div class="bg-panel-50 padding-10 margin-10">\n                <div class="column bg-white-50"\n                      style="width: 500px; height: 500px;">\n                  <div class="row_6 bg-primary-5">\n                    I will surrender\n                  </div>\n                  <teta-resize-panel\n                        [maxSize]="maxSize"\n                        [minSize]="minSize"\n                        [direction]="\'horizontal\'"\n                        [grabPosition]="grabPosition"\n                        class="row_6 bg-red-5">\n                    I will resize\n                  </teta-resize-panel>\n                </div>\n              </div>'})},"./projects/components/src/component/icon/icon.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>IconModule});var _class,IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=((_class=class IconService{constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.eN(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.U)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}})._loaded=[],_class._pending=[],_class.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.jN},{type:fesm2022_http.eN}],IconService_1=_class);var icon_sprite_directive_class;IconService=IconService_1=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],IconService);let IconSpriteDirective=((icon_sprite_directive_class=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}}).ctorParameters=()=>[{type:IconService}],icon_sprite_directive_class.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]},icon_sprite_directive_class);IconSpriteDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaIconSprite]"})],IconSpriteDirective);var icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");let IconModule=class IconModule{};IconModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[icon_component.o,IconSpriteDirective],exports:[icon_component.o,IconSpriteDirective],imports:[common.CommonModule,fesm2022_http.JF]})],IconModule)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var TetaSize,_class,icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}));let IconComponent=((_class=class IconComponent{constructor(){this.size=TetaSize.M}get getClass(){const result=[this.class,"icon"];return this.palette&&result.push(`icon-${this.palette}`),result.join(" ")}getName(){return`#${this.name}`}}).propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);IconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/directive/resize-drag/resize-drag.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{E:()=>ResizeDragModule});var _class,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let ResizeDragDirective=((_class=class ResizeDragDirective{get horizontal(){return"horizontal"===this.tetaResizeDrag}get vertical(){return"vertical"===this.tetaResizeDrag}constructor(_document){this._document=_document,this.tetaResizeDrag="vertical",this.resizeStart=new core.EventEmitter,this.resizeProcess=new core.EventEmitter,this.resizeEnd=new core.EventEmitter,this.handleMouseUp=event=>{this.resizeEnd.emit(event),this.removeListeners()},this.handleMouseMove=event=>{this.resizeProcess.emit(event)}}mouseDown(event){this.resizeStart.emit(event),this.addListeners()}addListeners(){this._active=!0,this._document.addEventListener("mouseup",this.handleMouseUp),this._document.addEventListener("mousemove",this.handleMouseMove)}removeListeners(){this._active=!1,this._document.removeEventListener("mouseup",this.handleMouseUp),this._document.removeEventListener("mousemove",this.handleMouseMove)}}).ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]}],_class.propDecorators={tetaResizeDrag:[{type:core.Input}],resizeStart:[{type:core.Output}],resizeProcess:[{type:core.Output}],resizeEnd:[{type:core.Output}],_active:[{type:core.HostBinding,args:["class.resize-drag_active"]}],horizontal:[{type:core.HostBinding,args:["class.resize-drag_horizontal"]}],vertical:[{type:core.HostBinding,args:["class.resize-drag_vertical"]}],mouseDown:[{type:core.HostListener,args:["mousedown",["$event"]]}]},_class);ResizeDragDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaResizeDrag]"})],ResizeDragDirective);let ResizeDragModule=class ResizeDragModule{};ResizeDragModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[ResizeDragDirective],exports:[ResizeDragDirective],imports:[common.CommonModule]})],ResizeDragModule)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/resize-panel/resize-panel/resize-panel.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);