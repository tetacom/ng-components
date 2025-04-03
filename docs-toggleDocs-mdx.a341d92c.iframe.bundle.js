(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[2428,7955],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/toggle/toggle/toggle.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ToggleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var toggle_componentngResource=__webpack_require__("./projects/components/src/component/toggle/toggle/toggle.component.scss?ngResource"),toggle_componentngResource_default=__webpack_require__.n(toggle_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");const TOGGLE_CONTROL_VALUE_ACCESSOR={provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>ToggleComponent)),multi:!0};let ToggleComponent=class ToggleComponent{get paletteClass(){return this.palette?`toggle-button-${this.palette}`:""}get model(){return this.model$}set model(v){v!==this.model$&&(this.model$=v,this.onChange(v))}constructor(cdr){this.cdr=cdr,this.tabindex=0,this.toggleClass=!0,this.palette="primary"}changeValue(){this.disabled||(this.model=!this.model)}writeValue(model){this.model$=model,this.cdr.markForCheck()}onChange(_){}onTouched(){}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){this.onTouched=fn}setDisabledState(isDisabled){this.disabled=isDisabled,this.cdr.markForCheck()}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={tabindex:[{type:core.HostBinding,args:["attr.tabindex"]}],toggleClass:[{type:core.HostBinding,args:["class.toggle"]}],palette:[{type:core.Input}],noLabel:[{type:core.Input}],disabled:[{type:core.HostBinding,args:["class.toggle_disabled"]},{type:core.Input}],changeValue:[{type:core.HostListener,args:["click"]}]}}};ToggleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-toggle",template:'@if (!noLabel) {\n  <span class="font-body-3 row_auto">\n    <ng-content></ng-content>\n  </span>\n}\n<div class="toggle-button" [class.toggle-button-on]="model" [ngClass]="paletteClass">\n  <div class="toggle-button-circle"></div>\n</div>\n',providers:[TOGGLE_CONTROL_VALUE_ACCESSOR],changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[common.NgClass],styles:[toggle_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],ToggleComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/docs/toggleDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_toggle_Toggle_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/toggle/Toggle.stories.ts");function _createMdxContent(props){const _components={code:"code",h1:"h1",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_src_component_toggle_Toggle_stories__WEBPACK_IMPORTED_MODULE_4__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"переключатель",children:"Переключатель"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Toggle (переключатель) — компонент, который позволяет переключаться между состояниями."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"функции",children:"Функции"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Функционально тогл — аналог чекбокса, но контекст их использования может отличаться. Тогл нельзя использовать для выбора элементов в списке. Например, выбрать несколько параметров."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Тогл больше и заметнее чекбокса. Хорошо, когда на странице 1 тогл, максимум 2–3."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"как-использовать",children:"Как использовать"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"teta-toggle"})," - компонент для создание тогла. Для управления его состоянием используется ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ngModel"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"свойства",children:"Свойства"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Тип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"noLabel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Свойство, которое отображает/скрывает блок текста в тогле"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"disabled"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Отключает взаимодействие со всем листом радиокнопок"})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./projects/components/src/component/toggle/Toggle.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,baseToggle:()=>baseToggle,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledToggle:()=>disabledToggle});var _toggle_toggle_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/toggle/toggle/toggle.component.ts"),_angular_forms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/Toggle",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)()]})],argTypes:{text:{control:{type:"text"}}},args:{text:"text"},component:_toggle_toggle_component__WEBPACK_IMPORTED_MODULE_2__.a,moduleMetadata:{imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN]}},baseToggle=args=>({moduleMetadata:{imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._]},props:args,template:'<teta-toggle [tetaIconSprite]="\'assets/icons.svg\'"\n              [ngModel]="value"\n              (ngModelChange)="setValue($event)">\n              {{text}}\n            </teta-toggle>\n            '}),disabledToggle=args=>({moduleMetadata:{imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__._]},props:args,template:'<teta-toggle [tetaIconSprite]="\'assets/icons.svg\'"\n               [disabled]="true"\n              [ngModel]="value"\n              (ngModelChange)="setValue($event)">\n              {{text}}\n            </teta-toggle>\n            '}),__namedExportsOrder=["baseToggle","disabledToggle"];baseToggle.parameters={...baseToggle.parameters,docs:{...baseToggle.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, IconSpriteDirective]\n  },\n  props: args,\n  template: `<teta-toggle [tetaIconSprite]="\'assets/icons.svg\'"\n              [ngModel]="value"\n              (ngModelChange)="setValue($event)">\n              {{text}}\n            </teta-toggle>\n            `\n})',...baseToggle.parameters?.docs?.source}}},disabledToggle.parameters={...disabledToggle.parameters,docs:{...disabledToggle.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, IconSpriteDirective]\n  },\n  props: args,\n  template: `<teta-toggle [tetaIconSprite]="\'assets/icons.svg\'"\n               [disabled]="true"\n              [ngModel]="value"\n              (ngModelChange)="setValue($event)">\n              {{text}}\n            </teta-toggle>\n            `\n})',...disabledToggle.parameters?.docs?.source}}}},"./projects/components/src/component/toggle/toggle/toggle.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);