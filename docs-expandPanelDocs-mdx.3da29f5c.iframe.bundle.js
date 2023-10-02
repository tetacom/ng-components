/*! For license information please see docs-expandPanelDocs-mdx.3da29f5c.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkteta_components=self.webpackChunkteta_components||[]).push([[7640,831],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./projects/components/src/component/expand-panel/ExpandPanel.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>ExpandPanel_stories,panel:()=>panel});var dist=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,expand_panel_componentngResource=__webpack_require__("./projects/components/src/component/expand-panel/expand-panel/expand-panel.component.scss?ngResource"),expand_panel_componentngResource_default=__webpack_require__.n(expand_panel_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ExpandPanelContentDirective=((_class=class ExpandPanelContentDirective{constructor(template){this.template=template}}).ctorParameters=()=>[{type:core.TemplateRef}],_class);var expand_panel_head_directive_class;ExpandPanelContentDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaExpandPanelContent]"})],ExpandPanelContentDirective);let ExpandPanelHeadDirective=((expand_panel_head_directive_class=class ExpandPanelHeadDirective{constructor(template){this.template=template}}).ctorParameters=()=>[{type:core.TemplateRef}],expand_panel_head_directive_class);var expand_panel_component_class;ExpandPanelHeadDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaExpandPanelHead]"})],ExpandPanelHeadDirective);let ExpandPanelComponent=((expand_panel_component_class=class ExpandPanelComponent{constructor(){this.open=!0,this.openChange=new core.EventEmitter,this.direction="left"}openPanel(){this.open=!0,this.openChange.emit(!0),this.saveCookie()}closePanel(){this.open=!1,this.openChange.emit(!1),this.saveCookie()}ngOnInit(){this.restoreCookie()}saveCookie(){this.cookieName?.length&&localStorage.setItem(this.cookieName,JSON.stringify(this.open))}restoreCookie(){if(!this.cookieName?.length)return;const cookie=localStorage.getItem(this.cookieName);this.open=null==cookie||JSON.parse(cookie),this.openChange.emit(this.open)}}).ctorParameters=()=>[],expand_panel_component_class.propDecorators={content:[{type:core.ContentChild,args:[ExpandPanelContentDirective,{static:!1}]}],head:[{type:core.ContentChild,args:[ExpandPanelHeadDirective,{static:!1}]}],placeholder:[{type:core.Input}],open:[{type:core.Input}],openChange:[{type:core.Output}],cookieName:[{type:core.Input}],direction:[{type:core.Input}]},expand_panel_component_class);ExpandPanelComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-expand-panel",template:"<ng-container *ngIf='open'>\n  <teta-toolbar\n    style='display: flex'\n    [style.justifyContent]=\"direction === 'right' ? 'space-between' : 'unset'\"\n    [style.flexDirection]=\"direction === 'right' ? 'row-reverse' : 'row'\">\n    <button\n      teta-button\n      [square]='true'\n      [palette]=\"'text'\"\n      [view]=\"'ghost'\"\n      (click)='closePanel()'\n    >\n      <teta-icon [palette]=\"'text'\" [name]=\"direction === 'right' ? 'start' : 'end'\"></teta-icon>\n    </button>\n    <span class='font-title-2' style='display: contents'>\n      <ng-container *ngTemplateOutlet='head?.template'></ng-container>\n    </span>\n  </teta-toolbar>\n  <ng-container *ngTemplateOutlet='content?.template'></ng-container>\n</ng-container>\n<ng-container *ngIf='!open'>\n  <div class='width-10 overflow-hidden' style='height: 100%;'>\n    <button\n      teta-button\n      style='\n        transform-origin: 0 0;\n        transform: rotate(-90deg) translateX(-100%);\n        margin: 6px;\n      '\n      [palette]=\"'text'\"\n      [view]=\"'ghost'\"\n      (click)='openPanel()'\n    >\n      <div class='font-button-2 nowrap'>{{ placeholder }}</div>\n      <teta-icon style='transform-origin: 0 0;transform: rotate(-90deg) translateX(-100%);'\n                 [palette]=\"'text'\" [name]=\"direction === 'right' ? 'start' : 'end'\"></teta-icon>\n    </button>\n  </div>\n</ng-container>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[expand_panel_componentngResource_default()]})],ExpandPanelComponent);var common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),delimiter_module=__webpack_require__("./projects/components/src/component/delimiter/delimiter.module.ts"),toolbar_module=__webpack_require__("./projects/components/src/component/toolbar/toolbar.module.ts"),button_module=__webpack_require__("./projects/components/src/component/button/button.module.ts"),icon_module=__webpack_require__("./projects/components/src/component/icon/icon.module.ts");let ExpandPanelModule=class ExpandPanelModule{};ExpandPanelModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[ExpandPanelComponent,ExpandPanelHeadDirective,ExpandPanelContentDirective],exports:[ExpandPanelComponent,ExpandPanelHeadDirective,ExpandPanelContentDirective],imports:[common.CommonModule,delimiter_module.z,toolbar_module.V,button_module.h,icon_module.Q]})],ExpandPanelModule);const ExpandPanel_stories={title:"Component/Expand Panel",decorators:[dist.withKnobs],component:ExpandPanelComponent,moduleMetadata:{imports:[ExpandPanelModule]}},panel=()=>({moduleMetadata:{imports:[ExpandPanelModule]},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="column bg-global-bgcard font-body-3 padding-3" style="width: fit-content;height: 500px">\n    <teta-expand-panel  class="column" [placeholder]="\'Фильтр\'" >\n    <ng-template tetaExpandPanelHead >Панель</ng-template>\n    <ng-template tetaExpandPanelContent >Содержимое</ng-template>\n</teta-expand-panel>\n  </div>'})},"./projects/components/src/component/button/button.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>ButtonModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_button_button_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/component/button/button/button.component.ts");let ButtonModule=class ButtonModule{};ButtonModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({declarations:[_button_button_component__WEBPACK_IMPORTED_MODULE_0__.r],imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],exports:[_button_button_component__WEBPACK_IMPORTED_MODULE_0__.r]})],ButtonModule)},"./projects/components/src/component/button/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,button_componentngResource=__webpack_require__("./projects/components/src/component/button/button/button.component.scss?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ButtonComponent=((_class=class ButtonComponent{get getClass(){const result=[this.class,"button"];switch(this.palette&&result.push(`button-${this.palette}`),this.view&&result.push(`button_${this.view}`),this.square&&result.push("button-square"),this.size){case"l":result.push("font-button-1");break;case"m":result.push("font-button-2")}return result.push(`button_${this.viewType}`),result.join(" ")}constructor(){this.view="primary",this.square=!1,this.viewType="rounded",this.size="m"}ngOnInit(){}}).ctorParameters=()=>[],_class.propDecorators={palette:[{type:core.Input}],class:[{type:core.Input}],view:[{type:core.Input}],square:[{type:core.Input}],viewType:[{type:core.Input}],size:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);ButtonComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"button[teta-button], teta-button",template:"<ng-content></ng-content>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[button_componentngResource_default()]})],ButtonComponent)},"./projects/components/src/component/delimiter/delimiter.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{z:()=>DelimiterModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_delimiter_delimiter_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/component/delimiter/delimiter/delimiter.component.ts");let DelimiterModule=class DelimiterModule{};DelimiterModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({declarations:[_delimiter_delimiter_component__WEBPACK_IMPORTED_MODULE_0__.H],exports:[_delimiter_delimiter_component__WEBPACK_IMPORTED_MODULE_0__.H],imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]})],DelimiterModule)},"./projects/components/src/component/delimiter/delimiter/delimiter.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{H:()=>DelimiterComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,delimiter_componentngResource=__webpack_require__("./projects/components/src/component/delimiter/delimiter/delimiter.component.scss?ngResource"),delimiter_componentngResource_default=__webpack_require__.n(delimiter_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let DelimiterComponent=((_class=class DelimiterComponent{get getClass(){return[this.class,"delimiter",this.getBgColor(),"horizontal"===this.direction?"display-flex":"display-inline-flex"].join(" ")}get getHeight(){return"vertical"===this.direction?"":"1px"}get getWidth(){return"horizontal"===this.direction?"":"1px"}get getMargin(){return"horizontal"===this.direction?"8px":"0"}constructor(){this.direction="vertical",this.palette="text",this.height=32,this.verticalMargin=4,this.horizontalMargin=8}getBgColor(){return this.palette?`bg-${this.palette}-10`:""}ngOnInit(){}}).ctorParameters=()=>[],_class.propDecorators={direction:[{type:core.Input}],palette:[{type:core.Input}],height:[{type:core.Input}],verticalMargin:[{type:core.Input}],horizontalMargin:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}],getHeight:[{type:core.HostBinding,args:["style.height"]}],getWidth:[{type:core.HostBinding,args:["style.width"]}],getMargin:[{type:core.HostBinding,args:["style.margin"]}]},_class);DelimiterComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-delimiter",template:"",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[delimiter_componentngResource_default()]})],DelimiterComponent)},"./projects/components/src/component/icon/icon.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>IconModule});var _class,IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=((_class=class IconService{constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.eN(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.U)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}})._loaded=[],_class._pending=[],_class.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.jN},{type:fesm2022_http.eN}],IconService_1=_class);var icon_sprite_directive_class;IconService=IconService_1=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],IconService);let IconSpriteDirective=((icon_sprite_directive_class=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}}).ctorParameters=()=>[{type:IconService}],icon_sprite_directive_class.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]},icon_sprite_directive_class);IconSpriteDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaIconSprite]"})],IconSpriteDirective);var icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");let IconModule=class IconModule{};IconModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[icon_component.o,IconSpriteDirective],exports:[icon_component.o,IconSpriteDirective],imports:[common.CommonModule,fesm2022_http.JF]})],IconModule)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var TetaSize,_class,icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}));let IconComponent=((_class=class IconComponent{constructor(){this.size=TetaSize.M}get getClass(){const result=[this.class,"icon"];return this.palette&&result.push(`icon-${this.palette}`),result.join(" ")}getName(){return`#${this.name}`}}).propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);IconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%;height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/component/toolbar/toolbar.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{V:()=>ToolbarModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/component/toolbar/toolbar/toolbar.component.ts");let ToolbarModule=class ToolbarModule{};ToolbarModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({declarations:[_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.n],exports:[_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.n],imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]})],ToolbarModule)},"./projects/components/src/component/toolbar/toolbar/toolbar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>ToolbarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,toolbar_componentngResource=__webpack_require__("./projects/components/src/component/toolbar/toolbar/toolbar.component.scss?ngResource"),toolbar_componentngResource_default=__webpack_require__.n(toolbar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ToolbarComponent=((_class=class ToolbarComponent{get getClass(){const result=[this.class,"toolbar"];return this.palette&&result.push(`toolbar-${this.palette}`),result.join(" ")}ngOnInit(){}}).propDecorators={palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]},_class);ToolbarComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-toolbar",template:"<ng-content></ng-content>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[toolbar_componentngResource_default()]})],ToolbarComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/components/docs/expandPanelDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_expand_panel_ExpandPanel_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/expand-panel/ExpandPanel.stories.ts");function _createMdxContent(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.h_,{of:_src_component_expand_panel_ExpandPanel_stories__WEBPACK_IMPORTED_MODULE_2__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column gap-24",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1",{children:"ExpandPanel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{class:"column",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"ExpandPanel обычно используется для фильтров,отображения блоков, которые нужно скрывать, а также при большом\nколичестве элементов в одной строчке"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Функции"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"ExpandPanel позволяет скрывать содержимое при клике на соответствующую кнопку."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"При скрытии содержимого, название меняет написание на горизонтальное"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Как пользоваться компонентом"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p",{children:["Создаем ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:" <teta-expand-panel>"}),", внуть передаем блоки с\nдирективами ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"tetaExpandPanelHead"})," и ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"tetaExpandPanelContent"}),"."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p",{children:["Директива ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"tetaExpandPanelHead"})," отвечает за отображение дочерних элементов в шапке элемента."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p",{children:["Блок с директивой ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"tetaExpandPanelContent"})," используется как содержимое раскрывающейся панели."]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Примеры кода"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("pre",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="column bg-global-bgcard font-body-3 padding-3" style="width:fit-content;height: 500px">\n <teta-expand-panel placeholder=\'Фильтры\' >\n   <ng-template tetaExpandPanelHead>Фильтры</ng-template>\n   <ng-template tetaExpandPanelContent>\n    <div class="padding-v-3 padding-h-2">Фильтр1</div>\n   </ng-template>\n </teta-expand-panel>\n</div>'})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Свойства"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4",{children:"teta-expand-panel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Tип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tbody",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"placeholder"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"string"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Текст панели в закрытом состоянии"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"open"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство позволяющее управлять состоянием панели"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"openChange"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"function"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p",{children:["Указанная функция выполняется при изменении свойства ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"open"}),".Отдает текущее состояние."]})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"direction"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"'left'|'right'"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство для выбора направления скрытия панели"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"cookieName"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"string"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"При вводе этого свойства создается кука с указанным именем и с состоянием панели."})})]})]})]})]})]})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent()}},"./projects/components/src/component/button/button/button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/delimiter/delimiter/delimiter.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host.delimiter {\n  flex-shrink: 0;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/expand-panel/expand-panel/expand-panel.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 0;\n  flex-shrink: 0;\n  min-width: 0;\n  min-height: 0;\n  height: 100%;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/toolbar/toolbar/toolbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);