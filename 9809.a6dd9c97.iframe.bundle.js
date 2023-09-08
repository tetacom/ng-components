(self.webpackChunkteta_components=self.webpackChunkteta_components||[]).push([[9809],{"./projects/components/src/common/contract/dynamic-data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>DynamicData});class DynamicData{constructor(value){for(const key in value)value.hasOwnProperty(key)&&(this[key]=value[key])}}},"./projects/components/src/common/enum/align.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var Align;__webpack_require__.d(__webpack_exports__,{x:()=>Align}),function(Align){Align[Align.left=0]="left",Align[Align.right=1]="right",Align[Align.center=2]="center",Align[Align.auto=3]="auto",Align[Align.fitWidth=4]="fitWidth",Align[Align.minWidth=5]="minWidth",Align[Align.outerLeft=6]="outerLeft",Align[Align.outerRight=7]="outerRight",Align[Align.outerAuto=8]="outerAuto"}(Align||(Align={}))},"./projects/components/src/common/enum/vertical-align.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var VerticalAlign;__webpack_require__.d(__webpack_exports__,{g:()=>VerticalAlign}),function(VerticalAlign){VerticalAlign[VerticalAlign.top=0]="top",VerticalAlign[VerticalAlign.bottom=1]="bottom",VerticalAlign[VerticalAlign.center=2]="center",VerticalAlign[VerticalAlign.auto=3]="auto",VerticalAlign[VerticalAlign.innerTop=4]="innerTop",VerticalAlign[VerticalAlign.innerBottom=5]="innerBottom",VerticalAlign[VerticalAlign.innerAuto=6]="innerAuto"}(VerticalAlign||(VerticalAlign={}))},"./projects/components/src/common/service/dynamic-component.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>DynamicComponentService});var _class,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),dynamic_data=__webpack_require__("./projects/components/src/common/contract/dynamic-data.ts");class TetaContentRef{constructor(nodes,viewRef,componentRef){this.nodes=nodes,this.viewRef=viewRef,this.componentRef=componentRef}}let DynamicComponentService=((_class=class DynamicComponentService{constructor(_componentFactoryResolver,_rendererFactory,_appRef){this._componentFactoryResolver=_componentFactoryResolver,this._rendererFactory=_rendererFactory,this._appRef=_appRef,this._renderer=this._rendererFactory.createRenderer(null,null)}createComponent(component,contentRef,injector,container){const componentRef=this._componentFactoryResolver.resolveComponentFactory(component).create(injector,contentRef.nodes);return this._appRef.attachView(componentRef.hostView),container.appendChild(componentRef.location.nativeElement),componentRef}createContent(content,injector,context){if(null==content)throw new Error("Content is undefined");return"string"==typeof content?this.fromString(content):content instanceof core.TemplateRef?this.fromTemplate(content,context):this.fromComponent(content,injector,context)}destroy(component,content,container){component&&(this._appRef.detachView(component.hostView),component.destroy()),content&&content.viewRef&&content.viewRef.destroy(),content=null}getContext(content,context){return content instanceof core.TemplateRef?{$implicit:context,data:context}:context}getInjector(data,parent){return core.Injector.create({providers:[{provide:dynamic_data.W,useValue:data}],parent})}fromString(content){return new TetaContentRef([[this._renderer.createText(`${content}`)]])}fromTemplate(content,context){const viewRef=content.createEmbeddedView(context);return this._appRef.attachView(viewRef),new TetaContentRef([viewRef.rootNodes],viewRef)}fromComponent(content,injector,context){const componentRef=this._componentFactoryResolver.resolveComponentFactory(content).create(injector);for(const key in context)Object.prototype.hasOwnProperty.call(context,key)&&(componentRef.instance[key]=context[key]);const componentNativeEl=componentRef.location.nativeElement;return this._appRef.attachView(componentRef.hostView),new TetaContentRef([[componentNativeEl]],componentRef.hostView,componentRef)}}).ctorParameters=()=>[{type:core.ComponentFactoryResolver},{type:core.RendererFactory2},{type:core.ApplicationRef}],_class);DynamicComponentService=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],DynamicComponentService)},"./projects/components/src/common/util/array-util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>ArrayUtil});class ArrayUtil{static asArray(value){return null==value?[]:value instanceof Array?value:[value]}static flatten(data,children,onlyLeafs){const result=[];return data.forEach((child=>{let childItems=[];children?("string"==typeof children&&(childItems=child[children]),"function"==typeof children&&(childItems=children(child))):childItems=child.children,null!=childItems&&childItems.length>0?(onlyLeafs||result.push(child),result.push(...ArrayUtil.flatten(childItems,children,onlyLeafs))):result.push(child)})),result}static findRecursive(tree,comparer,children="children"){const found=tree.find((x=>comparer(x)));if(null!=found)return found;for(let i=0,l=tree.length;i<l;i++){const item=tree[i];if(item[children]&&item[children].length){const res=ArrayUtil.findRecursive(item[children],comparer);if(null!=res)return res}}return null}static filterRecursive(array,filter,children="children",keepChildren=!0,fullscanChildren=!1){const result=[];if(array&&array.length)for(const item of array){const resultItem=Object.assign({},item);if(filter(resultItem)){if(result.push(resultItem),!keepChildren){if(resultItem[children]=[],fullscanChildren)continue;break}}else if(item[children]&&item[children].length>0){resultItem[children]=[];const found=ArrayUtil.filterRecursive(item[children],filter,children,keepChildren,fullscanChildren);found?.length>0&&(resultItem[children]=found,result.push(resultItem))}}return result}static distinct(array,comparator){const result=[];if(array&&array.length)for(const item of array){result.find((_=>comparator(_)===comparator(item)))||result.push(item)}return result}static findParents(tree,item){if(tree?.indexOf(item)>=0)return tree;if(Array.isArray(tree))for(const treeNode of tree){const childResult=this.findParents(treeNode.children,item);if(Array.isArray(childResult))return[treeNode].concat(childResult)}return null}static moveItem(list,sourceIndex,targetIndex){const res=[...list],item=list[sourceIndex];return targetIndex>sourceIndex?(res.splice(targetIndex,0,item),res.splice(sourceIndex,1)):(res.splice(sourceIndex,1),res.splice(targetIndex,0,item)),res}}},"./projects/components/src/common/util/dom-util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>DomUtil});class DomUtil{static clickedInside(target,event){return!!target&&event.composedPath().indexOf(target)>=0}static findTransformedParent(node){for(;null!==node&&"BODY"!==node.tagName;){if("none"!==getComputedStyle(node).transform)return node;node=node.parentNode}return null}static isOverflown(element){return element.scrollHeight>element.clientHeight||element.scrollWidth>element.clientWidth}}},"./projects/components/src/common/util/position-util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>PositionUtil});var _enum_align_enum__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts");class PositionUtil{static getPosition(containerPosition,elementPosition,align,verticalAlign,margin=0,verticalMargin=0,transformedParentRect={left:0,right:0,top:0,bottom:0}){const rect={},elementWidth=elementPosition.right-elementPosition.left,elementHeight=elementPosition.bottom-elementPosition.top,containerWidth=containerPosition.right-containerPosition.left;containerPosition.bottom,containerPosition.top;return align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.auto&&(align=_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.left,window.innerWidth<containerPosition.left+elementWidth&&(align=_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.right)),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.left&&(rect.left=containerPosition.left+margin),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.right&&(rect.left=containerPosition.right-elementWidth-margin),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.center&&(rect.left=(containerPosition.left+containerPosition.right)/2-elementWidth/2),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.outerAuto&&(align=_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.outerRight,window.innerWidth<containerPosition.right+elementWidth&&(align=_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.outerLeft)),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.outerLeft&&(rect.left=containerPosition.left-elementWidth+margin),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.outerRight&&(rect.left=containerPosition.right-margin),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.fitWidth&&(rect.left=containerPosition.left+margin,rect.right=window.innerWidth-containerPosition.right+margin),align===_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.minWidth&&(rect.left=containerPosition.left+margin,rect.minWidth=containerWidth),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.auto&&(verticalAlign=containerPosition.bottom+elementHeight>window.innerHeight&&containerPosition.bottom>=window.innerHeight/2?_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.top:_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.bottom),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerAuto&&(verticalAlign=containerPosition.bottom+elementHeight>window.innerHeight&&containerPosition.bottom>=window.innerHeight/2?_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerTop:_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerBottom),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.top&&(rect.top=containerPosition.top-elementHeight-verticalMargin),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.bottom&&(rect.top=containerPosition.bottom+verticalMargin),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerTop&&(rect.top=containerPosition.bottom-elementHeight-verticalMargin),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerBottom&&(rect.top=containerPosition.top+verticalMargin),verticalAlign===_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.center&&(rect.top=(containerPosition.top+containerPosition.bottom)/2-elementHeight/2),rect.left+elementWidth>window.innerWidth&&(rect.left=window.innerWidth-elementWidth),rect.left<0&&(rect.left=0),(rect.top+elementHeight>window.innerHeight||rect.bottom<0)&&(rect.bottom=0),rect.top<0&&(rect.top=0),verticalAlign!==_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.bottom&&verticalAlign!==_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.center&&verticalAlign!==_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerBottom||(rect.maxHeight=window.innerHeight-rect.top),verticalAlign!==_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.top&&verticalAlign!==_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.innerTop||(rect.maxHeight=containerPosition.top),isNaN(rect.left)||(rect.left=rect.left-transformedParentRect.left),isNaN(rect.right)||(rect.right=rect.right-transformedParentRect.left),isNaN(rect.top)||(rect.top=rect.top-transformedParentRect.top),isNaN(rect.bottom)||(rect.bottom=rect.bottom?rect.bottom-transformedParentRect.bottom:rect.bottom),rect}static setElementPosition(element,rect){element.style.left=null!=rect.left?`${rect.left}px`:"",element.style.right=null!=rect.right?`${rect.right}px`:"",element.style.top=null!=rect.top?`${rect.top}px`:"",element.style.bottom=null!=rect.bottom?`${rect.bottom}px`:"",element.style.maxHeight=null!=rect.maxHeight?`${rect.maxHeight}px`:"",element.style.minWidth=null!=rect.minWidth?`${rect.minWidth}px`:""}static getMaxHeight(position){let maxHeight=null;return maxHeight=1,1}static getMaxWidth(position){let maxWidth=null;return maxWidth=1,1}}},"./projects/components/src/component/dynamic-component/dynamic-component.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{K:()=>DynamicComponentModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/component/dynamic-component/popup-content/popup-content.component.ts");let DynamicComponentModule=class DynamicComponentModule{};DynamicComponentModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({declarations:[_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_0__.B],exports:[_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_0__.B],imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]})],DynamicComponentModule)},"./projects/components/src/component/dynamic-component/popup-content/popup-content.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>PopupContentComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,popup_content_componentngResource=__webpack_require__("./projects/components/src/component/dynamic-component/popup-content/popup-content.component.scss?ngResource"),popup_content_componentngResource_default=__webpack_require__.n(popup_content_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),array_util=__webpack_require__("./projects/components/src/common/util/array-util.ts"),animations=__webpack_require__("./node_modules/@angular/animations/fesm2022/animations.mjs");let PopupContentComponent=((_class=class PopupContentComponent{get getClass(){return[...array_util.g.asArray(this.className),"popup-content"].join(" ")}constructor(){this.dialog=!0}addClass(className){this.className?("string"==typeof this.className&&(this.className=className),this.className instanceof Array&&this.className.push(className)):this.className=[className]}ngOnInit(){}ngOnDestroy(){}}).ctorParameters=()=>[],_class.propDecorators={dialog:[{type:core.HostBinding,args:["@dialog"]}],className:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);PopupContentComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-popup-content",template:"<ng-content></ng-content>\n",animations:[(0,animations.X$)("dialog",[(0,animations.eR)("void => *",[(0,animations.oB)({opacity:"0"}),(0,animations.jt)(200,(0,animations.oB)({opacity:"1"}))]),(0,animations.eR)("* => void",[(0,animations.jt)(200,(0,animations.oB)({opacity:"0"}))])])],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[popup_content_componentngResource_default()]})],PopupContentComponent)},"./projects/components/src/component/icon/icon.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>IconModule});var _class,IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=((_class=class IconService{constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.eN(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.U)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}})._loaded=[],_class._pending=[],_class.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.jN},{type:fesm2022_http.eN}],IconService_1=_class);var icon_sprite_directive_class;IconService=IconService_1=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],IconService);let IconSpriteDirective=((icon_sprite_directive_class=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}}).ctorParameters=()=>[{type:IconService}],icon_sprite_directive_class.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]},icon_sprite_directive_class);IconSpriteDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaIconSprite]"})],IconSpriteDirective);var icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");let IconModule=class IconModule{};IconModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[icon_component.o,IconSpriteDirective],exports:[icon_component.o,IconSpriteDirective],imports:[common.CommonModule,fesm2022_http.JF]})],IconModule)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var TetaSize,_class,icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}));let IconComponent=((_class=class IconComponent{constructor(){this.size=TetaSize.M}get getClass(){const result=[this.class,"icon"];return this.palette&&result.push(`icon-${this.palette}`),result.join(" ")}getName(){return`#${this.name}`}}).propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);IconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/directive/dynamic-content-base.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>DynamicContentBaseDirective});var _class,tslib__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_operators__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts"),_common_service_dynamic_component_service__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/common/service/dynamic-component.service.ts"),_component_dynamic_component_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/component/dynamic-component/popup-content/popup-content.component.ts");let DynamicContentBaseDirective=((_class=class DynamicContentBaseDirective{set open(open){this._open=open,this._open?this.createContentRef():this.destroyContentRef()}constructor(_document,_elementRef,_service,_injector,_zone,_cdr){this._document=_document,this._elementRef=_elementRef,this._service=_service,this._injector=_injector,this._zone=_zone,this._cdr=_cdr,this.align=_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_0__.x.left,this.verticalAlign=_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_1__.g.auto,this.appendToBody=!1,this.openChange=new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter,this._alive=!0,this._open=!1,this._zone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.o)((_=>this._alive)),(0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.h)((_=>this._open))).subscribe((_=>{this.setPosition()}))}ngOnDestroy(){this._alive=!1,this.destroyContentRef()}createContentRef(className){if(!this._componentRef){this._open=!0;const injector=this._service.getInjector(this.data,this._injector),context=this._service.getContext(this._dynamicContent,this.data);this._content=this._service.createContent(this._dynamicContent,this._injector,context),this._componentRef=this._service.createComponent(_component_dynamic_component_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_3__.B,this._content,injector,this.appendToBody?this._document.body:this._elementRef.nativeElement),className&&this._componentRef.instance.addClass(className)}return this._componentRef}destroyContentRef(){this._open=!1,this._service.destroy(this._componentRef,this._content,this.appendToBody?this._document.body:this._elementRef.nativeElement),this._componentRef=null}}).ctorParameters=()=>[{type:void 0},{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef},{type:_common_service_dynamic_component_service__WEBPACK_IMPORTED_MODULE_2__.a},{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector},{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone},{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef}],_class.propDecorators={data:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],className:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],align:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],verticalAlign:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],appendToBody:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],open:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Input}],openChange:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_4__.Output}]},_class);DynamicContentBaseDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_7__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Directive)()],DynamicContentBaseDirective)},"./projects/components/src/component/dynamic-component/popup-content/popup-content.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);