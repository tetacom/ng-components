(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[515,7721],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/radio/radio-button/radio-button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{d:()=>RadioButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var radio_button_componentngResource=__webpack_require__("./projects/components/src/component/radio/radio-button/radio-button.component.scss?ngResource"),radio_button_componentngResource_default=__webpack_require__.n(radio_button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),radio_component=__webpack_require__("./projects/components/src/component/radio/radio/radio.component.ts");let RadioButtonComponent=class RadioButtonComponent{set value(val){this._value=val}get value(){return void 0===this._value&&this.container.element.nativeElement instanceof HTMLElement?this.container.element.nativeElement.innerText:this._value}constructor(container,radio){this.container=container,this.radio=radio,this.radioButton=!0}hostClick(){this.disabled||this.radio._setChecked(this)}ngOnInit(){this.radio._addButton(this)}ngOnDestroy(){this.radio._removeButton(this)}static{this.ctorParameters=()=>[{type:core.ViewContainerRef},{type:radio_component.v,decorators:[{type:core.Host}]}]}static{this.propDecorators={radioButton:[{type:core.HostBinding,args:["class.radio-button"]}],selected:[{type:core.HostBinding,args:["class.radio-button-selected"]}],checked:[{type:core.Input},{type:core.HostBinding,args:["class.radio-button-checked"]}],disabled:[{type:core.Input},{type:core.HostBinding,args:["class.radio-button_disabled"]}],value:[{type:core.Input}],hostClick:[{type:core.HostListener,args:["click"]}]}}};RadioButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-radio-button",template:'<div class="radio-button-icon">\n  @if (checked) {\n    <div class="radio-button-small-icon"></div>\n  }\n</div>\n<ng-content></ng-content>\n',encapsulation:core.ViewEncapsulation.None,standalone:!0,styles:[radio_button_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef,radio_component.v])],RadioButtonComponent)},"./projects/components/src/component/radio/radio/radio.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{v:()=>RadioComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var radio_componentngResource=__webpack_require__("./projects/components/src/component/radio/radio/radio.component.scss?ngResource"),radio_componentngResource_default=__webpack_require__.n(radio_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs");let RadioComponent=class RadioComponent{set disabled(val){this.disabled$=val,this.buttons$.forEach((b=>b.disabled=this.disabled))}get disabled(){return this.disabled$}get value(){return this.checkedButton$?this.checkedButton$.value:null}set value(val){this.writeValue(val)}constructor(_cdr){this._cdr=_cdr,this.tabindex=0,this.radioClass=!0,this.checkChangeSelected=!0,this.buttons$=[],this.disabled$=!1,this._onChange=()=>{},this._onTouched=()=>{}}focusHandler(event){this.selectFirst()}focusoutHandler(event){this.selectedButton$&&(this.selectedButton$.selected=!1,this.selectedButton$=null)}keyEvent(event){switch(event.code||event.key){case"Space":case"Enter":case"Spacebar":this.checkSelected();break;case"ArrowUp":case"Up":case"ArrowLeft":case"Left":this.selectPrevious();break;case"ArrowDown":case"Down":case"ArrowRight":case"Right":this.selectNext();break;default:return!1}return event.cancelBubble=!0,event.stopPropagation&&event.stopPropagation(),!1}selectFirst(){if(!this.selectedButton$){if(this.checkedButton$)return this.selectedButton$=this.checkedButton$,this.selectedButton$.selected=!0,!0;for(const btn of this.buttons$)if(!btn.disabled)return this.selectedButton$=btn,this.selectedButton$.selected=!0,!0}return!1}_setChecked(btn){this.checkedButton$&&(this.checkedButton$.checked=!1),this.checkedButton$=btn,this.checkedButton$.checked=!0,this.selectedButton$&&(this.selectedButton$.selected=!1),this.selectedButton$=btn,this.selectedButton$.selected=!0,this._onChange(this.value),this._cdr.markForCheck()}_addButton(btn){return this.disabled&&(btn.disabled=this.disabled),this.buttons$.push(btn)-1}_removeButton(btn){const index=this.buttons$.indexOf(btn);index>-1&&this.buttons$.splice(index,1)}writeValue(obj){this.checkedButton$&&(this.checkedButton$.checked=!1),this.checkedButton$=this.buttons$.find((b=>b.value===obj)),this.checkedButton$&&(this.checkedButton$.checked=!0),this._cdr.markForCheck()}registerOnChange(fn){this._onChange=fn}registerOnTouched(fn){this._onTouched=fn}setDisabledState(isDisabled){this.disabled=isDisabled,this._cdr.markForCheck()}selectBtn(btn){this.selectedButton$&&(this.selectedButton$.selected=!1),this.selectedButton$=btn,this.selectedButton$.selected=!0,this.checkChangeSelected&&this.checkSelected(),this._cdr.markForCheck()}selectNext(){if(this.selectFirst())return;const length=this.buttons$.length;let newIndex=this.selectedButton$?this.buttons$.indexOf(this.selectedButton$):0,firstCycle=!0;do{newIndex++,firstCycle&&newIndex===length&&(newIndex=0,firstCycle=!1);const btn=this.buttons$[newIndex];if(btn&&!btn.disabled)return void this.selectBtn(btn)}while(newIndex<length)}selectPrevious(){if(this.selectFirst())return;let newIndex=this.selectedButton$?this.buttons$.indexOf(this.selectedButton$):0,firstCycle=!0;do{newIndex--,firstCycle&&-1===newIndex&&(newIndex=this.buttons$.length-1,firstCycle=!1);const btn=this.buttons$[newIndex];if(btn&&!btn.disabled)return void this.selectBtn(btn)}while(newIndex>=0)}checkSelected(){this.selectFirst()||this.selectedButton$&&this._setChecked(this.selectedButton$)}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={tabindex:[{type:core.HostBinding,args:["tabindex"]}],radioClass:[{type:core.HostBinding,args:["class.radio"]}],inline:[{type:core.Input},{type:core.HostBinding,args:["class.radio_inline"]}],checkChangeSelected:[{type:core.Input}],disabled:[{type:core.Input}],value:[{type:core.Input}],focusHandler:[{type:core.HostListener,args:["focus",["$event"]]}],focusoutHandler:[{type:core.HostListener,args:["focusout",["$event"]]}],keyEvent:[{type:core.HostListener,args:["keydown",["$event"]]}]}}};RadioComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-radio",template:"<ng-content></ng-content>\n",providers:[{provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>RadioComponent)),multi:!0}],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[radio_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],RadioComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/docs/radioDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_radio_Radio_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/radio/Radio.stories.ts");function _createMdxContent(props){const _components={p:"p",...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_src_component_radio_Radio_stories__WEBPACK_IMPORTED_MODULE_4__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column gap-24",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1",{children:"Радиокнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{class:"column",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Radiobutton (радиокнопка) — компонент, который используется для выбора одного значения из нескольких."})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Функции"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"радиокнопку используют, когда вариантов выбора немного и стараются не задавать им два значения. Разрешено\nиспользовать не более трех радиокнопок."})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"В качестве навигации их использовать не стоит, так как для этого лучше подходят табы (ссылка), навигационные\nпанели и группу выбора."})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"При клике пользователь переводит радиокнопку из состояния False в Active."})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Как использовать"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Создаем обертку для наших радиокнопок при помощи ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"teta-radio"}),". радиокнопки которые лежат внутри будут\nобъединены в лист радиокнопок, т.е. среди них может быть выделен только один."]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Для создания радиокнопки нужно использовать ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"teta-radio-button"}),". Свойство ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"value"}),"-\nсвоеобразный id для листа с радиокнопками"]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Для взаимодействия с листом радиокнопок, нужно передавать в компонент ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"teta-radio"})," свойство"," ","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"ngModel"})," со значением свойства ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"value"})," выбранного ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"teta-radio-button"})]})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Свойства"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4",{children:"teta-radio"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Tип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tbody",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"inline"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Выстраивает радиокнопки в линию"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"disabled"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Отключает взаимодействие со всем листом радиокнопок"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"value"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"number"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство для взаимодействия с листом радиокнопок (аналог ngModel)"})})]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4",{children:"teta-radio-button"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Tип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tbody",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"value"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"number"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство, которое является id радиокнопки. Испорльзуется при выборе радиокнопки."})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"disabled"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Отключает взаимодействие с радиокнопкой"})})]})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./projects/components/src/component/radio/Radio.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,baseRadioButton:()=>baseRadioButton,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledRadioButton:()=>disabledRadioButton});var _radio_radio_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/radio/radio/radio.component.ts"),_angular_forms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),_radio_button_radio_button_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/radio/radio-button/radio-button.component.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/Radio",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)()]})],component:_radio_radio_component__WEBPACK_IMPORTED_MODULE_2__.v,moduleMetadata:{imports:[]}},baseRadioButton=()=>({moduleMetadata:{imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN,_radio_button_radio_button_component__WEBPACK_IMPORTED_MODULE_4__.d,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_5__._]},template:'<div class="padding-4 bg-panel-50" [tetaIconSprite]="\'assets/icons.svg\'">\n    <teta-radio  [ngModel]="2">\n      <teta-radio-button [value]="1">1</teta-radio-button>\n      <teta-radio-button [value]="2">2</teta-radio-button>\n    </teta-radio>\n  </div>'}),disabledRadioButton=()=>({moduleMetadata:{imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN,_radio_button_radio_button_component__WEBPACK_IMPORTED_MODULE_4__.d,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_5__._]},template:'<div class="padding-4 bg-panel-50" [tetaIconSprite]="\'assets/icons.svg\'">\n    <teta-radio  [ngModel]="3">\n      <teta-radio-button [value]="3" [disabled]="true">3</teta-radio-button>\n      <teta-radio-button [disabled]="true">4</teta-radio-button>\n    </teta-radio>\n  </div>'}),__namedExportsOrder=["baseRadioButton","disabledRadioButton"];baseRadioButton.parameters={...baseRadioButton.parameters,docs:{...baseRadioButton.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [FormsModule, RadioButtonComponent, IconSpriteDirective]\n  },\n  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="\'assets/icons.svg\'">\n    <teta-radio  [ngModel]="2">\n      <teta-radio-button [value]="1">1</teta-radio-button>\n      <teta-radio-button [value]="2">2</teta-radio-button>\n    </teta-radio>\n  </div>`\n})',...baseRadioButton.parameters?.docs?.source}}},disabledRadioButton.parameters={...disabledRadioButton.parameters,docs:{...disabledRadioButton.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [FormsModule, RadioButtonComponent, IconSpriteDirective]\n  },\n  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="\'assets/icons.svg\'">\n    <teta-radio  [ngModel]="3">\n      <teta-radio-button [value]="3" [disabled]="true">3</teta-radio-button>\n      <teta-radio-button [disabled]="true">4</teta-radio-button>\n    </teta-radio>\n  </div>`\n})',...disabledRadioButton.parameters?.docs?.source}}}},"./projects/components/src/component/radio/radio-button/radio-button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/radio/radio/radio.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);