(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[1047],{"./projects/components/src/common/enum/teta-size.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TetaSize;__webpack_require__.d(__webpack_exports__,{K:()=>TetaSize}),function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}))},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"icon"];switch(this.palette&&result.push(`icon-${this.palette}`),this.size){case teta_size_enum.K.XL:result.push("icon-xl");break;case teta_size_enum.K.L:result.push("icon-l");break;case teta_size_enum.K.M:result.push("icon-m");break;case teta_size_enum.K.S:result.push("icon-s");break;case teta_size_enum.K.XS:result.push("icon-xs")}return result.join(" ")}getName(){return`#${this.name}`}static{this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%; height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/component/tree/tree.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{y:()=>TreeService});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");let TreeService=class TreeService{constructor(){this._openItems=new rxjs__WEBPACK_IMPORTED_MODULE_0__.t([]),this._scrollToIndex=new rxjs__WEBPACK_IMPORTED_MODULE_0__.t(0),this.compareItems=item=>item,this.openItems=this._openItems.asObservable(),this.scrollToIndex=this._scrollToIndex.asObservable()}openItem(item){const newValue=this.addOrRemove(item,this._openItems.value);this.setOpenItems(newValue)}setOpenItems(items){this._openItems.next(items)}scrollTo(index){this._scrollToIndex.next(index)}addOrRemove(needle,list){const found=list?.find((x=>this.compareItems(x)===this.compareItems(needle)));return found?list.filter((x=>this.compareItems(x)!==this.compareItems(needle))):[...list,needle]}static{this.ctorParameters=()=>[]}};TreeService=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({providedIn:"root"}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[])],TreeService)},"./projects/components/src/component/tree/tree/tree.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>TreeComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var tree_componentngResource=__webpack_require__("./projects/components/src/component/tree/tree/tree.component.scss?ngResource"),tree_componentngResource_default=__webpack_require__.n(tree_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tree_service=__webpack_require__("./projects/components/src/component/tree/tree.service.ts"),teta_template_directive=__webpack_require__("./projects/components/src/directive/teta-template/teta-template.directive.ts"),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs");var tree_item_componentngResource=__webpack_require__("./projects/components/src/component/tree/tree-item/tree-item.component.scss?ngResource"),tree_item_componentngResource_default=__webpack_require__.n(tree_item_componentngResource),animations=__webpack_require__("./node_modules/@angular/animations/fesm2022/animations.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs");let TreeItemComponent=class TreeItemComponent{constructor(){this.treeService=(0,core.inject)(tree_service.y),this.item=(0,core.input)(),this.depth=(0,core.input)(0),this.padding=(0,core.input)(16),this.childNodeName=(0,core.input)("children"),this.template=(0,core.input)(),this.childPadding=(0,core.input)(),this.treeItemClass=!0,this.treeItemInstance=!0,this.computedDepth=(0,core.computed)((()=>this.depth()+(this.item()[this.childNodeName()]?.length>0?0:this.childPadding()?2:1))),this.openItems=(0,rxjs_interop.ot)(this.treeService.openItems),this.itemIsOpen=(0,core.computed)((()=>{const found=this.openItems()?.find((x=>this.treeService.compareItems(x)===this.treeService.compareItems(this.item())));return!!found}))}openItem(){this.treeService.openItem(this.item())}static{this.ctorParameters=()=>[]}static{this.propDecorators={item:[{type:core.Input,args:[{isSignal:!0,alias:"item",required:!1,transform:void 0}]}],depth:[{type:core.Input,args:[{isSignal:!0,alias:"depth",required:!1,transform:void 0}]}],padding:[{type:core.Input,args:[{isSignal:!0,alias:"padding",required:!1,transform:void 0}]}],childNodeName:[{type:core.Input,args:[{isSignal:!0,alias:"childNodeName",required:!1,transform:void 0}]}],template:[{type:core.Input,args:[{isSignal:!0,alias:"template",required:!1,transform:void 0}]}],childPadding:[{type:core.Input,args:[{isSignal:!0,alias:"childPadding",required:!1,transform:void 0}]}],treeItemClass:[{type:core.HostBinding,args:["class.tree__item-container"]}],treeItemInstance:[{type:core.HostBinding,args:["@treeItemInstance"]}]}}};TreeItemComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-tree-item",template:'<div class="tree__item_content" [ngClass]="\'tree__item_content-\' + computedDepth()" (click)="openItem()">\n  <ng-container\n    *ngTemplateOutlet="\n      template();\n      context: { $implicit: item(), item: item(), open: itemIsOpen(), service: treeService, depth: depth() }\n    "\n  ></ng-container>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,animations:[(0,animations.hZ)("treeItemInstance",[(0,animations.kY)("void => *",[(0,animations.iF)({opacity:"0"}),(0,animations.i0)(200,(0,animations.iF)({opacity:"1"}))])])],imports:[common.NgClass,common.NgTemplateOutlet],styles:[tree_item_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],TreeItemComponent);var scrollable_directive=__webpack_require__("./projects/components/src/directive/scrollable/scrollable.directive.ts"),scrollable_component=__webpack_require__("./projects/components/src/directive/scrollable/scrollable/scrollable.component.ts");let TreeComponent=class TreeComponent{constructor(){this.treeService=(0,core.inject)(tree_service.y),this.elementRef=(0,core.inject)(core.ElementRef),this.ngZone=(0,core.inject)(core.NgZone),this.data=(0,core.input)([]),this.padding=(0,core.input)(8),this.childNodeName=(0,core.input)("children"),this.virtual=(0,core.input)(!1),this.height=(0,core.input)(28),this.openItems=(0,core.model)([]),this.service=new core.EventEmitter,this.childPadding=(0,core.computed)((()=>this.data()?.some((_=>_[this.childNodeName()]?.length>0)))),this.displayData=(0,core.computed)((()=>this.getDisplayData(this.data(),0))),this._alive=!0,this.treeClass=!0,this.trackRow=(index,item)=>this.compareItems?this.compareItems(item):index,(0,core.effect)((()=>{this.treeService.setOpenItems(this.openItems())})),this.treeService.openItems.pipe((0,takeWhile.v)((_=>this._alive)),(0,filter.p)((_=>this.openItems()!==_))).subscribe((_=>{this.openItems.set(_),this.viewport?.checkViewportSize()}))}set compareItems(func){this.treeService.compareItems=func}get compareItems(){return this.treeService.compareItems}ngOnInit(){this.service.emit(this.treeService),this.addResizeObserver()}ngOnChanges(){this.viewport?.checkViewportSize()}ngOnDestroy(){this._alive=!1,this.removeResizeObserver()}ngAfterViewInit(){this.treeService.scrollToIndex.pipe((0,takeWhile.v)((()=>this._alive))).subscribe((index=>{this.ngZone.runOutsideAngular((()=>{setTimeout((()=>{this.viewport?.scrollToIndex(index,"smooth")}))}))}))}getDisplayData(data,level){const result=[];return data?.forEach((item=>{item.level=level,result.push(item),item[this.childNodeName()]?.length>0&&this.openItems()?.find((openItem=>this.compareItems(openItem)===this.compareItems(item)))&&result.push(...this.getDisplayData(item[this.childNodeName()],level+1))})),result}addResizeObserver(){this._obs=new ResizeObserver((_=>{this.viewport?.checkViewportSize()})),this._obs.observe(this.elementRef.nativeElement)}removeResizeObserver(){this._obs.unobserve(this.elementRef.nativeElement),this._obs.disconnect()}static{this.ctorParameters=()=>[]}static{this.propDecorators={data:[{type:core.Input,args:[{isSignal:!0,alias:"data",required:!1,transform:void 0}]}],padding:[{type:core.Input,args:[{isSignal:!0,alias:"padding",required:!1,transform:void 0}]}],childNodeName:[{type:core.Input,args:[{isSignal:!0,alias:"childNodeName",required:!1,transform:void 0}]}],virtual:[{type:core.Input,args:[{isSignal:!0,alias:"virtual",required:!1,transform:void 0}]}],height:[{type:core.Input,args:[{isSignal:!0,alias:"height",required:!1,transform:void 0}]}],openItems:[{type:core.Input,args:[{isSignal:!0,alias:"openItems",required:!1}]},{type:core.Output,args:["openItemsChange"]}],service:[{type:core.Output}],viewport:[{type:core.ViewChild,args:[scrolling.d6,{static:!1}]}],template:[{type:core.ContentChild,args:[teta_template_directive.i,{static:!0}]}],compareItems:[{type:core.Input}],treeClass:[{type:core.HostBinding,args:["class.tree"]}]}}};TreeComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-tree",template:'@if (virtual()) {\n  <teta-scrollable class="column column_auto">\n    <cdk-virtual-scroll-viewport tetaScrollable class="table-body-container" [itemSize]="height()">\n      <teta-tree-item\n        *cdkVirtualFor="let item of displayData(); templateCacheSize: 0; trackBy: trackRow"\n        [item]="item"\n        [style.height.px]="height()"\n        [depth]="item[\'level\']"\n        [padding]="padding()"\n        [childNodeName]="childNodeName()"\n        [childPadding]="childPadding()"\n        [template]="template?.template"\n      ></teta-tree-item>\n    </cdk-virtual-scroll-viewport>\n  </teta-scrollable>\n} @else {\n  <teta-scrollable class="column column_auto" direction="column">\n    @for (item of displayData(); track trackRow($index, item)) {\n      <teta-tree-item\n        [item]="item"\n        [style.height.px]="height()"\n        [depth]="item[\'level\']"\n        [padding]="padding()"\n        [childNodeName]="childNodeName()"\n        [childPadding]="childPadding()"\n        [template]="template?.template"\n      ></teta-tree-item>\n    }\n  </teta-scrollable>\n}\n',providers:[tree_service.y],changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[scrollable_component.x,scrolling.d6,scrolling.yg,scrollable_directive.r,scrolling.E$,TreeItemComponent],styles:[tree_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],TreeComponent)},"./projects/components/src/directive/let/let.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>LetDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let LetDirective=class LetDirective{constructor(viewContainer,templateRef){viewContainer.createEmbeddedView(templateRef,new LetContext(this))}static ngTemplateContextGuard(_dir,_ctx){return!0}static{this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,args:[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef]}]},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,args:[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef]}]}]}static{this.propDecorators={tetaLet:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}]}}};LetDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaLet]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],LetDirective);class LetContext{constructor(internalDirectiveInstance){this.internalDirectiveInstance=internalDirectiveInstance}get $implicit(){return this.internalDirectiveInstance.tetaLet}get tetaLet(){return this.internalDirectiveInstance.tetaLet}}},"./projects/components/src/directive/scrollable/scrollable.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ScrollableDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ScrollableDirective=class ScrollableDirective{constructor(){this.hideScrollClass=!0}static{this.propDecorators={hideScrollClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class.scrollable_hide_scroll"]}]}}};ScrollableDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaScrollable]",standalone:!0})],ScrollableDirective)},"./projects/components/src/directive/scrollable/scrollable/scrollable.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>ScrollableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var scrollable_componentngResource=__webpack_require__("./projects/components/src/directive/scrollable/scrollable/scrollable.component.scss?ngResource"),scrollable_componentngResource_default=__webpack_require__.n(scrollable_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),debounceTime=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js"),animationFrame=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),scrollable_directive=__webpack_require__("./projects/components/src/directive/scrollable/scrollable.directive.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),let_directive=__webpack_require__("./projects/components/src/directive/let/let.directive.ts");let ScrollableComponent=class ScrollableComponent{constructor(){this.direction="row",this.showScrollbars=!1,this.scroll=new core.EventEmitter,this._scrollSize=new Subject.B,this._alive=!0,this._observe=()=>{this._scrollSize.next()},this.scrollSize=this._scrollSize.asObservable().pipe((0,debounceTime.B)(100,animationFrame.X),(0,map.T)((()=>{const{scrollHeight,clientHeight,scrollWidth,clientWidth}=this._container.nativeElement;return{scrollHeight,clientHeight,scrollWidth,clientWidth}})),(0,distinctUntilChanged.F)(((previous,current)=>previous.scrollHeight===current.scrollHeight&&previous.clientHeight===current.clientHeight&&previous.scrollWidth===current.scrollWidth&&previous.clientWidth===current.clientWidth)),(0,shareReplay.t)({refCount:!0,bufferSize:1})),this.resizeObserver=new ResizeObserver(this._observe),this.mutationObserver=new MutationObserver(this._observe)}scrollVertical(event){this._container.nativeElement.scrollTop=event.target.scrollTop}scrollHorizontal(event){this._container.nativeElement.scrollLeft=event.target.scrollLeft}ngOnInit(){this._container=this._scrollableWrapper,this._scrollDirective&&(this._container=this._scrollDirective),(0,fromEvent.R)(this._container.nativeElement,"scroll").pipe((0,takeWhile.v)((()=>this._alive)),(0,tap.M)((event=>{this._scrollbarHorizontal.nativeElement.scrollLeft=event.target.scrollLeft,this._scrollbarVertical.nativeElement.scrollTop=event.target.scrollTop,this.scroll.emit(event)}))).subscribe(),this.resizeObserver.observe(this._container.nativeElement),this.mutationObserver.observe(this._container.nativeElement,{attributes:!1,childList:!0,subtree:!0})}ngOnDestroy(){this._alive=!1,this.resizeObserver.unobserve(this._container.nativeElement),this.resizeObserver.disconnect(),this.mutationObserver.disconnect()}static{this.ctorParameters=()=>[]}static{this.propDecorators={_scrollDirective:[{type:core.ContentChild,args:[scrollable_directive.r,{static:!0,read:core.ElementRef}]}],_scrollableWrapper:[{type:core.ViewChild,args:["scrollableWrapper",{static:!0}]}],_scrollbarVertical:[{type:core.ViewChild,args:["scrollbarVertical",{static:!0}]}],_scrollbarHorizontal:[{type:core.ViewChild,args:["scrollbarHorizontal",{static:!0}]}],direction:[{type:core.Input}],showScrollbars:[{type:core.Input},{type:core.HostBinding,args:["class.show-scrollbars"]}],contentClass:[{type:core.Input}],scroll:[{type:core.Output}]}}};ScrollableComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-scrollable",template:'<div class="scroll-controls" *tetaLet="scrollSize | async as scrollSize">\n  <div\n    #scrollbarVertical\n    [class.display-none]="scrollSize?.scrollHeight <= scrollSize?.clientHeight"\n    class="scroll-scrollbar scroll-scrollbar-vertical"\n    (scroll)="scrollVertical($event)"\n  >\n    <div [style.height.px]="scrollSize?.scrollHeight" style="width: 1px"></div>\n  </div>\n  <div\n    #scrollbarHorizontal\n    [class.display-none]="scrollSize?.scrollWidth <= scrollSize?.clientWidth"\n    class="scroll-scrollbar scroll-scrollbar-horizontal"\n    (scroll)="scrollHorizontal($event)"\n  >\n    <div [style.width.px]="scrollSize?.scrollWidth" style="height: 1px"></div>\n  </div>\n</div>\n\n<div #scrollableWrapper class="scroll-content-wrapper" [ngClass]="contentClass" [class.column]="direction === \'column\'">\n  <ng-content></ng-content>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[let_directive.N,common.NgClass,common.AsyncPipe,scrollable_directive.r],styles:[scrollable_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],ScrollableComponent)},"./projects/components/src/directive/teta-template/teta-template.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{i:()=>TetaTemplateDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TetaTemplateDirective=class TetaTemplateDirective{constructor(template){this.template=template}getId(){return this.id}static{this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]}static{this.propDecorators={id:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["tetaTemplate"]}]}}};TetaTemplateDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaTemplate]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],TetaTemplateDirective)},"./projects/components/src/component/tree/Tree.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basicTree:()=>basicTree,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _tree_tree_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/tree/tree/tree.component.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),_directive_teta_template_teta_template_directive__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./projects/components/src/directive/teta-template/teta-template.directive.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/Tree",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)()]})],component:_tree_tree_component__WEBPACK_IMPORTED_MODULE_2__.g},basicTree=()=>({moduleMetadata:{imports:[_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.BrowserAnimationsModule,_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_4__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_5__._,_directive_teta_template_teta_template_directive__WEBPACK_IMPORTED_MODULE_6__.i]},props:{data:treeData},template:'<teta-tree  [tetaIconSprite]="\'assets/icons.svg\'" style="width: 400px;" [data]="data">\n  <ng-template tetaTemplate let-item>\n    <teta-icon [name]="item.icon" class="fill-text-30 margin-right-2"></teta-icon> {{item.name}}\n  </ng-template>\n</teta-tree>'}),treeData=[{name:"Тетакомовское м-р (4)",icon:"layers",children:[{name:"Скважины для тестирования",icon:"folder",children:[{name:"Тестовая скважина №1",icon:"well",children:[]},{name:"Стресс-тест",icon:"well",children:[]}]}]},{name:"Test only (1)",icon:"layers",children:[{name:"Group (1)",icon:"folder",children:[{name:"well",icon:"well",children:[{name:"ГИС",icon:"map",children:[]},{name:"Конструкция",icon:"tubes",children:[]},{name:"D1",icon:"angle",children:[]},{name:"Дизайн №1 copy",icon:"angle",children:[{name:"Зоны продуктивности",children:[]},{name:"План закачки",children:[]},{name:"Опции",children:[]},{name:"Результаты",children:[]}]}]}]}]}],__namedExportsOrder=["basicTree"];basicTree.parameters={...basicTree.parameters,docs:{...basicTree.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [BrowserAnimationsModule, IconComponent, IconSpriteDirective, TetaTemplateDirective]\n  },\n  props: {\n    data: treeData\n  },\n  template: `<teta-tree  [tetaIconSprite]="\'assets/icons.svg\'" style="width: 400px;" [data]="data">\n  <ng-template tetaTemplate let-item>\n    <teta-icon [name]="item.icon" class="fill-text-30 margin-right-2"></teta-icon> {{item.name}}\n  </ng-template>\n</teta-tree>`\n})',...basicTree.parameters?.docs?.source}}}},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/tree/tree-item/tree-item.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/tree/tree/tree.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/directive/scrollable/scrollable/scrollable.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  overflow: hidden;\n  position: relative;\n  z-index: 0;\n  display: flex;\n}\n:host:hover .scroll-controls {\n  opacity: 1;\n}\n:host.show-scrollbars .scroll-controls {\n  opacity: 1;\n}\n\n:host::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.scroll-content-wrapper {\n  display: flex;\n  overflow: auto;\n  flex-grow: 1;\n}\n.scroll-content-wrapper::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.scroll-content {\n  position: relative;\n  z-index: 0;\n  flex: 1;\n  display: flex;\n  height: auto;\n  min-width: 0;\n}\n\n.scroll-controls {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.5s linear;\n}\n\n.scroll-scrollbar {\n  position: absolute;\n  overflow: auto;\n  pointer-events: auto;\n}\n.scroll-scrollbar-vertical {\n  right: 0;\n  top: 0;\n  bottom: 12px;\n  width: 12px;\n}\n.scroll-scrollbar-horizontal {\n  right: 12px;\n  left: 0;\n  bottom: 0;\n  height: 12px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);