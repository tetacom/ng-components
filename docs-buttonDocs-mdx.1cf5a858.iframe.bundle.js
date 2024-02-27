/*! For license information please see docs-buttonDocs-mdx.1cf5a858.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[3407,9644],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./projects/components/src/component/button/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var button_componentngResource=__webpack_require__("./projects/components/src/component/button/button/button.component.scss?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ButtonComponent=class ButtonComponent{get getClass(){const result=[this.class,"button"];switch(this.palette&&result.push(`button-${this.palette}`),this.view&&result.push(`button_${this.view}`),this.square&&result.push("button-square"),this.size){case"l":result.push("font-button-1");break;case"m":result.push("font-button-2")}return result.push(`button_${this.viewType}`),result.join(" ")}constructor(){this.view="primary",this.square=!1,this.viewType="rounded",this.size="m"}ngOnInit(){}static#_=this.ctorParameters=()=>[];static#_2=this.propDecorators={palette:[{type:core.Input}],class:[{type:core.Input}],view:[{type:core.Input}],square:[{type:core.Input}],viewType:[{type:core.Input}],size:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}};ButtonComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"button[teta-button], teta-button",template:"<ng-content></ng-content>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[button_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[])],ButtonComponent)},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static#_=IconService_1=this;static#_2=this._loaded=[];static#_3=this._pending=[];constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.eN(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.U)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static#_4=this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.jN},{type:fesm2022_http.eN}]};IconService=IconService_1=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.w6)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.jN,fesm2022_http.eN])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static#_=this.ctorParameters=()=>[{type:IconService}];static#_2=this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}};IconSpriteDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.w6)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var TetaSize,icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}));var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=TetaSize.M}get getClass(){const result=[this.class,"icon"];return this.palette&&result.push(`icon-${this.palette}`),result.join(" ")}getName(){return`#${this.name}`}static#_=this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}};IconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%;height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive.M],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[icon_componentngResource_default()]})],IconComponent)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0,exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${key}($event)"`:`[${key}]="${key}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}})},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/components/src/component/button/Button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,allButtonTypes:()=>allButtonTypes,baseButton:()=>baseButton,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledButton:()=>disabledButton,squireButton:()=>squireButton});var _button_button_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/component/button/button/button.component.ts"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Component/Button",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.JF)]})],argTypes:{viewType:{options:["rounded","brick","circle"],control:{type:"select"}},palette:{options:["primary","text","red","yellow","green"],control:{type:"select"}},size:{options:["m","l"],control:{type:"select"}},view:{control:{type:"select"},options:["primary","ghost","outline"]},text:{control:{type:"text"}}},args:{viewType:"circle",palette:"primary",view:"primary",text:"text text",size:"m"},component:_button_button_component__WEBPACK_IMPORTED_MODULE_3__.r,moduleMetadata:{imports:[]}},baseButton=args=>({moduleMetadata:{imports:[_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__.M,_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.o]},props:args,template:'<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="false" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>'}),disabledButton=args=>({moduleMetadata:{imports:[_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__.M,_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.o]},props:args,template:'<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="true" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>'}),squireButton=args=>({moduleMetadata:{imports:[_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__.M,_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.o]},props:args,template:'<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="false" [view]="view" [square]="true"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>'}),allButtonTypes=args=>({moduleMetadata:{imports:[_icon_icon_sprite_directive__WEBPACK_IMPORTED_MODULE_4__.M,_icon_icon_icon_component__WEBPACK_IMPORTED_MODULE_5__.o]},props:{palettes:["primary","text","red","yellow","green"],types:["brick","circle","rounded","rounded","rounded"],text:"Push me",size:"m",leftIcon:!0,rightIcon:!0,disabled:!1},template:'<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n\n    <div class="column padding-top-11 font-body-3" style="gap:32px">\n        <p>Default</p>\n        <p>Only Icon</p>\n        <p>Outline</p>\n        <p>Ghost</p>\n    </div>\n        <div class="row gap-20">\n            <div *ngFor="let palette of palettes;let i=index" class="column" style="grid-gap: 20px">\n            <p class="font-body-3">{{types[i]}}</p>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [square]="true">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="\'outline\'">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="\'ghost\'">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n            </div>\n        </div>\n</div>'});baseButton.parameters={...baseButton.parameters,docs:{...baseButton.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconSpriteDirective, IconComponent]\n  },\n  props: args,\n  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="false" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>`\n})',...baseButton.parameters?.docs?.source}}},disabledButton.parameters={...disabledButton.parameters,docs:{...disabledButton.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconSpriteDirective, IconComponent]\n  },\n  props: args,\n  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="true" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>`\n})',...disabledButton.parameters?.docs?.source}}},squireButton.parameters={...squireButton.parameters,docs:{...squireButton.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconSpriteDirective, IconComponent]\n  },\n  props: args,\n  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n       <button teta-button  [disabled]="false" [view]="view" [square]="true"  [size]="size" [viewType]="viewType" [palette]="palette">\n          <teta-icon [name]="\'addCircle\'"></teta-icon>\n          {{text}}\n       </button>\n</div>`\n})',...squireButton.parameters?.docs?.source}}},allButtonTypes.parameters={...allButtonTypes.parameters,docs:{...allButtonTypes.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconSpriteDirective, IconComponent]\n  },\n  props: {\n    palettes: [\'primary\', \'text\', \'red\', \'yellow\', \'green\'],\n    types: [\'brick\', \'circle\', \'rounded\', \'rounded\', \'rounded\'],\n    text: \'Push me\',\n    size: \'m\',\n    leftIcon: true,\n    rightIcon: true,\n    disabled: false\n  },\n  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="\'assets/icons.svg\'">\n\n    <div class="column padding-top-11 font-body-3" style="gap:32px">\n        <p>Default</p>\n        <p>Only Icon</p>\n        <p>Outline</p>\n        <p>Ghost</p>\n    </div>\n        <div class="row gap-20">\n            <div *ngFor="let palette of palettes;let i=index" class="column" style="grid-gap: 20px">\n            <p class="font-body-3">{{types[i]}}</p>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [square]="true">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="\'outline\'">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="\'ghost\'">\n                  <teta-icon *ngIf="leftIcon" [name]="\'addCircle\'"></teta-icon>\n                  {{text}}\n                  <teta-icon *ngIf="rightIcon" [name]="\'user\'"></teta-icon>\n                </button>\n            </div>\n        </div>\n</div>`\n})',...allButtonTypes.parameters?.docs?.source}}};const __namedExportsOrder=["baseButton","disabledButton","squireButton","allButtonTypes"]},"./projects/components/docs/buttonDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_src_component_button_Button_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/components/src/component/button/Button.stories.ts");function _createMdxContent(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_2__.h_,{of:_src_component_button_Button_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column gap-24",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1",{children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Button (кнопка) — компонент, который призывает пользователя к совершению определенного действия в интерфейсе,\nнапример: открыть следующую страницу, заказать товар или войти в свой аккаунт."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Основной призыв к действию. Предназначены для выполнения какого-либо действия в системе. "})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Как использовать"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"За создание кнопки отвечает компонент"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Основные правила применения кнопки:"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Текст кнопки всегда должен быть с заглавной буквы;"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Текст на кнопке должен сообщать пользователю, что произойдёт, если он нажмёт на кнопку (например, Сохранить, Добавить и т. п.);"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Не перенасыщать страницу большим количеством Primary кнопок. Не распологать их рядом друг с другом."})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Типы кнопок"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"В системе существуют всего 3 типа кнопок"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Primary (основная)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Ghost (без фона)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Outline (с обводкой)"})]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Размер кнопок"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Есть 2 размера кнопок — m и l. В основном в проектах используются кнопки размера m. "})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{class:"column",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Свойства"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Свойство"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Tип"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th",{children:"Описание"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tbody",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"viewType"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"'rounded'|'circle'|'brick'"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство округления компонента."})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"size"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"'m' |'l'"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Размер кнопки"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"disabled"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Отключает реакцию компонента на клик пользователя"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"palette"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"string"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:'Отвечает за цвет фона кнопки. Принимает в себя название палитры и указывает 50-й оттенок (Пример: вводим yellow- цвет будет color-yellow-50). Работает только при view="primary"'})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"view"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"'primary' | 'outline' | 'ghost'"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Свойство, которое отвечает за тип кнопки"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"square"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("code",{children:"boolean"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td",{class:"text-align-center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:"Отвечает за форму кнопки"})})]})]})]})]})]})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_ng_components_ng_components_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent()}},"./projects/components/src/component/button/button/button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);