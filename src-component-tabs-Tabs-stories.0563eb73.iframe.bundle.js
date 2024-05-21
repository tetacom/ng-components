(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[6551],{"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static#_=IconService_1=this;static#_2=this._loaded=[];static#_3=this._pending=[];constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static#_4=this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static#_=this.ctorParameters=()=>[{type:IconService}];static#_2=this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var TetaSize,icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}));var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=TetaSize.M}get getClass(){const result=[this.class,"icon"];return this.palette&&result.push(`icon-${this.palette}`),result.join(" ")}getName(){return`#${this.name}`}static#_=this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%;height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/component/tabs/tab-content.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>TabContentDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabContentDirective=class TabContentDirective{constructor(template){this.template=template}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]};TabContentDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaTabContent]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],TabContentDirective)},"./projects/components/src/component/tabs/tab-title.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{X:()=>TabTitleDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabTitleDirective=class TabTitleDirective{constructor(template){this.template=template}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]};TabTitleDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaTabTitle]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],TabTitleDirective)},"./projects/components/src/component/tabs/tab/tab.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{j:()=>TabComponent});var tslib__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_tab_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/tabs/tab/tab.component.scss?ngResource"),_tab_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_tab_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_4__),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_tab_content_directive__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/tabs/tab-content.directive.ts"),_tab_title_directive__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/components/src/component/tabs/tab-title.directive.ts");let nextId=0,TabComponent=class TabComponent{constructor(){this.id="teta-tab-"+nextId++,this.disabled=!1}ngAfterContentChecked(){}static#_=this.propDecorators={id:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],title:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],disabled:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],titleTpl:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,args:[_tab_title_directive__WEBPACK_IMPORTED_MODULE_1__.X,{static:!1}]}],contentTpl:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,args:[_tab_content_directive__WEBPACK_IMPORTED_MODULE_2__.A,{static:!1}]}]}};TabComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_3__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component)({selector:"teta-tab",template:"",changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[_tab_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_4___default()]})],TabComponent)},"./projects/components/src/component/tabs/tabs/tabs.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>TabsComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var tabs_componentngResource=__webpack_require__("./projects/components/src/component/tabs/tabs/tabs.component.scss?ngResource"),tabs_componentngResource_default=__webpack_require__.n(tabs_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tab_component=__webpack_require__("./projects/components/src/component/tabs/tab/tab.component.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let TabsComponent=class TabsComponent{get verticalClassTabs(){return"vertical"===this.direction}constructor(){this.classTabs=!0,this.direction="horizontal",this.size="m",this.destroyOnHide=!0,this.tabChange=new core.EventEmitter}select(tabId){const selectedTab=this._getTabById(tabId);if(selectedTab&&!selectedTab.disabled&&this.activeId!==selectedTab.id){let defaultPrevented=!1;this.tabChange.emit({activeId:this.activeId,nextId:selectedTab.id,preventDefault:()=>{defaultPrevented=!0}}),defaultPrevented||(this.activeId=selectedTab.id)}}ngAfterContentChecked(){const activeTab=this._getTabById(this.activeId);this.activeId=activeTab?activeTab.id:this.tabs.length?this.tabs.first.id:null}_getTabById(id){const tabsWithId=this.tabs.filter((tab=>tab.id===id));return tabsWithId.length?tabsWithId[0]:null}static#_=this.ctorParameters=()=>[];static#_2=this.propDecorators={classTabs:[{type:core.HostBinding,args:["class.tabs"]}],verticalClassTabs:[{type:core.HostBinding,args:["class.tabs_vertical"]}],activeId:[{type:core.Input}],direction:[{type:core.Input}],size:[{type:core.Input}],destroyOnHide:[{type:core.Input}],tabChange:[{type:core.Output}],tabs:[{type:core.ContentChildren,args:[tab_component.j]}]}};TabsComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-tabs",template:'<div role="tablist" class="tabs-head" [class.tabs-head_small]="size === \'s\'">\n  @for (tab of tabs; track tab) {\n  <button\n    type="button"\n    class="tabs-head-item"\n    (click)="select(tab.id)"\n    [class.tabs-head-item_active]="tab.id === activeId"\n    [disabled]="tab.disabled"\n  >\n    <span\n      [id]="tab.id"\n      class="tabs-title"\n      role="tab"\n      [attr.tabindex]="tab.disabled ? \'-1\' : undefined"\n      [attr.aria-controls]="!destroyOnHide || tab.id === activeId ? tab.id + \'-panel\' : null"\n      [attr.aria-expanded]="tab.id === activeId"\n      [attr.aria-disabled]="tab.disabled"\n    >\n      {{ tab.title }}\n      <ng-template [ngTemplateOutlet]="tab.titleTpl?.template"></ng-template>\n    </span>\n  </button>\n  }\n</div>\n<div class="tabs-content">\n  @for (tab of tabs; track tab) { @if (!destroyOnHide || tab.id === activeId) {\n  <ng-template [ngTemplateOutlet]="tab.contentTpl?.template"></ng-template>\n  } }\n</div>\n',standalone:!0,imports:[common.NgTemplateOutlet],styles:[tabs_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],TabsComponent)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0,exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${key}($event)"`:`[${key}]="${key}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}})},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/src/component/tabs/Tabs.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basicTabs:()=>basicTabs,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledTab:()=>disabledTab,smallTabs:()=>smallTabs,verticalTabs:()=>verticalTabs});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/component/tabs/tabs/tabs.component.ts"),_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./projects/components/src/component/tabs/tab/tab.component.ts"),_tab_title_directive__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./projects/components/src/component/tabs/tab-title.directive.ts"),_tab_content_directive__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./projects/components/src/component/tabs/tab-content.directive.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/Tabs",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.q1)]})],moduleMetadata:{imports:[]}},basicTabs=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_3__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._,_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.O,_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.j,_tab_title_directive__WEBPACK_IMPORTED_MODULE_7__.X,_tab_content_directive__WEBPACK_IMPORTED_MODULE_8__.A]},props:{},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Табы</h1>\n    <teta-tabs>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>'}),verticalTabs=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_3__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._,_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.O,_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.j,_tab_title_directive__WEBPACK_IMPORTED_MODULE_7__.X,_tab_content_directive__WEBPACK_IMPORTED_MODULE_8__.A]},props:{},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Вертикальные табы</h1>\n    <teta-tabs direction="vertical">\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>'}),smallTabs=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_3__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._,_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.O,_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.j,_tab_title_directive__WEBPACK_IMPORTED_MODULE_7__.X,_tab_content_directive__WEBPACK_IMPORTED_MODULE_8__.A]},props:{},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Табы маленького размера</h1>\n    <teta-tabs size="s">\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>'}),disabledTab=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_3__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._,_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.O,_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.j,_tab_title_directive__WEBPACK_IMPORTED_MODULE_7__.X,_tab_content_directive__WEBPACK_IMPORTED_MODULE_8__.A]},props:{},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Неактивные табы</h1>\n    <teta-tabs >\n      <teta-tab  [disabled]="true">\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab [disabled]="true">\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>'});basicTabs.parameters={...basicTabs.parameters,docs:{...basicTabs.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective]\n  },\n  props: {},\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Табы</h1>\n    <teta-tabs>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>`\n})',...basicTabs.parameters?.docs?.source}}},verticalTabs.parameters={...verticalTabs.parameters,docs:{...verticalTabs.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective]\n  },\n  props: {},\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Вертикальные табы</h1>\n    <teta-tabs direction="vertical">\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>`\n})',...verticalTabs.parameters?.docs?.source}}},smallTabs.parameters={...smallTabs.parameters,docs:{...smallTabs.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective]\n  },\n  props: {},\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Табы маленького размера</h1>\n    <teta-tabs size="s">\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab>\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>`\n})',...smallTabs.parameters?.docs?.source}}},disabledTab.parameters={...disabledTab.parameters,docs:{...disabledTab.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective]\n  },\n  props: {},\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-3">\n    <h1 style="margin-bottom: 0.5em">Неактивные табы</h1>\n    <teta-tabs >\n      <teta-tab  [disabled]="true">\n        <ng-template tetaTabTitle>\n          <teta-icon [name]="\'calendar\'"></teta-icon>Результат\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_accent">\n            <div class="container">\n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.\n            </div>\n          </div>\n        </ng-template>\n      </teta-tab>\n      <teta-tab [disabled]="true">\n        <ng-template tetaTabTitle>\n          Код\n        </ng-template>\n        <ng-template tetaTabContent>\n          <div class="area area_code">\n           CODE\n          </div>\n        </ng-template>\n      </teta-tab>\n    </teta-tabs>\n  </div>`\n})',...disabledTab.parameters?.docs?.source}}};const __namedExportsOrder=["basicTabs","verticalTabs","smallTabs","disabledTab"]},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/tabs/tab/tab.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/tabs/tabs/tabs.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);