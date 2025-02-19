(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[403,4808],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./projects/components/src/common/enum/teta-size.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TetaSize;__webpack_require__.d(__webpack_exports__,{K:()=>TetaSize}),function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}))},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"icon"];switch(this.palette&&result.push(`icon-${this.palette}`),this.size){case teta_size_enum.K.XL:result.push("icon-xl");break;case teta_size_enum.K.L:result.push("icon-l");break;case teta_size_enum.K.M:result.push("icon-m");break;case teta_size_enum.K.S:result.push("icon-s");break;case teta_size_enum.K.XS:result.push("icon-xs")}return result.join(" ")}getName(){return`#${this.name}`}static{this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%; height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/docs/listDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_list_List_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/list/List.stories.ts");function _createMdxContent(props){const _components={p:"p",...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{of:_src_component_list_List_stories__WEBPACK_IMPORTED_MODULE_4__.default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column gap-24",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1",{children:"Лист"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Лист - список элементов идущих подряд."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Лист обычно используется в дропдаунах, селектах и в деревьях"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Как использовать"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Сначала необходимо создать блок с классом ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"list"})," внутрь передать несколько элементов с классом"," ","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"list-item"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Если нужно чтобы список элементов был интерактивным, элементам списка необходимо дополнительно добавить класс"," ","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"list-item_interactive"})]})})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./projects/components/src/component/list/List.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basicList:()=>basicList,default:()=>__WEBPACK_DEFAULT_EXPORT__,interactiveList:()=>interactiveList});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/List",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)()]})]},basicList=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_2__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_3__._]},template:'<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-10">\n<div class="list shadow-1" style="width: 200px">\n  <div class="list-item">\n    <teta-icon [name]="\'user\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Jerome Bell\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'calendar\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Courtney Henry\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'eye\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Wade Warren\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'folder\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Ralph Edwards\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'map\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Marvin McKinney\n  </div>\n</div>\n</div>'}),interactiveList=()=>({moduleMetadata:{imports:[_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_2__.R,_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_3__._]},template:'<div class="padding-10">\n<div class="list shadow-1" style="width: 200px">\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'user\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Jerome Bell\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'calendar\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Courtney Henry\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'eye\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Wade Warren\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'folder\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Ralph Edwards\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'map\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Marvin McKinney\n  </div>\n</div>\n</div>'}),__namedExportsOrder=["basicList","interactiveList"];basicList.parameters={...basicList.parameters,docs:{...basicList.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'" class="padding-10">\n<div class="list shadow-1" style="width: 200px">\n  <div class="list-item">\n    <teta-icon [name]="\'user\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Jerome Bell\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'calendar\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Courtney Henry\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'eye\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Wade Warren\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'folder\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Ralph Edwards\n  </div>\n  <div class="list-item">\n    <teta-icon [name]="\'map\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Marvin McKinney\n  </div>\n</div>\n</div>`\n})',...basicList.parameters?.docs?.source}}},interactiveList.parameters={...interactiveList.parameters,docs:{...interactiveList.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  template: `<div class="padding-10">\n<div class="list shadow-1" style="width: 200px">\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'user\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Jerome Bell\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'calendar\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Courtney Henry\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'eye\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Wade Warren\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'folder\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Ralph Edwards\n  </div>\n  <div class="list-item list-item_interactive">\n    <teta-icon [name]="\'map\'" [palette]="\'text\'" class="margin-right-2"></teta-icon>Marvin McKinney\n  </div>\n</div>\n</div>`\n})',...interactiveList.parameters?.docs?.source}}}},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);