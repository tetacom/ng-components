(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[8573],{"./projects/components/src/common/contract/dynamic-data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{G:()=>DynamicData});class DynamicData{constructor(value){for(const key in value)value.hasOwnProperty(key)&&(this[key]=value[key])}}},"./projects/components/src/common/enum/teta-size.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TetaSize;__webpack_require__.d(__webpack_exports__,{K:()=>TetaSize}),function(TetaSize){TetaSize[TetaSize.XS=0]="XS",TetaSize[TetaSize.S=1]="S",TetaSize[TetaSize.M=2]="M",TetaSize[TetaSize.L=3]="L",TetaSize[TetaSize.XL=4]="XL"}(TetaSize||(TetaSize={}))},"./projects/components/src/common/service/dynamic-component.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>DynamicComponentService});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),dynamic_data=__webpack_require__("./projects/components/src/common/contract/dynamic-data.ts");class TetaContentRef{constructor(nodes,viewRef,componentRef){this.nodes=nodes,this.viewRef=viewRef,this.componentRef=componentRef}}let DynamicComponentService=class DynamicComponentService{constructor(_componentFactoryResolver,_rendererFactory,_appRef){this._componentFactoryResolver=_componentFactoryResolver,this._rendererFactory=_rendererFactory,this._appRef=_appRef,this._renderer=this._rendererFactory.createRenderer(null,null)}createComponent(component,contentRef,injector,container){const componentRef=this._componentFactoryResolver.resolveComponentFactory(component).create(injector,contentRef.nodes);return this._appRef.attachView(componentRef.hostView),container.appendChild(componentRef.location.nativeElement),componentRef}createContent(content,injector,context){if(null==content)throw new Error("Content is undefined");return"string"==typeof content?this.fromString(content):content instanceof core.TemplateRef?this.fromTemplate(content,context):this.fromComponent(content,injector,context)}destroy(component,content,container){component&&(this._appRef.detachView(component.hostView),component.destroy()),content&&content.viewRef&&content.viewRef.destroy(),content=null}getContext(content,context){return content instanceof core.TemplateRef?{$implicit:context,data:context}:context}getInjector(data,parent){return core.Injector.create({providers:[{provide:dynamic_data.G,useValue:data}],parent})}fromString(content){return new TetaContentRef([[this._renderer.createText(`${content}`)]])}fromTemplate(content,context){const viewRef=content.createEmbeddedView(context);return this._appRef.attachView(viewRef),new TetaContentRef([viewRef.rootNodes],viewRef)}fromComponent(content,injector,context){const componentRef=this._componentFactoryResolver.resolveComponentFactory(content).create(injector);for(const key in context)Object.prototype.hasOwnProperty.call(context,key)&&(componentRef.instance[key]=context[key]);const componentNativeEl=componentRef.location.nativeElement;return this._appRef.attachView(componentRef.hostView),new TetaContentRef([[componentNativeEl]],componentRef.hostView,componentRef)}static{this.ctorParameters=()=>[{type:core.ComponentFactoryResolver},{type:core.RendererFactory2},{type:core.ApplicationRef}]}};DynamicComponentService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[core.ComponentFactoryResolver,core.RendererFactory2,core.ApplicationRef])],DynamicComponentService)},"./projects/components/src/component/button/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var button_componentngResource=__webpack_require__("./projects/components/src/component/button/button/button.component.scss?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts");let ButtonComponent=class ButtonComponent{constructor(){this.view="primary",this.square=!1,this.viewType="rounded",this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"button"];switch(this.palette&&result.push(`button-${this.palette}`),this.view&&result.push(`button_${this.view}`),this.square&&result.push("button-square"),this.size){case teta_size_enum.K.XL:result.push("button-xl");break;case teta_size_enum.K.L:result.push("button-l");break;case teta_size_enum.K.M:result.push("font-button-2"),result.push("button-m");break;case teta_size_enum.K.S:result.push("font-button-3"),result.push("button-s");break;case teta_size_enum.K.XS:result.push("font-button-3"),result.push("button-xs")}return result.push(`button_${this.viewType}`),result.join(" ")}static{this.propDecorators={palette:[{type:core.Input}],class:[{type:core.Input}],view:[{type:core.Input}],square:[{type:core.Input}],viewType:[{type:core.Input}],size:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};ButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"button[teta-button], teta-button",template:"<ng-content></ng-content>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[button_componentngResource_default()]})],ButtonComponent)},"./projects/components/src/component/icon/icon-sprite.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>IconSpriteDirective});var IconService_1,tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fesm2022_http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let IconService=class IconService{static{IconService_1=this}static{this._loaded=[]}static{this._pending=[]}constructor(_document,_rendererFactory,_httpBackend,_http){this._document=_document,this._rendererFactory=_rendererFactory,this._httpBackend=_httpBackend,this._http=_http,this._renderer=this._rendererFactory.createRenderer(null,null)}addSprite(url,bypassInterceptors=!0){IconService_1._loaded.indexOf(url)<0&&IconService_1._pending.indexOf(url)<0&&(IconService_1._pending.push(url),this.getSVG(url,bypassInterceptors).subscribe((svg=>{IconService_1._pending=IconService_1._pending.filter((_=>_!==url)),IconService_1._loaded.push(url),this._renderer.insertBefore(this._document.body,svg,this._document.body.firstChild)})))}getSVG(url,bypassInterceptors=!0){return(bypassInterceptors?new fesm2022_http.Qq(this._httpBackend):this._http).get(url,{responseType:"text"}).pipe((0,map.T)((svgText=>{const svgEl=this.svgElementFromString(svgText);return this.cloneSVG(svgEl)})))}svgElementFromString(str){const div=this._renderer.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw new Error("No SVG found in loaded contents");return svg}cloneSVG(svg){return svg.cloneNode(!0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.RendererFactory2},{type:fesm2022_http.JV},{type:fesm2022_http.Qq}]}};IconService=IconService_1=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.RendererFactory2,fesm2022_http.JV,fesm2022_http.Qq])],IconService);let IconSpriteDirective=class IconSpriteDirective{constructor(_iconService){this._iconService=_iconService,this.bypassInterceptors=!0}ngOnInit(){"string"==typeof this.tetaIconSprite&&this._iconService.addSprite(this.tetaIconSprite,this.bypassInterceptors),this.tetaIconSprite instanceof Array&&this.tetaIconSprite?.length&&this.tetaIconSprite.forEach((sprite=>{this._iconService.addSprite(sprite,this.bypassInterceptors)}))}static{this.ctorParameters=()=>[{type:IconService}]}static{this.propDecorators={tetaIconSprite:[{type:core.Input}],bypassInterceptors:[{type:core.Input}]}}};IconSpriteDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaIconSprite]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[IconService])],IconSpriteDirective)},"./projects/components/src/component/icon/icon/icon.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>IconComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var icon_componentngResource=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.scss?ngResource"),icon_componentngResource_default=__webpack_require__.n(icon_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),teta_size_enum=__webpack_require__("./projects/components/src/common/enum/teta-size.enum.ts"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let IconComponent=class IconComponent{constructor(){this.size=teta_size_enum.K.M}get getClass(){const result=[this.class,"icon"];switch(this.palette&&result.push(`icon-${this.palette}`),this.size){case teta_size_enum.K.XL:result.push("icon-xl");break;case teta_size_enum.K.L:result.push("icon-l");break;case teta_size_enum.K.M:result.push("icon-m");break;case teta_size_enum.K.S:result.push("icon-s");break;case teta_size_enum.K.XS:result.push("icon-xs")}return result.join(" ")}getName(){return`#${this.name}`}static{this.propDecorators={name:[{type:core.Input}],size:[{type:core.Input}],palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};IconComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-icon",template:'<svg class="icon__image" style="width: 100%; height: 100%">\n  <use [attr.xlink:href]="getName()"></use>\n</svg>\n',imports:[icon_sprite_directive._],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_componentngResource_default()]})],IconComponent)},"./projects/components/src/component/toolbar/toolbar/toolbar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{H:()=>ToolbarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var toolbar_componentngResource=__webpack_require__("./projects/components/src/component/toolbar/toolbar/toolbar.component.scss?ngResource"),toolbar_componentngResource_default=__webpack_require__.n(toolbar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ToolbarComponent=class ToolbarComponent{get getClass(){const result=[this.class,"toolbar"];return this.palette&&result.push(`toolbar-${this.palette}`),result.join(" ")}ngOnInit(){}static{this.propDecorators={palette:[{type:core.Input}],class:[{type:core.Input}],getClass:[{type:core.HostBinding,args:["class"]}]}}};ToolbarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-toolbar",template:"<ng-content></ng-content>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[toolbar_componentngResource_default()]})],ToolbarComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/components/src/component/modal/Modal.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,alert:()=>Modal_stories_alert,default:()=>Modal_stories,fromComponent:()=>fromComponent,fromTemplate:()=>fromTemplate});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");var modal_from_component_componentngResource=__webpack_require__("./projects/components/src/component/modal/modal-samples/modal-from-component/modal-from-component.component.scss?ngResource"),modal_from_component_componentngResource_default=__webpack_require__.n(modal_from_component_componentngResource);var ModalCloseReason,modal_example_componentngResource=__webpack_require__("./projects/components/src/component/modal/modal-samples/modal-example/modal-example.component.scss?ngResource"),modal_example_componentngResource_default=__webpack_require__.n(modal_example_componentngResource);!function(ModalCloseReason){ModalCloseReason[ModalCloseReason.resolve=0]="resolve",ModalCloseReason[ModalCloseReason.exit=1]="exit",ModalCloseReason[ModalCloseReason.backdrop=2]="backdrop",ModalCloseReason[ModalCloseReason.esc=3]="esc"}(ModalCloseReason||(ModalCloseReason={}));var dynamic_data=__webpack_require__("./projects/components/src/common/contract/dynamic-data.ts");class CurrentModal{}var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),button_component=__webpack_require__("./projects/components/src/component/button/button/button.component.ts"),toolbar_component=__webpack_require__("./projects/components/src/component/toolbar/toolbar/toolbar.component.ts");let ModalExampleComponent=class ModalExampleComponent{constructor(modal,data){this.modal=modal,this.data=data,this.closeReason=ModalCloseReason}ngOnInit(){}static{this.ctorParameters=()=>[{type:CurrentModal},{type:dynamic_data.G}]}};ModalExampleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-modal-example",template:'<div class="column">\n  <teta-toolbar [palette]="\'background\'" class="justify-content-between color-text-90">\n    <span>Создать проект</span>\n    <teta-button\n      [square]="true"\n      [view]="\'ghost\'"\n      [palette]="\'text\'"\n      (click)="modal.close({ reason: closeReason.exit })"\n    >\n      <teta-icon class="fill-text-90" [name]="\'closeBig\'"></teta-icon>\n    </teta-button>\n  </teta-toolbar>\n  <div class="padding-3 column">\n    <div class="margin-v-2">\n      <input class="input" type="text" [(ngModel)]="data.name" placeholder="Название" />\n    </div>\n    <div class="margin-v-2">\n      <input class="input" type="text" [(ngModel)]="data.description" placeholder="Описание" />\n    </div>\n  </div>\n  <div class="bottom-bar">\n    <button teta-button [palette]="\'primary\'" (click)="modal.close({ reason: closeReason.exit })">Отменить</button>\n    <button teta-button [palette]="\'primary\'" (click)="modal.close({ reason: closeReason.resolve })">Создать</button>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[toolbar_component.H,button_component.Q,icon_component.R,fesm2022_forms.YN],styles:[modal_example_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[CurrentModal,dynamic_data.G])],ModalExampleComponent);var Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js");class ModalInstance{constructor(_window,_content){this._window=_window,this._content=_content,this._onClose=new Subject.B,this.close=event=>{this._onClose.next(event),this._onClose.complete(),this.destroy()},this.onClose=this._onClose.asObservable(),this._window&&this._window.instance&&this._window.instance.closeEvent.subscribe((event=>{this.close(event)}))}get window(){return this._window}get component(){return this._content.componentRef?this._content.componentRef:null}destroy(){this._window.destroy(),this._content&&this._content.viewRef&&setTimeout((()=>{this._content.viewRef.destroy()}),150)}}var dynamic_component_service=__webpack_require__("./projects/components/src/common/service/dynamic-component.service.ts");var modal_container_componentngResource=__webpack_require__("./projects/components/src/component/modal/modal-container/modal-container.component.scss?ngResource"),modal_container_componentngResource_default=__webpack_require__.n(modal_container_componentngResource),animations=__webpack_require__("./node_modules/@angular/animations/fesm2022/animations.mjs");let ModalContainerComponent=class ModalContainerComponent{get classList(){const classList=["modal__window"];return this.config&&(this.config&&this.config.class&&classList.push(...this.config.class),this.config.backdrop&&classList.push("modal__backdrop")),classList.join(" ")}constructor(elRef$){this.elRef$=elRef$,this.closeEvent=new core.EventEmitter,this.tabindex=-1,this.dialog=!0}keyup(event){if(this.config&&this.config.esc&&!event.defaultPrevented){const key=event.key||event.keyCode;"Escape"!==key&&"Esc"!==key&&27!==key||this.closeEvent.emit({reason:ModalCloseReason.esc})}}click(event){!0===this.config.closeOnBackdropClick&&this.elRef$.nativeElement===event.target&&this.closeEvent.emit({reason:ModalCloseReason.backdrop})}static{this.ctorParameters=()=>[{type:core.ElementRef}]}static{this.propDecorators={config:[{type:core.Input}],closeEvent:[{type:core.Output}],tabindex:[{type:core.HostBinding,args:["attr.tabindex"]}],dialog:[{type:core.HostBinding,args:["@dialog"]}],classList:[{type:core.HostBinding,args:["class"]}],keyup:[{type:core.HostListener,args:["keyup",["$event"]]}],click:[{type:core.HostListener,args:["click",["$event"]]}]}}};ModalContainerComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-modal-container",template:'<div class="modal__container" [class.modal__container_resize]="config?.resizable">\n  <ng-content></ng-content>\n</div>\n',animations:[(0,animations.hZ)("dialog",[(0,animations.kY)("void => *",[(0,animations.iF)({top:"-100%"}),(0,animations.i0)("150ms ease-in",(0,animations.iF)({top:"0"}))]),(0,animations.kY)("* => void",[(0,animations.i0)("150ms ease-in",(0,animations.iF)({top:"-100%"}))])])],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[modal_container_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef])],ModalContainerComponent);var common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let ModalService=class ModalService{constructor(_document,_injector,_factory){this._document=_document,this._injector=_injector,this._factory=_factory,this._stack=[],this._modalChanged=new Subject.B,this.unregister=instance=>{const index=this._stack.indexOf(instance);index>-1&&(this._stack.splice(index,1),this._modalChanged.next())},this._container=this._document.body,this._modalChanged.subscribe((()=>{this._stack&&this._stack.length>0&&this.focus(this._stack[this._stack.length-1])}))}closeAll(){this._stack&&this._stack.length>0&&this._stack.forEach((instance=>{instance.close({reason:ModalCloseReason.exit})}))}create(content,data,config,injector){if(null==content)throw new Error("Specify template or component to render");null==config&&(config=Object.assign({backdrop:!0,class:[],esc:!0},config)),null==injector&&(injector=this._injector);const currentModal=new CurrentModal,modalData=new dynamic_data.G(data);injector=this.getInjector(currentModal,modalData,injector);const contentInstance=this._factory.createContent(content,injector,this.getContext(content,modalData,currentModal)),window=this._factory.createComponent(ModalContainerComponent,contentInstance,injector,this._container);window.instance.config=config;const instance=new ModalInstance(window,contentInstance);return currentModal.close=instance.close,this.register(instance),instance}getContext(content,context,currentModal){return content instanceof core.TemplateRef?{$implicit:{modal:currentModal,data:context},modal:currentModal,data:context,close:result=>{currentModal.close(result)}}:context}getInjector(currentModal,data,parent){return core.Injector.create({providers:[{provide:CurrentModal,useValue:currentModal},{provide:dynamic_data.G,useValue:data}],parent})}register(instance){this._stack.push(instance),this._modalChanged.next(),instance.onClose.subscribe((()=>this.unregister(instance)))}focus(instance){instance&&instance.window&&instance.window.location.nativeElement&&setTimeout((()=>{instance.window.location.nativeElement.focus()}),0)}static{this.ctorParameters=()=>[{type:void 0,decorators:[{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.Injector},{type:dynamic_component_service._}]}};ModalService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[Object,core.Injector,dynamic_component_service._])],ModalService);var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");let ModalFromComponentComponent=class ModalFromComponentComponent{constructor(modal){this.modal=modal}ngOnInit(){}create(){this.modal.create(ModalExampleComponent,{name:this.name,description:this.description}).onClose.subscribe((_=>{}))}static{this.ctorParameters=()=>[{type:ModalService}]}static{this.propDecorators={name:[{type:core.Input}],description:[{type:core.Input}]}}};ModalFromComponentComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-modal-from-component",template:'<button type="button" teta-button [palette]="\'primary\'" (click)="create()" [tetaIconSprite]="\'assets/icons.svg\'">\n  Create modal\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[button_component.Q,icon_sprite_directive._],styles:[modal_from_component_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[ModalService])],ModalFromComponentComponent);var modal_from_template_componentngResource=__webpack_require__("./projects/components/src/component/modal/modal-samples/modal-from-template/modal-from-template.component.scss?ngResource"),modal_from_template_componentngResource_default=__webpack_require__.n(modal_from_template_componentngResource);let ModalFromTemplateComponent=class ModalFromTemplateComponent{constructor(modal){this.modal=modal,this.closeReason=ModalCloseReason}ngOnInit(){}create(template){this.modal.create(template,{name:this.name,description:this.description}).onClose.subscribe((_=>{}))}static{this.ctorParameters=()=>[{type:ModalService}]}static{this.propDecorators={name:[{type:core.Input}],description:[{type:core.Input}]}}};ModalFromTemplateComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"app-modal-from-template",template:'<ng-template #content let-data="data" let-modal="modal">\n  <div class="column" [tetaIconSprite]="\'assets/icons.svg\'">\n    <teta-toolbar [palette]="\'background\'" class="justify-content-between color-text-90">\n      <span>Создать проект</span>\n      <teta-button\n        [square]="true"\n        [view]="\'ghost\'"\n        [palette]="\'text\'"\n        (click)="modal.close({ reason: closeReason.exit })"\n      >\n        <teta-icon class="fill-text-90" [name]="\'closeBig\'"></teta-icon>\n      </teta-button>\n    </teta-toolbar>\n    <div class="padding-3 column">\n      <div class="margin-v-2">\n        <input class="input" type="text" [(ngModel)]="data.name" placeholder="\'Название\'" />\n      </div>\n      <div class="margin-v-2">\n        <input class="input" type="text" [(ngModel)]="data.description" placeholder="\'Описание\'" />\n      </div>\n    </div>\n    <div class="bottom-bar">\n      <button teta-button [palette]="\'primary\'" (click)="modal.close({ reason: closeReason.exit })">Отменить</button>\n      <button teta-button [palette]="\'primary\'" (click)="modal.close({ reason: closeReason.resolve })">Создать</button>\n    </div>\n  </div>\n</ng-template>\n<button teta-button [palette]="\'primary\'" (click)="create(content)">Create modal</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[icon_sprite_directive._,toolbar_component.H,button_component.Q,icon_component.R,fesm2022_forms.YN],styles:[modal_from_template_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[ModalService])],ModalFromTemplateComponent);var dialog_componentngResource=__webpack_require__("./projects/components/src/component/modal/dialog/dialog.component.scss?ngResource"),dialog_componentngResource_default=__webpack_require__.n(dialog_componentngResource),jsverse_transloco=__webpack_require__("./node_modules/@jsverse/transloco/fesm2022/jsverse-transloco.mjs");let DialogComponent=class DialogComponent{constructor(modal,data){this.modal=modal,this.data=data}cancel(){this.modal.close({reason:ModalCloseReason.exit})}ok(){this.modal.close({reason:ModalCloseReason.resolve})}ngOnInit(){}static{this.ctorParameters=()=>[{type:CurrentModal},{type:dynamic_data.G}]}static{this.propDecorators={message:[{type:core.Input}],buttonText:[{type:core.Input}],buttonIcon:[{type:core.Input}],buttonPalette:[{type:core.Input}],showCancelButton:[{type:core.Input}]}}};DialogComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-dialog",template:'<div class="padding-2 font-body-2">\n  {{ message | transloco }}\n</div>\n<teta-toolbar class="justify-content-end">\n  @if (showCancelButton) {\n    <button teta-button (click)="cancel()" [palette]="\'text\'" [view]="\'ghost\'">\n      {{ \'common.cancel\' | transloco }}\n    </button>\n  }\n\n  <button teta-button (click)="ok()" [square]="!buttonText?.length" [palette]="buttonPalette">\n    @if (buttonIcon) {\n      <teta-icon [name]="buttonIcon"></teta-icon>\n    }\n    @if (buttonText?.length > 0) {\n      {{ buttonText | transloco }}\n    }\n  </button>\n</teta-toolbar>\n',imports:[toolbar_component.H,button_component.Q,icon_component.R,jsverse_transloco.Q8],styles:[dialog_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[CurrentModal,dynamic_data.G])],DialogComponent);let ModalModule=class ModalModule{};ModalModule=(0,tslib_es6.Cg)([(0,core.NgModule)({exports:[ModalContainerComponent,DialogComponent],imports:[common.CommonModule,jsverse_transloco.Q8,ModalContainerComponent,DialogComponent],providers:[{provide:jsverse_transloco.Lt,useValue:{scope:"common",alias:"common"},multi:!0}]})],ModalModule);var alert_sample_componentngResource=__webpack_require__("./projects/components/src/component/modal/modal-samples/alert-sample/alert-sample.component.scss?ngResource"),alert_sample_componentngResource_default=__webpack_require__.n(alert_sample_componentngResource),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let DialogService=class DialogService{constructor(_modal){this._modal=_modal}alert(message){this.createDialog(message,"common.ok",null,"primary",!1)}confirm(message,buttonText="common.ok",buttonIcon=null,buttonPalette="primary"){return this.createDialog(message,buttonText,buttonIcon,buttonPalette,!0).pipe((0,map.T)((result=>result.reason===ModalCloseReason.resolve)))}createDialog(message,buttonText="common.ok",buttonIcon=null,buttonPalette="primary",showCancelButton=!0){return this._modal.create(DialogComponent,{message,buttonText,buttonIcon,buttonPalette,showCancelButton},{esc:!0,backdrop:!0}).onClose}static{this.ctorParameters=()=>[{type:ModalService}]}};DialogService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[ModalService])],DialogService);let AlertSampleComponent=class AlertSampleComponent{constructor(_dialog){this._dialog=_dialog}alert(){this._dialog.alert("Some alert text")}dialog(){this._dialog.confirm("Some alert text").subscribe((_=>{alert(_.toString())}))}dialog2(){this._dialog.confirm("Some alert text","Edit","edit","red").subscribe((_=>{alert(_.toString())}))}ngOnInit(){}static{this.ctorParameters=()=>[{type:DialogService}]}};AlertSampleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-alert-sample",template:'<div class="toolbar" [tetaIconSprite]="\'assets/icons.svg\'">\n  <button type="button" teta-button [palette]="\'primary\'" (click)="alert()">Alert</button>\n\n  <button type="button" teta-button [palette]="\'primary\'" (click)="dialog()">Dialog</button>\n\n  <button type="button" teta-button [palette]="\'red\'" (click)="dialog2()">Dangerous dialog</button>\n</div>\n',imports:[icon_sprite_directive._,button_component.Q],styles:[alert_sample_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[DialogService])],AlertSampleComponent);let ModalSamplesModule=class ModalSamplesModule{};ModalSamplesModule=(0,tslib_es6.Cg)([(0,core.NgModule)({exports:[ModalFromComponentComponent,ModalFromTemplateComponent,ModalExampleComponent,AlertSampleComponent],imports:[ModalModule,fesm2022_forms.YN,jsverse_transloco.Q8,ModalFromComponentComponent,ModalFromTemplateComponent,ModalExampleComponent,AlertSampleComponent]})],ModalSamplesModule);var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),fesm2022_animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const Modal_stories={title:"Component/Modal",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)(),(0,fesm2022_animations.provideAnimations)()]})],moduleMetadata:{imports:[ModalSamplesModule]}},fromComponent=()=>({moduleMetadata:{imports:[ModalSamplesModule]},component:ModalFromComponentComponent,template:"<div>\n    <teta-modal-from-component></teta-modal-from-component>\n    </div>"}),fromTemplate=()=>({moduleMetadata:{imports:[ModalSamplesModule]},component:ModalFromTemplateComponent,template:"<div>\n    <app-modal-from-template></app-modal-from-template>\n    </div>"}),Modal_stories_alert=()=>({moduleMetadata:{imports:[ModalSamplesModule]},component:AlertSampleComponent,template:"<div>\n    <teta-alert-sample></teta-alert-sample>\n    </div>"}),__namedExportsOrder=["fromComponent","fromTemplate","alert"];fromComponent.parameters={...fromComponent.parameters,docs:{...fromComponent.parameters?.docs,source:{originalSource:"() => ({\n  moduleMetadata: {\n    imports: [ModalSamplesModule]\n  },\n  component: ModalFromComponentComponent,\n  template: `<div>\n    <teta-modal-from-component></teta-modal-from-component>\n    </div>`\n})",...fromComponent.parameters?.docs?.source}}},fromTemplate.parameters={...fromTemplate.parameters,docs:{...fromTemplate.parameters?.docs,source:{originalSource:"() => ({\n  moduleMetadata: {\n    imports: [ModalSamplesModule]\n  },\n  component: ModalFromTemplateComponent,\n  template: `<div>\n    <app-modal-from-template></app-modal-from-template>\n    </div>`\n})",...fromTemplate.parameters?.docs?.source}}},Modal_stories_alert.parameters={...Modal_stories_alert.parameters,docs:{...Modal_stories_alert.parameters?.docs,source:{originalSource:"() => ({\n  moduleMetadata: {\n    imports: [ModalSamplesModule]\n  },\n  component: AlertSampleComponent,\n  template: `<div>\n    <teta-alert-sample></teta-alert-sample>\n    </div>`\n})",...Modal_stories_alert.parameters?.docs?.source}}}},"./projects/components/src/component/button/button/button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/icon/icon/icon.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/dialog/dialog.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  flex-direction: column;\n  width: 300px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/modal-container/modal-container.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/modal-samples/alert-sample/alert-sample.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/modal-samples/modal-example/modal-example.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/modal-samples/modal-from-component/modal-from-component.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/modal/modal-samples/modal-from-template/modal-from-template.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/toolbar/toolbar/toolbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);