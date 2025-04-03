(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[220,3926],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/docs/progressBarDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_progress_bar_ProgressBar_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/progress-bar/ProgressBar.stories.ts");function _createMdxContent(props){const _components={code:"code",h1:"h1",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_src_component_progress_bar_ProgressBar_stories__WEBPACK_IMPORTED_MODULE_4__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"слайдер",children:"Слайдер"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Progress bars (Слайдер) — это элемент управления страницей, который позволяет пользователю выбирать значение из определенного диапазона. Он представляет собой горизонтальную полосу, которую можно перемещать влево или вправо, чтобы выбрать значение в заданном диапазоне. Слайдеры часто используются для настройки параметров, выбора числовых значений (например, громкости, времени или яркости) или фильтрации данных."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"функции",children:"Функции"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Slider выполняет следующие основные функции:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Выбор значения в заданном диапазоне: Слайдер позволяет пользователю выбирать значение из определенного числового диапазона."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Отображение текущего значения: Слайдер отображает текущее выбранное значение, что позволяет пользователям видеть, какое значение они выбрали"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Изменение значения в реальном времени: Когда пользователь перемещает бегунок слайдера, значение обновляется в реальном времени, что делает процесс выбора более наглядным и удобным."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Вы можете настроить шаг, с которым изменяется значение при перемещении бегунка слайдера."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"как-использовать",children:"Как использовать"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Для создания слайдера существует компонент ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"teta-progress-bar"}),". Для передачи данных в него нужно использовать ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ngModel"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:'Также в слайдере есть возможность настройки "шага". Это происходит с помощью передачи в него свойства step'}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"свойства",children:"Свойства"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Тип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"number"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Выбор значения, на которое ползунок сдвигается при его перемещении"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"min"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"number"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Минимальное значение слайдера"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"max"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"number"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Максимальное значение слайдера"})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./projects/components/src/component/progress-bar/ProgressBar.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>ProgressBar_stories,sample:()=>sample});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var progress_bar_componentngResource=__webpack_require__("./projects/components/src/component/progress-bar/progress-bar/progress-bar.component.scss?ngResource"),progress_bar_componentngResource_default=__webpack_require__.n(progress_bar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");const SLIDER_CONTROL_VALUE_ACCESSOR={provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>ProgressBarComponent)),multi:!0};let ProgressBarComponent=class ProgressBarComponent{set value(value){this._value=value,this.percent=this.setPercentFromValue(),this._cdr.detectChanges()}get value(){return this._value}get containerPosition(){const rect=this._elementRef.nativeElement.getBoundingClientRect();return{min:rect.x,max:rect.x+rect.width}}constructor(_elementRef,_renderer,_cdr,_document){this._elementRef=_elementRef,this._renderer=_renderer,this._cdr=_cdr,this._document=_document,this.min=0,this.max=100,this.step=0,this.progressBar=!0,this.click=event=>{this.getMousePositionInPercents(event)},this.mousedown=()=>{this.moving=!0,this.preventGlobalMouseEvents(),this.addListener()},this.mousemove=event=>{event.preventDefault(),this.getMousePositionInPercents(event)},this.getMousePositionInPercents=event=>{const position=event.clientX-this.containerPosition.min;let percent=100/(this.containerPosition.max-this.containerPosition.min)*position;percent=percent<=0?0:percent>100?100:percent,this.setValue(this.getValueFromPercent(percent))},this.preventGlobalMouseEvents=()=>{this._document.body.style["pointer-events"]="none"},this.restoreGlobalMouseEvents=()=>{this._document.body.style["pointer-events"]="auto"}}mouseup(){this.moving=!1,this.restoreGlobalMouseEvents(),this.removeListener()}onChange(_){}onTouched(){}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){this.onTouched=fn}setDisabledState(isDisabled){}writeValue(value){this.value=value}ngOnInit(){}setValue(value){this.value=value,this.onChange(this.value)}getValueFromPercent(percent){if(0===percent)return this.min;if(100===percent)return this.max;const exactValue=this.min+percent*(this.max-this.min)/100;return!this.step||this.step<=0||isNaN(this.step)?exactValue:Math.round((exactValue-this.min)/this.step)*this.step+this.min}addListener(){this._document.addEventListener("mousemove",this.mousemove)}removeListener(){this._document.removeEventListener("mousemove",this.mousemove)}setPercentFromValue(){return 100/(this.max-this.min)*(this.value-this.min)}static{this.ctorParameters=()=>[{type:core.ElementRef},{type:core.Renderer2},{type:core.ChangeDetectorRef},{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]}]}static{this.propDecorators={min:[{type:core.Input}],max:[{type:core.Input}],step:[{type:core.Input}],slider:[{type:core.ViewChild,args:["progressSlider",{static:!0}]}],progressBar:[{type:core.HostBinding,args:["class.progress"]}],mouseup:[{type:core.HostListener,args:["document:mouseup",["$event"]]}],click:[{type:core.HostListener,args:["click",["$event"]]}]}}};ProgressBarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-progress-bar",template:'<div class="progress-bar" [style.width.%]="percent"></div>\n<div\n  class="progress-slider"\n  [class.progress-slider_visible]="moving"\n  #progressSlider\n  (mousedown)="mousedown()"\n  (click)="click($event)"\n  [style.left.%]="percent"\n></div>\n',providers:[SLIDER_CONTROL_VALUE_ACCESSOR],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[progress_bar_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef,core.Renderer2,core.ChangeDetectorRef,Object])],ProgressBarComponent);const ProgressBar_stories={title:"Component/ProgressBar",moduleMetadata:{imports:[fesm2022_forms.YN]},argTypes:{step:{control:{type:"number"}},min:{control:{type:"number"}},max:{control:{type:"number"}},value:{control:{type:"number"}}},args:{min:0,max:100,value:50,step:0}},sample=args=>({moduleMetadata:{imports:[fesm2022_forms.YN,ProgressBarComponent],entryComponents:[]},props:args,template:'<div class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">\n              <teta-progress-bar [min]="min" [max]="max" [step]="step" [(ngModel)]="value"></teta-progress-bar>\n            </div>'}),__namedExportsOrder=["sample"];sample.parameters={...sample.parameters,docs:{...sample.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, ProgressBarComponent],\n    entryComponents: []\n  },\n  props: args,\n  template: `<div class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">\n              <teta-progress-bar [min]="min" [max]="max" [step]="step" [(ngModel)]="value"></teta-progress-bar>\n            </div>`\n})',...sample.parameters?.docs?.source}}}},"./projects/components/src/component/progress-bar/progress-bar/progress-bar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);