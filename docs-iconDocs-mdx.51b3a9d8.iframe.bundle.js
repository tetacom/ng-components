/*! For license information please see docs-iconDocs-mdx.51b3a9d8.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[9135,9157],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./projects/components/src/common/enum/teta-size.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TetaSize;__webpack_require__.d(__webpack_exports__,{K:()=>TetaSize}),function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}))},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static#_=IconService_1=this;static#_2=this._loaded=[];static#_3=this._pending=[];constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static#_4=this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static#_=this.ctorParameters=()=>[{type:IconService}];static#_2=this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"icon"];switch(this.palette&&result.push(`icon-${this.palette}`),this.size){case teta_size_enum.K.XL:result.push("icon-xl");break;case teta_size_enum.K.L:result.push("icon-l");break;case teta_size_enum.K.M:result.push("icon-m");break;case teta_size_enum.K.S:result.push("icon-s");break;case teta_size_enum.K.XS:result.push("icon-xs")}return result.join(" ")}getName(){return`#${this.name}`}static#_=this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%;height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[icon_componentngResource_default()]})],IconComponent)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0,exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${key}($event)"`:`[${key}]="${key}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}})},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/components/docs/iconDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_icon_Icon_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/icon/Icon.stories.ts");function _createMdxContent(props){const _components={code:"code",h1:"h1",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_src_component_icon_Icon_stories__WEBPACK_IMPORTED_MODULE_4__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"иконки",children:"Иконки"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Иконка — элемент графического интерфейса, небольшая картинка, обозначающая приложение, файл, каталог и т. п"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"В библиотеке существует два вида иконок: цветные и без заливки"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"функции",children:"Функции"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Иконки нужны для быстрого восприятия информации и помогают пользователю быстро и легко узнать о теме функции или\nкатегории, не используя текст."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Используются в различных компонентах:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Кнопки"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Инпуты"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Селекты"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Аккордеонах и т.п."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"как-использовать",children:"Как использовать"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Для создание иконки используется ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"teta-icon"})," и аттрибут ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"name"})," для указания названия иконки."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Для того, чтобы инконки загрузились в проект, необходимо в родительском компоненте или в корневом элементе добавить\nдирективу ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"tetaIconSprite"})," с указанием пакета с нужными иконками."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"На данный момент есть следующие пакеты с иконками:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"'assets/icons.svg'- обычые иконки без заливки"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"'assets/color-icons.svg'- цветные иконки"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"'assets/file-icons.svg'- иконки с типами файлов"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"'assets/lithotype-icons.svg'- иконки литотипов"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"пример-кода",children:"Пример кода"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<div [tetaIconSprite]=\"'assets/icons.svg'\" class=\"column bg-global-bgcard font-body-3 padding-3\">\n  <teta-icon name='edit'>\n  </teta-icon>\n </div>\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"свойства",children:"Свойства"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Tип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tbody",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"name"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"string"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Название иконки"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"size"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"TetaSize"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Размер иконки"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"palette"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"string"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Принимает название палитры и окращивает в 50-й оттенок этой палитры"})})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./projects/components/src/component/icon/Icon.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,coloredIcons:()=>coloredIcons,default:()=>Icon_stories,fileIcons:()=>fileIcons,icons:()=>icons,lithotypeIcons:()=>lithotypeIcons});var icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");const iconsList=["2d","3dView","add","addArea","addCircle","addCircleFilled","addComment","addVolume","arrowDown","arrowDownKey","arrowDownSmall","arrowLeft","arrowLeftKey","arrowLeftRight","arrowLeftSmall","arrowRight","arrowRightKey","arrowRightSmall","arrowUp","arrowUpDownSmall","arrowUpKey","arrowUpSmall","attach","autoscale","autoSize","autoSizeAll","back","backspace","bubbleChart","bullet","calc","calendar","camera","centerAlign","chart","checkCircle","checkCircleFilled","chisel","clock","clockChange","closeBig","closeCircle","closeCircleFilled","comment","compare","constructionWell","copy","copySelected","csv","cut","cutArea","darkMode","dash","delete","deleteSelected","detach","doc","docAndLiquid","document","documentAdd","documentAnalyze","dots","download","drag","drop","edit","end","equal","erase","export","eye","eyeCrossed","filter","filterApplied","filterClear","filterHide","filterShow","filterSortDown","filterSortUp","flag","folder","folderAdd","forward","fullScreen","gantt","gear","gis","grp","handbag","home","horizontal","horizontalWidget","hornerAnalysis","image","info","infoFilled","isoline","jpg","lamp","las","layers","leftAlign","lightMode","liner","link","liquid","list","lock","loop","magicWand","map","mapCard","menu","miniFrac","minus","monitoringDepth","monitoringTime","moreHorizontal","moreVertical","move","moveHorizontal","moveVertical","mud","multiCopy","newTemplate","nolteAnalysis","noSignal","open","opz","paste","pause","pc","pdf","photoCamera","photoCameraCrossed","pieChart","pin","pinCrossed","play","playBackRight","playForwardRight","png","print","question","questionFilled","redo","rewBack","rewForward","rightAlign","ring","ringWithCircle","roadMaps","ruler","save","search","settings","share","sideTube","sigma","signal","sortAZ","sortZA","square","srt","star","starFilled","start","stop","sum","table","tabletGraph","templateDownload","templateSettings","templateUpload","tick","tiles","timeOut","timePeriod","track","trackPeriod","txt","undo","unlock","update","upload","user","verticalWidget","warningFilled","warningStroke","well","wellConstruction","widgets","world","wrench","x","xls","y","zoom"],coloredIconsList=["areasColor","calcColor","calendarColor","coinColor","timeColor","colmatantColor","folderColor","geomechColor","gisColor","grpColor","handbagColor","improveColor","nktColor","sideTube","sumColor","opzColor","testFraq","wellColor","wellConstructionColor","analyzeGroupColor","barChart","chartLineColor","chartLineDashed","chartLineGradientColor","clusterColor","documentColor","favorite","filterColor","filterSortUpColor","filterSortDownColor","folderGroupColor","geoGroupColor","gisInnerColor","gisGroupColor","gisSimpleColor","grpGroupColor","grpAddColor","handbagAddColor","lineColor","lineGradientColor","lineDashedColor","liquidAddColor","liquidSystemColor","liquidUserColor","lithotypeColor","opzAddColor","mapColor","rigisGroupColor","sortUpColor","opzGroupColor","sortDownColor","testAnalyzeGroupColor","wellGroupColor","sumAddColor"],fileIconsList=["file_csv","file_doc","file_las","file_pdf","file_txt","file_xls"],lithotypeIconsList=["icon1","icon2","icon3","icon4","icon5","icon6","icon7","icon8","icon9","icon10","icon11","icon12","icon13","icon14"];var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts");const Icon_stories={title:"Component/Icon",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)()]})],component:icon_component.R,argTypes:{palette:{options:["primary","grey","red","white","green"],control:{type:"select"}},size:{options:[teta_size_enum.K.XS,teta_size_enum.K.S,teta_size_enum.K.M,teta_size_enum.K.L,teta_size_enum.K.XL],control:{type:"select"}},filter:{control:{type:"text"}}},args:{palette:"primary",size:teta_size_enum.K.L,filter:""},moduleMetadata:{imports:[]}},icons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:iconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/icons.svg\'">\n                <h1 style="margin-bottom: 1em">Обычые иконки без заливки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                    @for(icon of icons) {\n                      <div class="font-body-3" style="display: flex; align-items: center;">\n                        <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                        <span class="padding-left-4">{{icon}}</span>\n                      </div>\n                    }\n                </div>\n            </div>'}),coloredIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:coloredIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/color-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Цветные иконки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),fileIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:fileIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/file-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),lithotypeIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:lithotypeIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/lithotype-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),__namedExportsOrder=["icons","coloredIcons","fileIcons","lithotypeIcons"];icons.parameters={...icons.parameters,docs:{...icons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: iconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/icons.svg\'">\n                <h1 style="margin-bottom: 1em">Обычые иконки без заливки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                    @for(icon of icons) {\n                      <div class="font-body-3" style="display: flex; align-items: center;">\n                        <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                        <span class="padding-left-4">{{icon}}</span>\n                      </div>\n                    }\n                </div>\n            </div>`\n})',...icons.parameters?.docs?.source}}},coloredIcons.parameters={...coloredIcons.parameters,docs:{...coloredIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: coloredIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/color-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Цветные иконки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...coloredIcons.parameters?.docs?.source}}},fileIcons.parameters={...fileIcons.parameters,docs:{...fileIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: fileIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/file-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...fileIcons.parameters?.docs?.source}}},lithotypeIcons.parameters={...lithotypeIcons.parameters,docs:{...lithotypeIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: lithotypeIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/lithotype-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...lithotypeIcons.parameters?.docs?.source}}}},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);