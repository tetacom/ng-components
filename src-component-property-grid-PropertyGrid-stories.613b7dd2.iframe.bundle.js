(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[4772],{"./projects/components/src/component/expand-card/expand-item/expand-item.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>ExpandItemComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var expand_item_componentngResource=__webpack_require__("./projects/components/src/component/expand-card/expand-item/expand-item.component.scss?ngResource"),expand_item_componentngResource_default=__webpack_require__.n(expand_item_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),button_component=__webpack_require__("./projects/components/src/component/button/button/button.component.ts");let ExpandItemComponent=class ExpandItemComponent{constructor(){this.open=!0,this.openChange=new core.EventEmitter}setOpen(){this.open=!this.open,this.openChange.emit(this.open)}static{this.propDecorators={open:[{type:core.Input}],openChange:[{type:core.Output}]}}};ExpandItemComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-expand-item",template:'<div class="row align-center gap color-text-90 height-6">\n  <div class="row row_auto align-center font-title-2">\n    <ng-content select="head"></ng-content>\n  </div>\n  <button type="button" teta-button (click)="setOpen()" [palette]="\'text\'" [view]="\'ghost\'" [square]="true">\n    <teta-icon [name]="open ? \'arrowUpKey\' : \'arrowDownKey\'" [palette]="\'text\'"></teta-icon>\n  </button>\n</div>\n@if (open) {\n  <div class="content">\n    <ng-content></ng-content>\n  </div>\n}\n',changeDetection:core.ChangeDetectionStrategy.OnPush,exportAs:"expand-item",imports:[button_component.Q,icon_component.R],styles:[expand_item_componentngResource_default()]})],ExpandItemComponent)},"./projects/components/src/component/toggle/toggle/toggle.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ToggleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var toggle_componentngResource=__webpack_require__("./projects/components/src/component/toggle/toggle/toggle.component.scss?ngResource"),toggle_componentngResource_default=__webpack_require__.n(toggle_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");const TOGGLE_CONTROL_VALUE_ACCESSOR={provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>ToggleComponent)),multi:!0};let ToggleComponent=class ToggleComponent{get paletteClass(){return this.palette?`toggle-button-${this.palette}`:""}get model(){return this.model$}set model(v){v!==this.model$&&(this.model$=v,this.onChange(v))}constructor(cdr){this.cdr=cdr,this.tabindex=0,this.toggleClass=!0,this.palette="primary"}changeValue(){this.disabled||(this.model=!this.model)}writeValue(model){this.model$=model,this.cdr.markForCheck()}onChange(_){}onTouched(){}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){this.onTouched=fn}setDisabledState(isDisabled){this.disabled=isDisabled,this.cdr.markForCheck()}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={tabindex:[{type:core.HostBinding,args:["attr.tabindex"]}],toggleClass:[{type:core.HostBinding,args:["class.toggle"]}],palette:[{type:core.Input}],noLabel:[{type:core.Input}],disabled:[{type:core.HostBinding,args:["class.toggle_disabled"]},{type:core.Input}],changeValue:[{type:core.HostListener,args:["click"]}]}}};ToggleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-toggle",template:'@if (!noLabel) {\n  <span class="font-body-3 row_auto">\n    <ng-content></ng-content>\n  </span>\n}\n<div class="toggle-button" [class.toggle-button-on]="model" [ngClass]="paletteClass">\n  <div class="toggle-button-circle"></div>\n</div>\n',providers:[TOGGLE_CONTROL_VALUE_ACCESSOR],changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[common.NgClass],styles:[toggle_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],ToggleComponent)},"./projects/components/src/component/property-grid/PropertyGrid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>PropertyGrid_stories,simplePropertyGrid:()=>simplePropertyGrid});var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),jsverse_transloco=__webpack_require__("./node_modules/@jsverse/transloco/fesm2022/jsverse-transloco.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var property_grid_demo_componentngResource=__webpack_require__("./projects/components/src/component/property-grid/property-grid-demo/property-grid-demo/property-grid-demo.component.scss?ngResource"),property_grid_demo_componentngResource_default=__webpack_require__.n(property_grid_demo_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),table_column=__webpack_require__("./projects/components/src/component/table/contract/table-column.ts"),filter_type_enum=__webpack_require__("./projects/components/src/component/filter/enum/filter-type.enum.ts"),faker=__webpack_require__("./node_modules/faker/index.js"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs");let PropertyGridItemDescriptionDirective=class PropertyGridItemDescriptionDirective{constructor(template){this.template=template}static{this.ctorParameters=()=>[{type:core.TemplateRef}]}static{this.propDecorators={name:[{type:core.Input,args:["tetaPropertyGridItemDescription"]}]}}};PropertyGridItemDescriptionDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaPropertyGridItemDescription]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[core.TemplateRef])],PropertyGridItemDescriptionDirective);var property_grid_componentngResource=__webpack_require__("./projects/components/src/component/property-grid/property-grid/property-grid.component.scss?ngResource"),property_grid_componentngResource_default=__webpack_require__.n(property_grid_componentngResource),bool_or_func=__webpack_require__("./projects/components/src/util/bool-or-func.ts"),forms_util=__webpack_require__("./projects/components/src/util/forms-util.ts");var property_grid_group_componentngResource=__webpack_require__("./projects/components/src/component/property-grid/property-grid/property-grid-group/property-grid-group.component.scss?ngResource"),property_grid_group_componentngResource_default=__webpack_require__.n(property_grid_group_componentngResource);var property_grid_item_componentngResource=__webpack_require__("./projects/components/src/component/property-grid/property-grid/property-grid-item/property-grid-item.component.scss?ngResource"),property_grid_item_componentngResource_default=__webpack_require__.n(property_grid_item_componentngResource),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),align_enum=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),text_field_component=__webpack_require__("./projects/components/src/component/input/text-field/text-field.component.ts"),toggle_component=__webpack_require__("./projects/components/src/component/toggle/toggle/toggle.component.ts"),date_picker_component=__webpack_require__("./projects/components/src/component/date-picker/date-picker/date-picker.component.ts"),select_component=__webpack_require__("./projects/components/src/component/select/select/select.component.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),input_component=__webpack_require__("./projects/components/src/component/input/input/input.component.ts");let DisableControlDirective=class DisableControlDirective{set tetaDisableControl(val){this.ngControl.control&&(val?this.ngControl.control.disable({emitEvent:!1}):this.ngControl.control.enable({emitEvent:!1}))}constructor(ngControl){this.ngControl=ngControl}static{this.ctorParameters=()=>[{type:fesm2022_forms.vO}]}static{this.propDecorators={tetaDisableControl:[{type:core.Input}]}}};DisableControlDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[tetaDisableControl]",standalone:!0}),(0,tslib_es6.Sn)("design:paramtypes",[fesm2022_forms.vO])],DisableControlDirective);let PropertyGridItemComponent=class PropertyGridItemComponent{constructor(){this.transloco=(0,core.inject)(jsverse_transloco.JO),this._formGroup=(0,core.inject)(fesm2022_forms.ZU),this.column=(0,core.input)(),this.hideNonEditable=(0,core.input)(),this.dict=(0,core.input)(),this.decimalPart=(0,core.input)(),this.item=(0,core.input)(),this.itemTemplates=(0,core.input)(),this.template=(0,core.computed)((()=>this.itemTemplates().find((item=>item.name===this.column().name)))),this.editable=(0,core.computed)((()=>(0,bool_or_func.H)(this.column().editable)({column:this.column(),row:this.formGroup?.getRawValue()}))),this.horizontal=(0,core.input)(),this.controlValueChange=(0,core.output)(),this.align=align_enum.W,this.filterTypeEnum=filter_type_enum.R,this.caption=(0,core.computed)((()=>this.column().filterType===filter_type_enum.R.boolean?"":`${this.column().caption}${this.column().unit?`, ${this.column().unit}`:""}`)),this.hint=(0,core.computed)((()=>this.column().filterType===filter_type_enum.R.boolean?"":`${this.column().hint||this.column().caption}${this.column().unit?`, ${this.column().unit}`:""}`)),this._alive=!0}get formGroup(){return this._formGroup instanceof fesm2022_forms.gE?this._formGroup:this._formGroup instanceof fesm2022_forms.cV?this._formGroup.form:null}getDict(){const dict=this.dict()?this.dict()[this.column().name]:[];return this.column().parentName?.length>0?dict?.filter((dictItem=>dictItem.parentId===this.formGroup?.getRawValue()[this.column().parentName])):dict}controlIsInvalid(controlName){return forms_util.w.controlIsInvalid(this.formGroup,controlName)}getError(column){const control=this.formGroup?.get(column.name);return control?.hasError("required")?this.transloco.translate("errors.field_is_required"):control?.hasError("min")?this.transloco.translate("errors.min_value",{value:column.minValue}):control?.hasError("max")?this.transloco.translate("errors.max_value",{value:column.maxValue}):control?.hasError("maxlength")?this.transloco.translate("errors.max_length",{value:column.maxLength}):null}ngOnDestroy(){this._alive=!1,this._formSub?.unsubscribe()}ngOnChanges(){this.column()&&this.item()&&(this.formGroup.get(this.column().name)||this.formGroup.setControl(this.column().name,forms_util.w.initControlFromColumn(this.column(),this.item())),this._formSub?.unsubscribe(),this._formSub=this.formGroup?.controls[this.column().name]?.valueChanges.pipe((0,takeWhile.v)((()=>this._alive))).subscribe((_=>{this.controlValueChange.emit({id:_,name:this.column().name})})))}static{this.propDecorators={column:[{type:core.Input,args:[{isSignal:!0,alias:"column",required:!1,transform:void 0}]}],hideNonEditable:[{type:core.Input,args:[{isSignal:!0,alias:"hideNonEditable",required:!1,transform:void 0}]}],dict:[{type:core.Input,args:[{isSignal:!0,alias:"dict",required:!1,transform:void 0}]}],decimalPart:[{type:core.Input,args:[{isSignal:!0,alias:"decimalPart",required:!1,transform:void 0}]}],item:[{type:core.Input,args:[{isSignal:!0,alias:"item",required:!1,transform:void 0}]}],itemTemplates:[{type:core.Input,args:[{isSignal:!0,alias:"itemTemplates",required:!1,transform:void 0}]}],horizontal:[{type:core.Input,args:[{isSignal:!0,alias:"horizontal",required:!1,transform:void 0}]}],controlValueChange:[{type:core.Output,args:["controlValueChange"]}]}}};PropertyGridItemComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-property-grid-item",template:'@if (editable() || !hideNonEditable()) {\n  <teta-input\n    [label]="caption()"\n    [hint]="hint()"\n    [formGroup]="formGroup"\n    [horizontal]="horizontal()"\n    [required]="column().required"\n  >\n    @if (template()) {\n      <ng-container\n        *ngTemplateOutlet="template().template; context: { $implicit: formGroup?.get(column().name) }"\n      ></ng-container>\n    } @else {\n      @if (formGroup?.get(column().name)) {\n        @switch (column().filterType) {\n          @case (filterTypeEnum.list) {\n            <teta-select\n              class="row_auto"\n              [tetaDisableControl]="!editable()"\n              [searchRef]="getDict()?.length > 10 ? \'name\' : \'\'"\n              [allowNull]="!column().required"\n              [appendToBody]="true"\n              [invalid]="controlIsInvalid(column().name)"\n              [formControlName]="column().name"\n              [options]="getDict()"\n              [valueRef]="\'id\'"\n              [textRef]="\'name\'"\n              [multiple]="false"\n            ></teta-select>\n          }\n          @case (filterTypeEnum.date) {\n            <teta-date-picker\n              class="row_auto"\n              [appendToBody]="true"\n              [tetaDisableControl]="!editable()"\n              [invalid]="controlIsInvalid(column().name)"\n              [formControlName]="column().name"\n            ></teta-date-picker>\n          }\n          @case (filterTypeEnum.boolean) {\n            <teta-toggle [tetaDisableControl]="!editable()" [formControlName]="column().name">\n              {{ column().caption }}\n            </teta-toggle>\n          }\n          @default {\n            <teta-text-field\n              class="row_auto"\n              [tetaDisableControl]="!editable()"\n              [decimalPart]="column().filterType === filterTypeEnum.number ? decimalPart() : null"\n              [onlyNumber]="column().filterType === filterTypeEnum.number"\n              [placeholder]="column().caption"\n              [invalid]="controlIsInvalid(column().name)"\n              [formControlName]="column().name"\n            ></teta-text-field>\n          }\n        }\n      }\n    }\n    @if (controlIsInvalid(column().name)) {\n      <div ngProjectAs="message" class="color-red-50">\n        {{ getError(column()) }}\n      </div>\n    }\n  </teta-input>\n}\n',viewProviders:[forms_util.w.formProvider],imports:[input_component.S,fesm2022_forms.YN,fesm2022_forms.X1,common.NgTemplateOutlet,select_component.w,date_picker_component.I,toggle_component.a,text_field_component.L,DisableControlDirective],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[property_grid_item_componentngResource_default()]})],PropertyGridItemComponent);var expand_item_component=__webpack_require__("./projects/components/src/component/expand-card/expand-item/expand-item.component.ts");let PropertyGridGroupComponent=class PropertyGridGroupComponent{constructor(){this.column=(0,core.input)(),this.hideNonEditable=(0,core.input)(),this.dict=(0,core.input)(),this.item=(0,core.input)(),this.horizontal=(0,core.input)(),this.controlValueChange=(0,core.output)(),this.decimalPart=(0,core.input)(),this.itemTemplates=(0,core.input)()}static{this.propDecorators={column:[{type:core.Input,args:[{isSignal:!0,alias:"column",required:!1,transform:void 0}]}],hideNonEditable:[{type:core.Input,args:[{isSignal:!0,alias:"hideNonEditable",required:!1,transform:void 0}]}],dict:[{type:core.Input,args:[{isSignal:!0,alias:"dict",required:!1,transform:void 0}]}],item:[{type:core.Input,args:[{isSignal:!0,alias:"item",required:!1,transform:void 0}]}],horizontal:[{type:core.Input,args:[{isSignal:!0,alias:"horizontal",required:!1,transform:void 0}]}],controlValueChange:[{type:core.Output,args:["controlValueChange"]}],decimalPart:[{type:core.Input,args:[{isSignal:!0,alias:"decimalPart",required:!1,transform:void 0}]}],itemTemplates:[{type:core.Input,args:[{isSignal:!0,alias:"itemTemplates",required:!1,transform:void 0}]}]}}};PropertyGridGroupComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-property-grid-group",template:'<teta-expand-item>\n  <span ngProjectAs="head">\n    {{ column().caption }}\n  </span>\n  <div class="form-container">\n    @for (col of column().columns; track col.name) {\n      @if (col.columns?.length < 1) {\n        @if (column().editable || !hideNonEditable) {\n          <teta-property-grid-item\n            [id]="col.name"\n            [dict]="dict()"\n            [column]="col"\n            [item]="item()"\n            [itemTemplates]="itemTemplates()"\n            [decimalPart]="decimalPart()"\n            [hideNonEditable]="hideNonEditable()"\n            (controlValueChange)="controlValueChange.emit($event)"\n            [horizontal]="horizontal()"\n          ></teta-property-grid-item>\n        }\n      } @else {\n        <teta-property-grid-group\n          [id]="col.name"\n          [dict]="dict()"\n          [column]="col"\n          [item]="item()"\n          [itemTemplates]="itemTemplates()"\n          [decimalPart]="decimalPart()"\n          [hideNonEditable]="hideNonEditable()"\n          [horizontal]="horizontal()"\n          (controlValueChange)="controlValueChange.emit($event)"\n        ></teta-property-grid-group>\n      }\n    }\n  </div>\n</teta-expand-item>\n',viewProviders:[forms_util.w.formProvider],imports:[expand_item_component.$,PropertyGridItemComponent],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[property_grid_group_componentngResource_default()]})],PropertyGridGroupComponent);var array_util=__webpack_require__("./projects/components/src/common/util/array-util.ts");let PropertyGridComponent=class PropertyGridComponent{get formGroup(){return this._formGroup instanceof fesm2022_forms.gE?this._formGroup:this._formGroup instanceof fesm2022_forms.cV?this._formGroup.form:null}constructor(_formGroup){this._formGroup=_formGroup,this.formClass=!0,this.itemTemplates=(0,core.contentChildren)(PropertyGridItemDescriptionDirective),this.hideNonEditable=(0,core.input)(),this.columns=(0,core.input)(),this.dict=(0,core.input)(),this.item=(0,core.input)(),this.horizontal=(0,core.input)(),this.decimalPart=(0,core.input)(),this.controlValueChange=(0,core.output)(),(0,core.effect)((()=>{if(this.item()&&this.columns()?.length&&this.formGroup)for(const key in this.item())if(Object.prototype.hasOwnProperty.call(this.item(),key))if(this.formGroup.get(key))this.formGroup.patchValue(this.item(),{emitEvent:!1});else{const currentColumn=array_util._.findRecursive(this.columns(),(item=>item.name===key),"columns");currentColumn?this.formGroup.setControl(key,forms_util.w.initControlFromColumn(currentColumn,this.item()),{emitEvent:!1}):this.formGroup.setControl(key,new fesm2022_forms.hs(this.item()[key]),{emitEvent:!1})}}))}getEditable(column){return(0,bool_or_func.H)(column.editable)({column,row:this.formGroup?.getRawValue()})}onControlValueChange(event){const affected=this.columns().filter((_=>_.parentName===event.name));affected?.length&&affected.forEach((item=>{const value=this.formGroup.getRawValue()[item.name];if(value){const dictValue=this.getDictValue(value,item.name);if(dictValue&&dictValue.parentId!==event.id){const newObj={};newObj[item.name]=null,this.formGroup.patchValue(newObj)}}})),this.controlValueChange.emit(event)}getDictValue(value,name){return this.dict()[name]?.find((_=>_.id===value))}static{this.ctorParameters=()=>[{type:fesm2022_forms.ZU,decorators:[{type:core.Optional}]}]}static{this.propDecorators={formClass:[{type:core.HostBinding,args:["class.form-container"]}],itemTemplates:[{type:core.ContentChildren,args:[PropertyGridItemDescriptionDirective,{isSignal:!0}]}],hideNonEditable:[{type:core.Input,args:[{isSignal:!0,alias:"hideNonEditable",required:!1,transform:void 0}]}],columns:[{type:core.Input,args:[{isSignal:!0,alias:"columns",required:!1,transform:void 0}]}],dict:[{type:core.Input,args:[{isSignal:!0,alias:"dict",required:!1,transform:void 0}]}],item:[{type:core.Input,args:[{isSignal:!0,alias:"item",required:!1,transform:void 0}]}],horizontal:[{type:core.Input,args:[{isSignal:!0,alias:"horizontal",required:!1,transform:void 0}]}],decimalPart:[{type:core.Input,args:[{isSignal:!0,alias:"decimalPart",required:!1,transform:void 0}]}],controlValueChange:[{type:core.Output,args:["controlValueChange"]}]}}};PropertyGridComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-property-grid",template:'@if (columns()?.length) {\n  @for (column of columns(); track column.name) {\n    @if (column.columns?.length < 1 && (getEditable(column) || !hideNonEditable())) {\n      <teta-property-grid-item\n        [dict]="dict()"\n        [column]="column"\n        [item]="item()"\n        [id]="column.name"\n        [itemTemplates]="itemTemplates()"\n        [decimalPart]="decimalPart()"\n        [formGroup]="formGroup"\n        [horizontal]="horizontal()"\n        (controlValueChange)="onControlValueChange($event)"\n        [hideNonEditable]="hideNonEditable()"\n      ></teta-property-grid-item>\n    }\n    @if (column.columns?.length > 0 && (getEditable(column) || !hideNonEditable())) {\n      <teta-property-grid-group\n        [id]="column.name"\n        [dict]="dict()"\n        [column]="column"\n        [item]="item()"\n        [itemTemplates]="itemTemplates()"\n        [decimalPart]="decimalPart()"\n        [formGroup]="formGroup"\n        [horizontal]="horizontal()"\n        (controlValueChange)="onControlValueChange($event)"\n        [hideNonEditable]="hideNonEditable()"\n      ></teta-property-grid-group>\n    }\n  }\n}\n',viewProviders:[forms_util.w.formProvider],imports:[PropertyGridItemComponent,fesm2022_forms.YN,fesm2022_forms.X1,PropertyGridGroupComponent],changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[property_grid_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[fesm2022_forms.ZU])],PropertyGridComponent);var button_component=__webpack_require__("./projects/components/src/component/button/button/button.component.ts");let PropertyGridDemoComponent=class PropertyGridDemoComponent{constructor(){this.aaa=!1,this.item=(0,core.signal)(this.getItem()),this.dict={ram:[{id:8,name:"8"},{id:16,name:"16"},{id:32,name:"32"},{id:64,name:"64"},{id:128,name:"128"}]},this.columns=(0,core.signal)([new table_column.V({name:"name",flex:1,locked:!0,filterType:filter_type_enum.R.string,required:!0}),new table_column.V({name:"date",locked:!0,editable:!1,filterType:filter_type_enum.R.date}),new table_column.V({name:"value",locked:!0,filterType:filter_type_enum.R.number}),new table_column.V({name:"summary",filterType:filter_type_enum.R.number}),new table_column.V({name:"ram",caption:"RAM",filterType:filter_type_enum.R.list})]),this.onValueChange=newValue=>{console.log("onValueChange",this.form.form.getRawValue())}}showValue(){console.log("showValue",this.form.form.getRawValue())}updateColumns(){this.aaa=!this.aaa,this.columns.set([...this.columns().map((col=>"value"===col.name||"date"===col.name?{...col,editable:this.aaa}:{...col}))])}updateItem(){this.item.set(this.getItem()),this.updateColumns()}getItem(){return{unknown:"unknownProperty",name:`${faker.name.firstName()} ${faker.name.lastName()}`,date:faker.date.between(new Date(2010,0,1),new Date(2021,0,1)),value:faker.datatype.number({min:0,max:100}),summary:faker.datatype.number({min:0,max:1e5}),ram:faker.helpers.randomize([8,16,32,64,128]),address:faker.address.streetAddress(),state:faker.address.state(),city:faker.address.city(),zip:faker.address.zipCode()}}static{this.propDecorators={form:[{type:core.ViewChild,args:[fesm2022_forms.cV,{static:!0}]}]}}};PropertyGridDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-property-grid-demo",template:'<form #form>\n  <ng-container *transloco="let t; scope: \'errors\';">\n\n    <teta-property-grid\n      class="scrollable padding-h-3 row_auto"\n      style="width: 100%"\n      (controlValueChange)="onValueChange($event)"\n      [item]="item()"\n      [horizontal]="true"\n      [columns]="columns()"\n      [dict]="dict"\n    >\n      <ng-template [tetaPropertyGridItemDescription]="\'ram\'" let-control>\n        <input [formControl]="control" class="input" />\n      </ng-template>\n    </teta-property-grid>\n  </ng-container>\n</form>\n<button teta-button (click)="showValue()">ShowValue</button>\n<button teta-button (click)="updateColumns()">updateColumns</button>\n<button teta-button (click)="updateItem()">updateItem</button>\n',imports:[fesm2022_forms.YN,PropertyGridComponent,PropertyGridItemDescriptionDirective,fesm2022_forms.X1,button_component.Q,jsverse_transloco.Kj,jsverse_transloco.bA],changeDetection:core.ChangeDetectionStrategy.OnPush,providers:[(0,jsverse_transloco.bF)("errors")],styles:[property_grid_demo_componentngResource_default()]})],PropertyGridDemoComponent);const PropertyGrid_stories={title:"Component/PropertyGrid",moduleMetadata:{imports:[PropertyGridDemoComponent],providers:[(0,jsverse_transloco.bF)("errors")]}},simplePropertyGrid=()=>({moduleMetadata:{imports:[icon_sprite_directive._,PropertyGridDemoComponent],entryComponents:[],providers:[(0,jsverse_transloco.bF)("errors")]},template:'<div [tetaIconSprite]="\'assets/icons.svg\'"\n                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">\n              <teta-property-grid-demo></teta-property-grid-demo>\n            </div>'}),__namedExportsOrder=["simplePropertyGrid"];simplePropertyGrid.parameters={...simplePropertyGrid.parameters,docs:{...simplePropertyGrid.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [IconSpriteDirective, PropertyGridDemoComponent],\n    entryComponents: [],\n    providers: [provideTranslocoScope(\'errors\')]\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'"\n                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">\n              <teta-property-grid-demo></teta-property-grid-demo>\n            </div>`\n})',...simplePropertyGrid.parameters?.docs?.source}}}},"./projects/components/src/component/expand-card/expand-item/expand-item.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  animation: append-animate 0.5s linear;\n  transition: order 5s ease-in;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.content {\n  animation: append-animate 0.5s linear;\n}\n\n@keyframes append-animate {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/property-grid/property-grid-demo/property-grid-demo/property-grid-demo.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  flex-grow: 1;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/property-grid/property-grid/property-grid-group/property-grid-group.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  flex-direction: column;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/property-grid/property-grid/property-grid-item/property-grid-item.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/property-grid/property-grid/property-grid.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  padding: 12px 8px;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/toggle/toggle/toggle.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);