(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[9475],{"./projects/components/src/component/input/text-field/text-field.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{L:()=>TextFieldComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var text_field_componentngResource=__webpack_require__("./projects/components/src/component/input/text-field/text-field.component.scss?ngResource"),text_field_componentngResource_default=__webpack_require__.n(text_field_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),number_pipe=__webpack_require__("./projects/components/src/pipe/number-pipe/number.pipe.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),only_number_directive=__webpack_require__("./projects/components/src/directive/only-number/only-number.directive.ts"),icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts");let TextFieldComponent=class TextFieldComponent{constructor(_cdr){this._cdr=_cdr,this.placeholder="",this.disabled=!1,this.onlyNumber=!1,this.textField=!0,this.value=""}onFocus(){this.disabled||this.input.nativeElement.focus()}keyPress(event){"Enter"!==event.key&&13!==event.keyCode||this.emitBlur()}emitBlur(){this.onTouched()}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){this.onTouched=fn}setDisabledState(isDisabled){this.disabled=isDisabled,this._cdr.markForCheck()}writeValue(input){this.value=input,this._cdr.detectChanges()}onChange(input){}onTouched(){}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={placeholder:[{type:core.Input}],leftIconName:[{type:core.Input}],disabled:[{type:core.HostBinding,args:["class.text-field_disabled"]},{type:core.Input}],onlyNumber:[{type:core.Input}],decimalPart:[{type:core.Input}],invalid:[{type:core.HostBinding,args:["class.text-field_invalid"]},{type:core.Input}],input:[{type:core.ViewChild,args:["input",{static:!1}]}],textField:[{type:core.HostBinding,args:["class.text-field"]}],onFocus:[{type:core.HostListener,args:["click"]}]}};TextFieldComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-text-field",template:'@if (leftIconName) {\n  <teta-icon [name]="leftIconName" [palette]="\'text\'"></teta-icon>\n}\n<input\n  #input\n  [ngModel]="value | tetaNumber: (!onlyNumber ? null : inputFocused ? 1000 : decimalPart)"\n  [tetaOnlyNumber]="onlyNumber"\n  (ngModelChange)="value = $event; onChange($event)"\n  [placeholder]="placeholder"\n  [disabled]="disabled"\n  [ngClass]="{ \'color-text-40\': disabled }"\n  (focus)="inputFocused = true"\n  (blur)="inputFocused = false; emitBlur()"\n  (keydown)="keyPress($event)"\n  type="text"\n/>\n@if (value && !disabled) {\n  <teta-icon\n    class="close-icon"\n    [name]="\'closeCircle\'"\n    [palette]="\'text\'"\n    (click)="value = \'\'; onChange(\'\')"\n  ></teta-icon>\n}\n',providers:[{provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>TextFieldComponent)),multi:!0}],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[icon_component.R,fesm2022_forms.YN,only_number_directive.n,common.NgClass,number_pipe.u],styles:[text_field_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],TextFieldComponent)},"./projects/components/src/component/select/select-option.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{F:()=>SelectOptionDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SelectOptionDirective=class SelectOptionDirective{constructor(template){this.template=template}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]};SelectOptionDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaSelectOption]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],SelectOptionDirective)},"./projects/components/src/component/select/select-value.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{l:()=>SelectValueDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SelectValueDirective=class SelectValueDirective{constructor(template){this.template=template}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef}]};SelectValueDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaSelectValue]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],SelectValueDirective)},"./projects/components/src/component/select/select/select.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>SelectComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var select_componentngResource=__webpack_require__("./projects/components/src/component/select/select/select.component.scss?ngResource"),select_componentngResource_default=__webpack_require__.n(select_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),align_enum=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),vertical_align_enum=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts"),teta_config_service=__webpack_require__("./projects/components/src/locale/teta-config.service.ts"),select_option_directive=__webpack_require__("./projects/components/src/component/select/select-option.directive.ts"),select_value_directive=__webpack_require__("./projects/components/src/component/select/select-value.directive.ts");let HighlightDirective=class HighlightDirective{set tetaHighlight(text){setTimeout((()=>{if(this._initialElement&&(this.elementRef.nativeElement.innerHTML=this._initialElement),!text)return;const searchWithOutRegExp=text.toLowerCase().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").split(" ").filter((t=>t.length>0)).join("|");this._initialElement=this.elementRef.nativeElement.innerHTML,this.recursiveReplaceNode(this.elementRef.nativeElement.childNodes,searchWithOutRegExp)}),10)}constructor(elementRef){this.elementRef=elementRef,this._initialElement=null}recursiveReplaceNode(nodes,searchWithOutRegExp){let match=!1;const cacheNodes=[];return nodes.forEach((node=>{cacheNodes.push(node)})),cacheNodes.forEach((node=>{3===node.nodeType?node.nodeValue&&node.nodeValue.search(new RegExp(searchWithOutRegExp,"i"))>-1&&(match=!0,this.wrapNode(node,searchWithOutRegExp)):match=this.recursiveReplaceNode(node.childNodes,searchWithOutRegExp)||match})),match}wrapNode(textNode,searchWithOutRegExp){if(!textNode||!textNode.nodeValue)return;const tempDiv=document.createElement("div");tempDiv.innerHTML=textNode.nodeValue.replace(new RegExp(searchWithOutRegExp,"gi"),(match=>`<mark>${match}</mark>`));const parentNode=textNode.parentNode;if(parentNode){for(;tempDiv.firstChild;)parentNode.insertBefore(tempDiv.firstChild,textNode);parentNode.removeChild(textNode)}}static#_=this.ctorParameters=()=>[{type:core.ElementRef}];static#_2=this.propDecorators={tetaHighlight:[{type:core.Input}]}};HighlightDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaHighlight]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef])],HighlightDirective);var scrollable_directive=__webpack_require__("./projects/components/src/directive/scrollable/scrollable.directive.ts"),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),scrollable_component=__webpack_require__("./projects/components/src/directive/scrollable/scrollable/scrollable.component.ts"),text_field_component=__webpack_require__("./projects/components/src/component/input/text-field/text-field.component.ts"),dropdown_content_directive=__webpack_require__("./projects/components/src/component/dropdown/dropdown-content.directive.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),dropdown_head_directive=__webpack_require__("./projects/components/src/component/dropdown/dropdown-head.directive.ts"),dropdown_component=__webpack_require__("./projects/components/src/component/dropdown/dropdown/dropdown.component.ts"),let_directive=__webpack_require__("./projects/components/src/directive/let/let.directive.ts");let SelectComponent=class SelectComponent{set options(options){this._options=options,null!==this._internalValue&&void 0!==this._internalValue&&this.options&&this.getSelectedValue(this._internalValue)}get options(){return this._options}get tabindex(){return this.disabled?null:0}get isDisabled(){return this.disabled}get visibleOptions(){return this.searchText?this.options?.filter((option=>this.getSearchString(option).toLowerCase().indexOf(this.searchText.toLowerCase())>=0)):this.options}constructor(_cdr,_elementRef,_config){this._cdr=_cdr,this._elementRef=_elementRef,this._config=_config,this.align=align_enum.W.minWidth,this.verticalAlign=vertical_align_enum.G.auto,this.autoClose=!0,this.autoCloseIgnore=["inside"],this.itemSize=32,this.allowNull=!0,this.viewType="rounded",this.open=!1,this.selectClass=!0,this.onChange=()=>{},this.onTouched=()=>{},this.locale=this._config.locale}clear(){let val;val=!0===this.multiple?[]:null,this.value=val,this.onChange(this.value),this.open=!1,this._cdr.markForCheck(),this._cdr.detectChanges()}clickOption(option,event){!0===this.multiple?(this.value?.length||(this.value=[]),this.value.indexOf(option)>=0?this.removeItem(option):this.value=[...this.value,option],this._internalValue=this.value.map((_=>this.getValue(_))),this.onChange(this._internalValue)):(this.value=option,this._internalValue=this.getValue(this.value),this.onChange(this._internalValue),this.open=!1),this._cdr.markForCheck(),this._cdr.detectChanges()}itemSelected(option){return this.multiple?this.value?.indexOf(option)>=0:this.value===option}removeItemClick(option,event){event.stopPropagation(),this.removeItem(option),this._internalValue=this.value.map((_=>this.getValue(_))),this.onChange(this._internalValue)}removeItem(option){this.value=this.value.filter((_=>_!==option))}search(text){this.searchText=text}getText(option){if(null==option)return"";switch(typeof this.textRef){case"string":return option[this.textRef];case"function":return this.textRef(option);default:return option}}getValue(option){switch(typeof this.valueRef){case"string":return option[this.valueRef];case"function":return this.valueRef(option);default:return option}}getSearchString(option){switch(typeof this.searchRef){case"string":return option[this.searchRef];case"function":return this.searchRef(option);default:return""}}focus(){this._elementRef.nativeElement.focus()}writeValue(value){this._internalValue=value,this.getSelectedValue(value),this._cdr.detectChanges()}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){this.onTouched=fn}setDisabledState(isDisabled){this.disabled=isDisabled,this._cdr.markForCheck()}getSelectedValue(value){this.multiple?this.value=value&&this.options?this.options.filter((option=>value.indexOf(this.getValue(option))>-1)):[]:this.value=this.options&&this.options?.find((option=>this.getValue(option)===value))}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef},{type:core.ElementRef},{type:teta_config_service.C}];static#_2=this.propDecorators={multiple:[{type:core.HostBinding,args:["class.select_multiple"]},{type:core.Input}],options:[{type:core.Input}],invalid:[{type:core.Input}],align:[{type:core.Input}],verticalAlign:[{type:core.Input}],autoClose:[{type:core.Input}],autoCloseIgnore:[{type:core.Input}],disabled:[{type:core.Input}],itemSize:[{type:core.Input}],virtual:[{type:core.Input}],icon:[{type:core.Input}],placeholder:[{type:core.Input}],appendToBody:[{type:core.Input}],allowNull:[{type:core.Input}],viewType:[{type:core.Input}],notFoundText:[{type:core.Input}],valueRef:[{type:core.Input}],textRef:[{type:core.Input}],searchRef:[{type:core.Input}],optionDirective:[{type:core.ContentChild,args:[select_option_directive.F,{static:!0}]}],valueDirective:[{type:core.ContentChild,args:[select_value_directive.l,{static:!0}]}],open:[{type:core.HostBinding,args:["class.select_open"]}],selectClass:[{type:core.HostBinding,args:["class.select"]}],tabindex:[{type:core.HostBinding,args:["tabindex"]}],isDisabled:[{type:core.HostBinding,args:["class.select_disabled"]}]}};SelectComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-select",template:'@if (locale | async; as loc) {\n  <teta-dropdown\n    [align]="align"\n    [verticalAlign]="verticalAlign"\n    [autoClose]="autoClose"\n    [autoCloseIgnore]="autoCloseIgnore"\n    [(open)]="open"\n    [appendToBody]="appendToBody"\n    [disabled]="disabled"\n    [viewType]="viewType"\n    class="row row_auto"\n  >\n    <div tetaDropdownHead [class]="\'row row_auto select-head select_\' + viewType" [class.select-head_invalid]="invalid">\n      <div class="row_auto flex align-center">\n        @if (icon) {\n          <teta-icon [name]="icon" [palette]="\'text\'" class="margin-right-1"></teta-icon>\n        }\n        @if ((value === null || value === undefined || value?.length === 0) && !multiple) {\n          <span class="placeholder">\n            {{ placeholder || loc.notSelected }}\n          </span>\n        }\n        <ng-container\n          *ngTemplateOutlet="\n            valueDirective ? valueDirective.template : valueDefault;\n            context: { $implicit: value, value: value }\n          "\n        ></ng-container>\n      </div>\n      <teta-icon [name]="\'arrowDownSmall\'" [palette]="\'text\'"></teta-icon>\n    </div>\n    @if (options?.length) {\n      <div tetaDropdownContent class="select-body row_auto" (click)="$event.preventDefault()">\n        @if (searchRef) {\n          <div class="select-search padding-h-2 padding-top-2">\n            <teta-text-field\n              [ngModel]="searchText"\n              [class]="\'select_\' + viewType"\n              (ngModelChange)="search($event)"\n              [placeholder]="loc.search"\n              [leftIconName]="\'search\'"\n            ></teta-text-field>\n          </div>\n        }\n        @if (visibleOptions?.length) {\n          @if (!multiple && allowNull) {\n            <div [class]="\'margin-h-2 list-item list-item_interactive select_\' + viewType" (click)="clear()">\n              {{ loc.notSelected }}\n            </div>\n            <div class="list-divider margin-bottom-0"></div>\n          }\n          @if (virtual) {\n            <teta-scrollable class="column column_auto">\n              <cdk-virtual-scroll-viewport tetaScrollable [itemSize]="40" minBufferPx="200" maxBufferPx="600">\n                <div\n                  [class]="\'list-item list-item_interactive justify-content-between select_\' + viewType"\n                  *cdkVirtualFor="let option of visibleOptions; templateCacheSize: 0"\n                  [class.list-item_active]="itemSelected(option)"\n                  [tetaHighlight]="searchText"\n                  (click)="clickOption(option, $event)"\n                >\n                  <div [tetaHighlight]="searchText">\n                    <ng-container\n                      *ngTemplateOutlet="\n                        optionDirective ? optionDirective.template : optionDefault;\n                        context: { $implicit: option, option: option }\n                      "\n                    >\n                    </ng-container>\n                  </div>\n                  @if (itemSelected(option)) {\n                    <teta-icon [name]="\'tick\'" [palette]="\'text\'" class="margin-left-2"></teta-icon>\n                  }\n                </div>\n              </cdk-virtual-scroll-viewport>\n            </teta-scrollable>\n          } @else {\n            <teta-scrollable class="column column_auto" [contentClass]="[\'column\', \'column_auto\']">\n              <div class="list">\n                @for (option of visibleOptions; track option) {\n                  <div\n                    [class]="\'list-item list-item_interactive justify-content-between  select_\' + viewType"\n                    [class.list-item_active]="itemSelected(option)"\n                    (click)="clickOption(option, $event)"\n                  >\n                    <span [tetaHighlight]="searchText">\n                      <ng-container\n                        *ngTemplateOutlet="\n                          optionDirective ? optionDirective.template : optionDefault;\n                          context: { $implicit: option, option: option }\n                        "\n                      >\n                      </ng-container>\n                    </span>\n                    @if (itemSelected(option) && multiple) {\n                      <teta-icon [name]="\'tick\'" [palette]="\'text\'"></teta-icon>\n                    }\n                  </div>\n                }\n              </div>\n            </teta-scrollable>\n          }\n        } @else {\n          <p class="padding-h-3 text-overflow-ellipsis overflow-hidden select-not-found-option">\n            {{ notFoundText || loc.notFound }}\n          </p>\n        }\n        @if (multiple && value?.length) {\n          <div class="row row_auto select-chip-field flex-wrap">\n            @for (item of value; track item) {\n              <div class="tag">\n                <p>{{ getText(item) }}</p>\n                <teta-icon\n                  class="cursor-pointer"\n                  [palette]="\'text\'"\n                  [name]="\'closeCircle\'"\n                  (click)="removeItemClick(item, $event)"\n                ></teta-icon>\n              </div>\n            }\n          </div>\n        }\n      </div>\n    }\n  </teta-dropdown>\n  <ng-template #notFound>\n    <p class="padding-h-3 text-overflow-ellipsis overflow-hidden select-not-found-option">\n      {{ notFoundText || loc.notFound }}\n    </p>\n  </ng-template>\n  <ng-template #optionDefault let-option>\n    {{ getText(option) }}\n  </ng-template>\n  <ng-template #valueDefault let-value>\n    @if (multiple) {\n      <div class="row_auto overflow-hidden text-overflow-ellipsis">\n        {{ loc.selected + \' \' + value?.length }}\n      </div>\n    }\n    @if (!multiple) {\n      <span class="row row_auto overflow-hidden text-overflow-ellipsis">{{ getText(value) }}</span>\n    }\n  </ng-template>\n}\n',providers:[{provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>SelectComponent)),multi:!0}],changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[let_directive.N,dropdown_component.P,dropdown_head_directive.z,icon_component.R,common.NgTemplateOutlet,dropdown_content_directive.K,text_field_component.L,fesm2022_forms.YN,scrollable_component.x,scrolling.d6,scrolling.yg,scrollable_directive.r,scrolling.E$,HighlightDirective,common.AsyncPipe],styles:[select_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef,core.ElementRef,teta_config_service.C])],SelectComponent)},"./projects/components/src/directive/let/let.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>LetDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let LetDirective=class LetDirective{constructor(viewContainer,templateRef){viewContainer.createEmbeddedView(templateRef,new LetContext(this))}static ngTemplateContextGuard(_dir,_ctx){return!0}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,args:[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef]}]},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,args:[_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef]}]}];static#_2=this.propDecorators={tetaLet:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}]}};LetDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaLet]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef])],LetDirective);class LetContext{constructor(internalDirectiveInstance){this.internalDirectiveInstance=internalDirectiveInstance}get $implicit(){return this.internalDirectiveInstance.tetaLet}get tetaLet(){return this.internalDirectiveInstance.tetaLet}}},"./projects/components/src/directive/only-number/only-number.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>OnlyNumberDirective});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs");let OnlyNumberDirective=class OnlyNumberDirective{constructor(_elementRef,_control){this._elementRef=_elementRef,this._control=_control,this.tetaOnlyNumber=!0,this.allowDecimals=!0,this.allowSign=!0,this.decimalSeparator=".",this.commaSeparator=",",this.onlyPositive=!1,this._previousValue="",this._integerUnsigned="^[0-9]*$",this._integerSigned="^-?[0-9]+$",this._decimalUnsigned="^[0-9]+(.[0-9]+)?$",this._decimalSigned="^-?[0-9]+(.[0-9]+)?$",this._minusSign="-"}onChange(e){!1!==this.tetaOnlyNumber&&this.validateValue(this._elementRef.nativeElement.value)}dblclick(e){!1!==this.tetaOnlyNumber&&this._elementRef.nativeElement.select()}onPaste(e){!1!==this.tetaOnlyNumber&&(this.validateValue(e.clipboardData.getData("text/plain")),e.preventDefault())}onKeyDown(e){if(!1===this.tetaOnlyNumber)return;const cursorPosition=e.target.selectionStart??0,originalValue=e.target.value,controlOrCommand=!0===e.ctrlKey||!0===e.metaKey,signExists=originalValue.includes("-"),separatorExists=originalValue.includes(this.decimalSeparator)||originalValue.includes(this.commaSeparator),allowedKeys=["Backspace","ArrowLeft","ArrowRight","Delete","Escape","Tab","Home","End"],separatorIsCloseToSign=signExists&&cursorPosition<=1;!this.allowDecimals||separatorIsCloseToSign||separatorExists||allowedKeys.push(".");const firstCharacterIsSeparator=originalValue.charAt(0)!==this.decimalSeparator;if(this.allowSign&&!signExists&&firstCharacterIsSeparator&&0===cursorPosition&&!this.onlyPositive&&allowedKeys.push("-"),-1!==allowedKeys.indexOf(e.key)||"KeyA"===e.code&&controlOrCommand||"KeyC"===e.code&&controlOrCommand||"KeyV"===e.code&&controlOrCommand||"KeyZ"===e.code&&controlOrCommand||"KeyX"===e.code&&controlOrCommand)return;this._previousValue=originalValue;new RegExp(this._integerUnsigned).test(e.key)||(","===e.key&&originalValue.indexOf(".")<0&&(this._control.control.patchValue(`${originalValue.slice(0,cursorPosition)}.${originalValue.slice(cursorPosition)}`),this._elementRef.nativeElement.setSelectionRange&&this._elementRef.nativeElement.setSelectionRange(cursorPosition+1,cursorPosition+1)),e.preventDefault())}validateValue(value){if(!1===this.tetaOnlyNumber)return;value=value.replace(",",".").trim();let regex=this._integerUnsigned;this.allowDecimals||this.allowSign||(regex=this._integerUnsigned),!this.allowDecimals&&this.allowSign&&(regex=this._integerSigned),this.allowDecimals&&!this.allowSign&&(regex=this._decimalUnsigned),this.allowDecimals&&this.allowSign&&(regex=this._decimalSigned);let firstCharacter=value.charAt(0);firstCharacter===this.decimalSeparator&&(value=0+value);value.charAt(value.length-1)===this.decimalSeparator&&(value+=0);let signedValue=!1;firstCharacter===this._minusSign&&(signedValue=!0,firstCharacter=(value=value.substring(1)).charAt(0));let secondChar=value.charAt(1);for(;"0"===firstCharacter&&""!==secondChar&&secondChar!==this.decimalSeparator;)firstCharacter=(value=value.substring(1)).charAt(0),secondChar=value.charAt(1);!0===signedValue&&(value=this._minusSign+value);const valueParts=value.split(this.decimalSeparator),naturalPart=valueParts?.[0];let decimalPart=valueParts?.[1];if(null!=decimalPart&&/^0+$/.test(decimalPart)&&(decimalPart="0",value=naturalPart+"."+decimalPart),"-0"===value&&(value="0"),"-0.0"===value&&(value="0.0"),null==value||""===value)return;new RegExp(regex).test(value.toString())&&this._control.control.patchValue(parseFloat(value))}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef},{type:_angular_forms__WEBPACK_IMPORTED_MODULE_1__.vO}];static#_2=this.propDecorators={tetaOnlyNumber:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],allowDecimals:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],allowSign:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],decimalSeparator:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],commaSeparator:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],onlyPositive:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],onChange:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["change",["$event"]]}],dblclick:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["dblclick",["$event"]]}],onPaste:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["paste",["$event"]]}],onKeyDown:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["keydown",["$event"]]}]}};OnlyNumberDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaOnlyNumber]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef,_angular_forms__WEBPACK_IMPORTED_MODULE_1__.vO])],OnlyNumberDirective)},"./projects/components/src/directive/scrollable/scrollable.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ScrollableDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ScrollableDirective=class ScrollableDirective{constructor(){this.hideScrollClass=!0}static#_=this.propDecorators={hideScrollClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class.scrollable_hide_scroll"]}]}};ScrollableDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[tetaScrollable]",standalone:!0})],ScrollableDirective)},"./projects/components/src/directive/scrollable/scrollable/scrollable.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>ScrollableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var scrollable_componentngResource=__webpack_require__("./projects/components/src/directive/scrollable/scrollable/scrollable.component.scss?ngResource"),scrollable_componentngResource_default=__webpack_require__.n(scrollable_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),animationFrame=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),throttleTime=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),scrollable_directive=__webpack_require__("./projects/components/src/directive/scrollable/scrollable.directive.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),let_directive=__webpack_require__("./projects/components/src/directive/let/let.directive.ts");let ScrollableComponent=class ScrollableComponent{constructor(){this.direction="row",this.showScrollbars=!1,this.scroll=new core.EventEmitter,this._scrollSize=new Subject.B,this._alive=!0,this._observe=()=>{this._scrollSize.next()},this.scrollSize=this._scrollSize.asObservable().pipe((0,throttleTime.c)(100,animationFrame.X),(0,map.T)((()=>({scrollHeight:this._container.nativeElement.scrollHeight,scrollWidth:this._container.nativeElement.scrollWidth,clientHeight:this._container.nativeElement.clientHeight,clientWidth:this._container.nativeElement.clientWidth}))),(0,shareReplay.t)({refCount:!0,bufferSize:1})),this._observer=new ResizeObserver(this._observe)}scrollVertical(event){this._container.nativeElement.scrollTop=event.target.scrollTop}scrollHorizontal(event){this._container.nativeElement.scrollLeft=event.target.scrollLeft}ngOnInit(){this._container=this._scrollableWrapper,this._scrollDirective&&(this._container=this._scrollDirective),(0,fromEvent.R)(this._container.nativeElement,"scroll").pipe((0,takeWhile.v)((()=>this._alive)),(0,tap.M)((event=>{this._scrollbarHorizontal.nativeElement.scrollLeft=event.target.scrollLeft,this._scrollbarVertical.nativeElement.scrollTop=event.target.scrollTop,this.scroll.emit(event)}))).subscribe(),this._observer.observe(this._container.nativeElement)}ngOnDestroy(){this._alive=!1,this._observer.unobserve(this._container.nativeElement),this._observer.disconnect()}ngAfterContentChecked(){this._observe()}static#_=this.ctorParameters=()=>[];static#_2=this.propDecorators={_scrollDirective:[{type:core.ContentChild,args:[scrollable_directive.r,{static:!0,read:core.ElementRef}]}],_scrollableWrapper:[{type:core.ViewChild,args:["scrollableWrapper",{static:!0}]}],_scrollbarVertical:[{type:core.ViewChild,args:["scrollbarVertical",{static:!0}]}],_scrollbarHorizontal:[{type:core.ViewChild,args:["scrollbarHorizontal",{static:!0}]}],direction:[{type:core.Input}],showScrollbars:[{type:core.Input},{type:core.HostBinding,args:["class.show-scrollbars"]}],contentClass:[{type:core.Input}],scroll:[{type:core.Output}]}};ScrollableComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-scrollable",template:'<div class="scroll-controls" *tetaLet="scrollSize | async as scrollSize">\n  <div\n    #scrollbarVertical\n    [class.display-none]="scrollSize?.scrollHeight <= scrollSize?.clientHeight"\n    class="scroll-scrollbar scroll-scrollbar-vertical"\n    (scroll)="scrollVertical($event)"\n  >\n    <div [style.height.px]="scrollSize?.scrollHeight" style="width: 1px"></div>\n  </div>\n  <div\n    #scrollbarHorizontal\n    [class.display-none]="scrollSize?.scrollWidth <= scrollSize?.clientWidth"\n    class="scroll-scrollbar scroll-scrollbar-horizontal"\n    (scroll)="scrollHorizontal($event)"\n  >\n    <div [style.width.px]="scrollSize?.scrollWidth" style="height: 1px"></div>\n  </div>\n</div>\n\n<div #scrollableWrapper class="scroll-content-wrapper" [ngClass]="contentClass" [class.column]="direction === \'column\'">\n  <ng-content></ng-content>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[let_directive.N,common.NgClass,common.AsyncPipe,scrollable_directive.r],styles:[scrollable_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],ScrollableComponent)},"./projects/components/src/pipe/number-pipe/number.pipe.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>NumberPipe});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_util_number_helper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/components/src/pipe/util/number-helper.ts");let NumberPipe=class NumberPipe{transform(value,decimalLength=2,chunkDelimiter="",decimalDelimiter=".",chunkLength=3){return null==value||""===value?"":"string"==typeof value&&isNaN(parseFloat(value))||null===decimalLength?value.toString():(value=Number(value),(0,_util_number_helper__WEBPACK_IMPORTED_MODULE_0__.ZV)(value,decimalLength,chunkDelimiter,decimalDelimiter,chunkLength))}};NumberPipe=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Pipe)({name:"tetaNumber",standalone:!0})],NumberPipe)},"./projects/components/src/pipe/util/number-helper.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{DH:()=>prependZero,ZV:()=>formatNumber});const formatNumber=(value,decimalLength,chunkDelimiter,decimalDelimiter,chunkLength)=>{const abs=Math.abs(value);if(0<abs&&1>abs){decimalLength+=Math.floor(Math.abs(Math.log10(abs)))}const precision=Math.min((a=>{if(!isFinite(a))return 0;let e=1,p=0;for(;Math.round(a*e)/e!==a;)e*=10,p++;return p})(value),Math.floor(decimalLength)),result="\\d(?=(\\d{"+chunkLength+"})+"+(precision>0?"\\D":"$")+")",num=value.toFixed(precision);return(decimalDelimiter?num.replace(".",decimalDelimiter):num).replace(new RegExp(result,"g"),"$&"+chunkDelimiter)},prependZero=(input,length)=>("0".repeat(length)+input).slice(-length)},"./projects/components/src/component/input/text-field/text-field.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/select/select/select.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/directive/scrollable/scrollable/scrollable.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  overflow: hidden;\n  position: relative;\n  z-index: 0;\n  display: flex;\n}\n:host:hover .scroll-controls {\n  opacity: 1;\n}\n:host.show-scrollbars .scroll-controls {\n  opacity: 1;\n}\n\n:host::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.scroll-content-wrapper {\n  display: flex;\n  overflow: auto;\n  flex-grow: 1;\n}\n.scroll-content-wrapper::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.scroll-content {\n  position: relative;\n  z-index: 0;\n  flex: 1;\n  display: flex;\n  height: auto;\n  min-width: 0;\n}\n\n.scroll-controls {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.5s linear;\n}\n\n.scroll-scrollbar {\n  position: absolute;\n  overflow: auto;\n  pointer-events: auto;\n}\n.scroll-scrollbar-vertical {\n  right: 0;\n  top: 0;\n  bottom: 12px;\n  width: 12px;\n}\n.scroll-scrollbar-horizontal {\n  right: 12px;\n  left: 0;\n  bottom: 0;\n  height: 12px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);