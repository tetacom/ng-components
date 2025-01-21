(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[9157],{"./projects/components/src/common/enum/teta-size.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TetaSize;__webpack_require__.d(__webpack_exports__,{K:()=>TetaSize}),function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}))},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"icon"];switch(this.palette&&result.push(`icon-${this.palette}`),this.size){case teta_size_enum.K.XL:result.push("icon-xl");break;case teta_size_enum.K.L:result.push("icon-l");break;case teta_size_enum.K.M:result.push("icon-m");break;case teta_size_enum.K.S:result.push("icon-s");break;case teta_size_enum.K.XS:result.push("icon-xs")}return result.join(" ")}getName(){return`#${this.name}`}static{this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%; height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js");exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}($event)"`:`[${key}]="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/portable-stories.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/portable-stories.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.setProjectAnnotations=void 0;const preview_api_1=__webpack_require__("storybook/internal/preview-api"),INTERNAL_DEFAULT_PROJECT_ANNOTATIONS=__importStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"));exports.setProjectAnnotations=function setProjectAnnotations(projectAnnotations){return(0,preview_api_1.setDefaultProjectAnnotations)(INTERNAL_DEFAULT_PROJECT_ANNOTATIONS),(0,preview_api_1.setProjectAnnotations)(projectAnnotations)}},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}})},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/src/component/icon/Icon.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,coloredIcons:()=>coloredIcons,default:()=>Icon_stories,fileIcons:()=>fileIcons,icons:()=>icons,lithotypeIcons:()=>lithotypeIcons});var icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");const iconsList=["2d","3dView","add","addArea","addCircle","addCircleFilled","addComment","addVolume","arrowDown","arrowDownKey","arrowDownSmall","arrowLeft","arrowLeftKey","arrowLeftRight","arrowLeftSmall","arrowRight","arrowRightKey","arrowRightSmall","arrowUp","arrowUpDownSmall","arrowUpKey","arrowUpSmall","attach","autoSize","autoSizeAll","autoscale","back","backspace","bubbleChart","bullet","calc","calendar","camera","centerAlign","chart","chatFill","chatOutline","checkCircle","checkCircleFilled","chisel","clip0_11749_1715","clip0_11749_1732","clip0_11749_1749","clip0_11749_1837","clip0_11749_2032","clip0_11749_2309","clock","clockChange","closeBig","closeCircle","closeCircleFilled","comment","compare","constructionWell","copy","copySelected","csv","cut","cutArea","darkMode","dash","delete","deleteSelected","detach","doc","docAndLiquid","document","documentAdd","documentAnalyze","dots","download","drag","drop","edit","end","equal","erase","export","eye","eyeCrossed","filter","filterApplied","filterClear","filterHide","filterShow","filterSortDown","filterSortUp","flag","folder","folderAdd","forward","fullScreen","gantt","gear","gis","grp","handbag","home","homeFill","homeOutline","horizontal","horizontalWidget","hornerAnalysis","image","info","infoFilled","isoline","jpg","lamp","las","layers","leftAlign","lightMode","liner","link","liquid","list","lock","loop","magicWand","map","mapCard","menu","miniFrac","minus","monitoringDepth","monitoringTime","moreHorizontal","moreVertical","move","moveHorizontal","moveVertical","mud","multiCopy","newTemplate","noSignal","nolteAnalysis","open","opz","paste","pause","pc","pdf","photoCamera","photoCameraCrossed","pieChart","pin","pinCrossed","play","playBackRight","playForwardRight","png","print","question","questionFilled","questionsFill","questionsOutline","redo","referenceFill","referenceOutline","registerFill","registerOutline","rewBack","rewForward","rightAlign","ring","ringWithCircle","roadMaps","ruler","save","search","serviceFill","serviceOutline","settings","share","sideTube","sigma","signal","sortAZ","sortZA","square","srt","star","starFilled","start","stop","sum","table","tabletGraph","templateDownload","templateSettings","templateUpload","tick","tiles","timeOut","timePeriod","track","trackPeriod","txt","undo","unlock","update","upload","user","verticalWidget","warningFilled","warningStroke","well","wellConstruction","widgets","world","wrench","x","xls","y","zoom"],coloredIconsList=["areasColor","calcColor","calendarColor","coinColor","timeColor","colmatantColor","folderColor","geomechColor","gisColor","grpColor","handbagColor","improveColor","nktColor","sideTube","sumColor","opzColor","testFraq","wellColor","wellConstructionColor","analyzeGroupColor","barChart","chartLineColor","chartLineDashed","chartLineGradientColor","clusterColor","documentColor","favorite","filterColor","filterSortUpColor","filterSortDownColor","folderGroupColor","geoGroupColor","gisInnerColor","gisGroupColor","gisSimpleColor","grpGroupColor","grpAddColor","handbagAddColor","lineColor","lineGradientColor","lineDashedColor","liquidAddColor","liquidSystemColor","liquidUserColor","lithotypeColor","opzAddColor","mapColor","rigisGroupColor","sortUpColor","opzGroupColor","sortDownColor","testAnalyzeGroupColor","wellGroupColor","sumAddColor"],fileIconsList=["file_csv","file_doc","file_docx","file_las","file_pdf","file_txt","file_xls","file_xlsx","file_png","file_jpg","file_jpeg"],lithotypeIconsList=["icon1","icon2","icon3","icon4","icon5","icon6","icon7","icon8","icon9","icon10","icon11","icon12","icon13","icon14"];var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts");const Icon_stories={title:"Component/Icon",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)()]})],component:icon_component.R,argTypes:{palette:{options:["primary","grey","red","white","green"],control:{type:"select"}},size:{options:[teta_size_enum.K.XS,teta_size_enum.K.S,teta_size_enum.K.M,teta_size_enum.K.L,teta_size_enum.K.XL],control:{type:"select"}},filter:{control:{type:"text"}}},args:{palette:"primary",size:teta_size_enum.K.L,filter:""},moduleMetadata:{imports:[]}},icons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:iconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/icons.svg\'">\n                <h1 style="margin-bottom: 1em">Обычые иконки без заливки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                    @for(icon of icons; track icon) {\n                      <div class="font-body-3" style="display: flex; align-items: center;">\n                        <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                        <span class="padding-left-4">{{icon}}</span>\n                      </div>\n                    }\n                </div>\n            </div>'}),coloredIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:coloredIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/color-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Цветные иконки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),fileIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:fileIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/file-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),lithotypeIcons=args=>({moduleMetadata:{imports:[icon_component.R,icon_sprite_directive._]},props:{...args,icons:lithotypeIconsList.filter((iconName=>iconName.toLowerCase().includes(args.filter.toLowerCase())))},template:'\n            <div [tetaIconSprite]="\'assets/lithotype-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>'}),__namedExportsOrder=["icons","coloredIcons","fileIcons","lithotypeIcons"];icons.parameters={...icons.parameters,docs:{...icons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: iconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/icons.svg\'">\n                <h1 style="margin-bottom: 1em">Обычые иконки без заливки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                    @for(icon of icons; track icon) {\n                      <div class="font-body-3" style="display: flex; align-items: center;">\n                        <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                        <span class="padding-left-4">{{icon}}</span>\n                      </div>\n                    }\n                </div>\n            </div>`\n})',...icons.parameters?.docs?.source}}},coloredIcons.parameters={...coloredIcons.parameters,docs:{...coloredIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: coloredIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/color-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Цветные иконки</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...coloredIcons.parameters?.docs?.source}}},fileIcons.parameters={...fileIcons.parameters,docs:{...fileIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: fileIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/file-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...fileIcons.parameters?.docs?.source}}},lithotypeIcons.parameters={...lithotypeIcons.parameters,docs:{...lithotypeIcons.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [IconComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    icons: lithotypeIconsList.filter(iconName => iconName.toLowerCase().includes(args.filter.toLowerCase()))\n  },\n  template: `\n            <div [tetaIconSprite]="\'assets/lithotype-icons.svg\'">\n                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>\n                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">\n                  @for(icon of icons; track icon) {\n                    <div style="display: flex; align-items: center;" class="font-body-3">\n                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>\n                      <span class="padding-left-4">{{icon}}</span>\n                    </div>\n                  }\n                </div>\n            </div>`\n})',...lithotypeIcons.parameters?.docs?.source}}}},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);