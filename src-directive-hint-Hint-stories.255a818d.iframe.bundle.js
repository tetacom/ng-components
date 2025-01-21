"use strict";(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[3431],{"./projects/components/src/directive/hint/hint.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>HintDirective});var tslib__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts"),_common_service_dynamic_component_service__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./projects/components/src/common/service/dynamic-component.service.ts"),_common_util_array_util__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/common/util/array-util.ts"),_common_util_dom_util__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/common/util/dom-util.ts"),_common_util_position_util__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/common/util/position-util.ts"),_dynamic_content_base_directive__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/directive/dynamic-content-base.directive.ts");let HintDirective=class HintDirective extends _dynamic_content_base_directive__WEBPACK_IMPORTED_MODULE_0__.t{get _dynamicContent(){return this.tetaHint}constructor(_document,_elementRef,_service,_injector,_zone,_cdr){super(_document,_elementRef,_service,_injector,_zone,_cdr),this._document=_document,this._elementRef=_elementRef,this._service=_service,this._injector=_injector,this._zone=_zone,this._cdr=_cdr,this.align=_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_1__.W.center,this.verticalAlign=_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_2__.G.top,this.delay=300,this.viewType="rounded",this.overflownOnly=!1}mouseenter(){clearTimeout(this._timeout),this._timeout=setTimeout((()=>{this.createHint()}),this.delay)}mouseleave(){clearTimeout(this._timeout),this._open&&this._componentRef&&(this._timeout=setTimeout((()=>{this.destroyContentRef()}),this.delay))}click(event){this._open&&this._componentRef&&_common_util_dom_util__WEBPACK_IMPORTED_MODULE_3__.b.clickedInside(this._componentRef.location.nativeElement,event)&&event.stopPropagation()}setPosition(){if(this._componentRef&&this._open){this._componentRect||(this._componentRect=this._componentRef.location.nativeElement.getBoundingClientRect());const position=_common_util_position_util__WEBPACK_IMPORTED_MODULE_4__.o.getPosition(this._elementRef.nativeElement.getBoundingClientRect(),this._componentRect,this.align,this.verticalAlign,0,4);_common_util_position_util__WEBPACK_IMPORTED_MODULE_4__.o.setElementPosition(this._componentRef.location.nativeElement,position)}}createHint(){!this._dynamicContent||this.overflownOnly&&!_common_util_dom_util__WEBPACK_IMPORTED_MODULE_3__.b.isOverflown(this._elementRef.nativeElement)||(this._componentRef=this.createContentRef(),this._componentRef.instance.className=[..._common_util_array_util__WEBPACK_IMPORTED_MODULE_5__._.asArray(this.className),"hint ","hint_"+this.viewType])}ngOnDestroy(){super.ngOnDestroy()}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Inject,args:[_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT]}]},{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef},{type:_common_service_dynamic_component_service__WEBPACK_IMPORTED_MODULE_8__._},{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector},{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone},{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef}]}static{this.propDecorators={tetaHint:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],align:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],verticalAlign:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],delay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],viewType:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],overflownOnly:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.Input}],mouseenter:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.HostListener,args:["mouseenter",["$event"]]}],mouseleave:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.HostListener,args:["mouseleave",["$event"]]}],click:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_6__.HostListener,args:["click",["$event"]]}]}}};HintDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_9__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Directive)({selector:"[tetaHint]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_9__.Sn)("design:paramtypes",[Object,_angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef,_common_service_dynamic_component_service__WEBPACK_IMPORTED_MODULE_8__._,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone,_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef])],HintDirective)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js");exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}($event)"`:`[${key}]="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/portable-stories.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/portable-stories.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.setProjectAnnotations=void 0;const preview_api_1=__webpack_require__("storybook/internal/preview-api"),INTERNAL_DEFAULT_PROJECT_ANNOTATIONS=__importStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"));exports.setProjectAnnotations=function setProjectAnnotations(projectAnnotations){return(0,preview_api_1.setDefaultProjectAnnotations)(INTERNAL_DEFAULT_PROJECT_ANNOTATIONS),(0,preview_api_1.setProjectAnnotations)(projectAnnotations)}},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}})},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{module.exports=function(i){return i[1]}},"./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>takeWhile});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");function takeWhile(predicate,inclusive){return void 0===inclusive&&(inclusive=!1),(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){var index=0;source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,(function(value){var result=predicate(value,index++);(result||inclusive)&&subscriber.next(value),!result&&subscriber.complete()})))}))}},"./projects/components/src/directive/hint/Hint.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,fromString:()=>fromString,fromTemplate:()=>fromTemplate});var _component_dynamic_component_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./projects/components/src/component/dynamic-component/popup-content/popup-content.component.ts"),_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_component_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),_component_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),_component_button_button_button_component__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./projects/components/src/component/button/button/button.component.ts"),_hint_directive__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./projects/components/src/directive/hint/hint.directive.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Directive/Hint",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)(),(0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__.provideAnimations)()]})],argTypes:{align:{options:["Align.left"," Align.right","Align.center","Align.auto"],control:{type:"select"}},verticalAlign:{options:["VerticalAlign.bottom","VerticalAlign.top","VerticalAlign.center","VerticalAlign.auto","VerticalAlign.innerAuto","VerticalAlign.innerBottom","VerticalAlign.innerTop"],control:{type:"select"}},delay:{control:{type:"number"}},text:{control:{type:"text"}}},args:{verticalAlign:"VerticalAlign.auto",align:"Align.auto",text:"text",delay:50}},alignMap=(new Map).set("Align.left",_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_3__.W.left).set("Align.auto",_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_3__.W.auto).set("Align.center",_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_3__.W.center).set("Align.right",_common_enum_align_enum__WEBPACK_IMPORTED_MODULE_3__.W.right),valignMap=(new Map).set("VerticalAlign.bottom",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.bottom).set("VerticalAlign.top",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.top).set("VerticalAlign.center",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.center).set("VerticalAlign.auto",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.auto).set("VerticalAlign.innerAuto",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.innerAuto).set("VerticalAlign.innerBottom",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.innerBottom).set("VerticalAlign.innerTop",_common_enum_vertical_align_enum__WEBPACK_IMPORTED_MODULE_4__.G.innerTop),fromString=args=>({moduleMetadata:{imports:[_component_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.R,_component_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_6__._,_component_button_button_button_component__WEBPACK_IMPORTED_MODULE_7__.Q,_hint_directive__WEBPACK_IMPORTED_MODULE_8__.z],entryComponents:[_component_dynamic_component_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_9__.r]},props:{...args,valignMap,alignMap},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="bg-panel-50 padding-10 margin-10">\n              <button teta-button\n                     [palette]="\'primary\'"\n                     [tetaHint]="\'<div>text</div>\'"\n                     [align]="alignMap.get(align)"\n                     viewType="rounded"\n                     [verticalAlign]="valignMap.get(verticalAlign)"\n                     [delay]="delay"\n                     [className]="\'one\'">\n                <teta-icon [palette]="\'background\'" [name]="\'settings\'" class="margin-right-2"></teta-icon>\n                Hover me\n              </button>\n            </div>'}),fromTemplate=args=>({moduleMetadata:{imports:[_component_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.R,_component_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_6__._,_component_button_button_button_component__WEBPACK_IMPORTED_MODULE_7__.Q,_hint_directive__WEBPACK_IMPORTED_MODULE_8__.z],entryComponents:[_component_dynamic_component_popup_content_popup_content_component__WEBPACK_IMPORTED_MODULE_9__.r]},props:{...args,valignMap,alignMap},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="bg-panel-50 padding-10 margin-10">\n              <ng-template #hint>\n                <div>{{text}}</div>\n              </ng-template>\n              <button teta-button\n                     [palette]="\'primary\'"\n                     [tetaHint]="hint"\n                     [align]="align"\n                     [verticalAlign]="verticalAlign"\n                     [delay]="delay"\n                     [className]="\'one\'">\n                <teta-icon [palette]="\'background\'" [name]="\'settings\'" class="margin-right-2"></teta-icon>\n                Hover me\n              </button>\n            </div>'}),__namedExportsOrder=["fromString","fromTemplate"];fromString.parameters={...fromString.parameters,docs:{...fromString.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, ButtonComponent, HintDirective],\n    entryComponents: [PopupContentComponent]\n  },\n  props: {\n    ...args,\n    valignMap,\n    alignMap\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="bg-panel-50 padding-10 margin-10">\n              <button teta-button\n                     [palette]="\'primary\'"\n                     [tetaHint]="\'<div>text</div>\'"\n                     [align]="alignMap.get(align)"\n                     viewType="rounded"\n                     [verticalAlign]="valignMap.get(verticalAlign)"\n                     [delay]="delay"\n                     [className]="\'one\'">\n                <teta-icon [palette]="\'background\'" [name]="\'settings\'" class="margin-right-2"></teta-icon>\n                Hover me\n              </button>\n            </div>`\n})',...fromString.parameters?.docs?.source}}},fromTemplate.parameters={...fromTemplate.parameters,docs:{...fromTemplate.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, ButtonComponent, HintDirective],\n    entryComponents: [PopupContentComponent]\n  },\n  props: {\n    ...args,\n    valignMap,\n    alignMap\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="bg-panel-50 padding-10 margin-10">\n              <ng-template #hint>\n                <div>{{text}}</div>\n              </ng-template>\n              <button teta-button\n                     [palette]="\'primary\'"\n                     [tetaHint]="hint"\n                     [align]="align"\n                     [verticalAlign]="verticalAlign"\n                     [delay]="delay"\n                     [className]="\'one\'">\n                <teta-icon [palette]="\'background\'" [name]="\'settings\'" class="margin-right-2"></teta-icon>\n                Hover me\n              </button>\n            </div>`\n})',...fromTemplate.parameters?.docs?.source}}}}}]);