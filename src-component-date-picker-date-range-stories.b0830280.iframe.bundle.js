(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[1306],{"./projects/components/src/locale/teta-config.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{C:()=>TetaConfigService});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");const enLocale={apply:"Apply",cancel:"Cancel",clear:"Clear",pin:"Pin",unpin:"Unpin",sortAsc:"Sort asc",sortDesc:"Sort desc",clearSort:"Clear sort",clearAllSort:"Clear all sort",clearFilter:"Clear filter",clearAllFilters:"Clear all filters",dateRangeMask:"dd.mm.yyyy - dd.mm.yyyy",dateMask:"dd.mm.yyyy",dateTimeMask:"dd.mm.yyyy, hh:mm",autosizeColumn:"Autosize column",autosizeAll:"Autosize all columns",resetColumnsSize:"Reset columns settings",from:"From",to:"To",all:"All",min:"Min",max:"Max",sum:"Sum",avg:"Avg",search:"Search",selectYear:"Select year",selected:"Selected",notSelected:"Not selected",notFound:"Not found",yes:"Yes",no:"No",months:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Su","Mo","Tu","We","Th","Fr","Sa"]};let TetaConfigService=class TetaConfigService{constructor(){this.defaultLocale=enLocale,this.locale$=new BehaviorSubject.t(this.defaultLocale),this.locale=this.locale$.asObservable()}setLocale(newLocale){newLocale?this.locale$.next(newLocale):this.locale$.next(this.defaultLocale)}static{this.ctorParameters=()=>[]}};TetaConfigService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"}),(0,tslib_es6.Sn)("design:paramtypes",[])],TetaConfigService)},"./node_modules/rxjs/dist/esm5/internal/observable/timer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>timer});var Observable=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),isScheduler=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js");function timer(dueTime,intervalOrScheduler,scheduler){void 0===dueTime&&(dueTime=0),void 0===scheduler&&(scheduler=scheduler_async.b);var intervalDuration=-1;return null!=intervalOrScheduler&&((0,isScheduler.m)(intervalOrScheduler)?scheduler=intervalOrScheduler:intervalDuration=intervalOrScheduler),new Observable.c((function(subscriber){var due=function isValidDate(value){return value instanceof Date&&!isNaN(value)}(dueTime)?+dueTime-scheduler.now():dueTime;due<0&&(due=0);var n=0;return scheduler.schedule((function(){subscriber.closed||(subscriber.next(n++),0<=intervalDuration?this.schedule(void 0,intervalDuration):subscriber.complete())}),due)}))}},"./node_modules/rxjs/dist/esm5/internal/operators/share.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>share});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_Subject__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js"),_util_lift__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js");function share(options){void 0===options&&(options={});var _a=options.connector,connector=void 0===_a?function(){return new _Subject__WEBPACK_IMPORTED_MODULE_0__.B}:_a,_b=options.resetOnError,resetOnError=void 0===_b||_b,_c=options.resetOnComplete,resetOnComplete=void 0===_c||_c,_d=options.resetOnRefCountZero,resetOnRefCountZero=void 0===_d||_d;return function(wrapperSource){var connection,resetConnection,subject,refCount=0,hasCompleted=!1,hasErrored=!1,cancelReset=function(){null==resetConnection||resetConnection.unsubscribe(),resetConnection=void 0},reset=function(){cancelReset(),connection=subject=void 0,hasCompleted=hasErrored=!1},resetAndUnsubscribe=function(){var conn=connection;reset(),null==conn||conn.unsubscribe()};return(0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.N)((function(source,subscriber){refCount++,hasErrored||hasCompleted||cancelReset();var dest=subject=null!=subject?subject:connector();subscriber.add((function(){0!==--refCount||hasErrored||hasCompleted||(resetConnection=handleReset(resetAndUnsubscribe,resetOnRefCountZero))})),dest.subscribe(subscriber),!connection&&refCount>0&&(connection=new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.Ms({next:function(value){return dest.next(value)},error:function(err){hasErrored=!0,cancelReset(),resetConnection=handleReset(reset,resetOnError,err),dest.error(err)},complete:function(){hasCompleted=!0,cancelReset(),resetConnection=handleReset(reset,resetOnComplete),dest.complete()}}),(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.Tg)(source).subscribe(connection))}))(wrapperSource)}}function handleReset(reset,on){for(var args=[],_i=2;_i<arguments.length;_i++)args[_i-2]=arguments[_i];if(!0!==on){if(!1!==on){var onSubscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.Ms({next:function(){onSubscriber.unsubscribe(),reset()}});return(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.Tg)(on.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.fX)([],(0,tslib__WEBPACK_IMPORTED_MODULE_4__.zs)(args)))).subscribe(onSubscriber)}}else reset()}},"./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>shareReplay});var _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),_share__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js");function shareReplay(configOrBufferSize,windowTime,scheduler){var _a,_b,_c,bufferSize,refCount=!1;return configOrBufferSize&&"object"==typeof configOrBufferSize?(_a=configOrBufferSize.bufferSize,bufferSize=void 0===_a?1/0:_a,_b=configOrBufferSize.windowTime,windowTime=void 0===_b?1/0:_b,refCount=void 0!==(_c=configOrBufferSize.refCount)&&_c,scheduler=configOrBufferSize.scheduler):bufferSize=null!=configOrBufferSize?configOrBufferSize:1/0,(0,_share__WEBPACK_IMPORTED_MODULE_0__.u)({connector:function(){return new _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__.m(bufferSize,windowTime,scheduler)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:refCount})}},"./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{v:()=>takeWhile});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");function takeWhile(predicate,inclusive){return void 0===inclusive&&(inclusive=!1),(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){var index=0;source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,(function(value){var result=predicate(value,index++);(result||inclusive)&&subscriber.next(value),!result&&subscriber.complete()})))}))}},"./projects/components/src/component/date-picker/date-range.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,baseDateRange:()=>baseDateRange,default:()=>date_range_stories,disabledDateRange:()=>disabledDateRange,invalidDateRange:()=>invalidDateRange});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),maskito_angular=__webpack_require__("./node_modules/@maskito/angular/fesm2020/maskito-angular.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var date_range_componentngResource=__webpack_require__("./projects/components/src/component/date-picker/date-range/date-range.component.scss?ngResource"),date_range_componentngResource_default=__webpack_require__.n(date_range_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),index_esm=__webpack_require__("./node_modules/@maskito/kit/index.esm.js"),dayjs_min=__webpack_require__("./node_modules/dayjs/dayjs.min.js"),dayjs_min_default=__webpack_require__.n(dayjs_min),ReplaySubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),lastValueFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),align_enum=__webpack_require__("./projects/components/src/common/enum/align.enum.ts"),vertical_align_enum=__webpack_require__("./projects/components/src/common/enum/vertical-align.enum.ts"),base_picker=__webpack_require__("./projects/components/src/component/date-picker/base-picker.ts"),teta_config_service=__webpack_require__("./projects/components/src/locale/teta-config.service.ts");var range_calendar_componentngResource=__webpack_require__("./projects/components/src/component/date-picker/date-range/range-calendar/range-calendar.component.scss?ngResource"),range_calendar_componentngResource_default=__webpack_require__.n(range_calendar_componentngResource),combineLatest=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js"),takeWhile=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),base_calendar=__webpack_require__("./projects/components/src/component/date-picker/base-calendar.ts"),year_picker_component=__webpack_require__("./projects/components/src/component/date-picker/year-picker/year-picker.component.ts"),month_picker_component=__webpack_require__("./projects/components/src/component/date-picker/month-picker/month-picker.component.ts"),day_picker_component=__webpack_require__("./projects/components/src/component/date-picker/day-picker/day-picker.component.ts"),icon_component=__webpack_require__("./projects/components/src/component/icon/icon/icon.component.ts"),button_component=__webpack_require__("./projects/components/src/component/button/button/button.component.ts");let RangeCalendarComponent=class RangeCalendarComponent extends base_calendar.E{get hoveredDate(){return this._hoveredDate}set hoveredDate(e){this._hoveredDate=e,this._cdr.detectChanges()}constructor(_cdr){super(_cdr),this._cdr=_cdr,this.allowNull=!0,this.hoveredDateChange=new core.EventEmitter,this.setDate=new core.EventEmitter,this._hoveredDate=null,(0,combineLatest.z)([this.currentYear,this.currentMonth,this.minMax]).pipe((0,takeWhile.v)((()=>this.alive)),(0,shareReplay.t)({bufferSize:1,refCount:!1}),(0,filter.p)((([currentYear,currentMonth])=>null!==currentMonth&&null!==currentYear)),(0,map.T)((([year,month,minMax])=>{const{availableYear,availableMonth}=this.getAvailableMonthYear(month+1,year);return{currentMonth:this.generateCalendar(dayjs_min_default()(new Date(this.selectedDate.from||new Date)).locale("ru",{weekStart:1}),year,month,minMax),nextMonth:this.generateCalendar(dayjs_min_default()(new Date(this.selectedDate.from||new Date)).locale("ru",{weekStart:1}),availableYear,availableMonth,minMax)}}))).subscribe((_=>{this.calendar=_}))}getFromTo(){let dateFrom,dateTo;return this.selectedDate?.from?(dateFrom=new Date(this.selectedDate.from),dateTo=null):this.allowNull?(dateFrom=this.date?.from?new Date(this.date.from):null,dateTo=this.date?.to?new Date(this.date.to):null):(dateFrom=this.date?.from?new Date(this.date.from):new Date,dateTo=this.date?.to?new Date(this.date.to):new Date),{from:dateFrom,to:dateTo}}isSelected(d,selectedDate){const{from,to}=this.getFromTo();return this.checkSelected(d,from)||this.checkSelected(d,to)}checkSelected(date,selectedDate){const isSelectedDate=date.getDate()===selectedDate?.getDate(),isSelectedYear=date.getFullYear()===selectedDate?.getFullYear(),isSelectedMonth=date.getMonth()===selectedDate?.getMonth();return isSelectedDate&&isSelectedMonth&&isSelectedYear}isFirstDaySuitable(m,y,max){const{availableYear,availableMonth}=this.getAvailableMonthYear(m,y);return this.isSuitableMaxDate(dayjs_min_default()(new Date(availableYear,availableMonth)).startOf("month").toDate(),max)}isLastDaySuitable(m,y,min){const{availableYear,availableMonth}=this.getAvailableMonthYear(m,y);return this.isSuitableMinDate(dayjs_min_default()(new Date(availableYear,availableMonth)).endOf("month").toDate(),min)}ngOnChanges(changes){changes?.hoveredDate||this.changeCalendarData(this.selectedDate.from||this.date.from)}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={locale:[{type:core.Input}],open:[{type:core.Input}],date:[{type:core.Input}],viewType:[{type:core.Input}],allowNull:[{type:core.Input}],selectedDate:[{type:core.Input}],min:[{type:core.Input}],isDateNull:[{type:core.Input}],max:[{type:core.Input}],hoveredDateChange:[{type:core.Output}],setDate:[{type:core.Output}]}}};RangeCalendarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-range-calendar",template:'@if (\n  {\n    currentMonth: currentMonth | async,\n    currentYear: currentYear | async,\n    selectedPicker: selectedPicker | async,\n    minMax: minMax | async,\n  };\n  as data\n) {\n  <div class="datepicker-content overflow-y-auto">\n    @if (data.selectedPicker === \'day\') {\n      <div class="row" (wheel)="scrollMonth($event, data.currentMonth, data.currentYear)">\n        <div class="padding-h-3 padding-v-2">\n          <div class="row align-center justify-content-between">\n            <teta-button\n              [ngClass]="{\n                \'datepicker-arrow_hidden\': !isLastDaySuitable(data.currentMonth - 1, data.currentYear, min),\n              }"\n              [class]="\'change-month-button datepicker_\' + viewType"\n              [square]="true"\n              (click)="changeMonth(data.currentMonth - 1, data.currentYear)"\n              palette="text"\n              view="ghost"\n            >\n              <teta-icon name="arrowLeftKey" [palette]="\'text\'"></teta-icon>\n            </teta-button>\n            <div class="row gap-4 font-button-2 align-center padding-left-1">\n              <p>{{ getMothName(data.currentMonth) }}</p>\n              <button\n                [class]="\'datepicker_\' + viewType"\n                teta-button\n                view="ghost"\n                palette="text"\n                (click)="selectPicker(\'year\')"\n              >\n                {{ data.currentYear }}\n              </button>\n            </div>\n            <teta-button\n              [square]="true"\n              [class]="\'change-month-button datepicker-arrow_hidden datepicker_\' + viewType"\n              palette="text"\n              view="ghost"\n            >\n              <teta-icon name="arrowRightKey" [palette]="\'text\'"></teta-icon>\n            </teta-button>\n          </div>\n          <div>\n            <teta-day-picker\n              [(hoveredDate)]="hoveredDate"\n              [range]="getFromTo()"\n              [viewType]="viewType"\n              (selectDate)="selectDate($event)"\n              [locale]="locale"\n              [calendar]="calendar.currentMonth"\n            ></teta-day-picker>\n          </div>\n        </div>\n        @if (getAvailableMonthYear(data.currentMonth + 1, data.currentYear); as availableMonthYear) {\n          <div class="padding-h-3 padding-v-2">\n            <div class="row align-center justify-content-between">\n              <teta-button\n                [square]="true"\n                [class]="\'change-month-button datepicker-arrow_hidden datepicker_\' + viewType"\n                palette="text"\n                view="ghost"\n              >\n                <teta-icon name="arrowLeftKey" [palette]="\'text\'"></teta-icon>\n              </teta-button>\n              <div class="row gap-4 font-button-2 align-center padding-left-1">\n                <p>{{ getMothName(availableMonthYear.availableMonth) }}</p>\n                <button\n                  [class]="\'datepicker_\' + viewType"\n                  teta-button\n                  view="ghost"\n                  palette="text"\n                  (click)="selectPicker(\'year\')"\n                >\n                  {{ availableMonthYear.availableYear }}\n                </button>\n              </div>\n              <teta-button\n                [square]="true"\n                [ngClass]="{\n                  \'datepicker-arrow_hidden\': !isFirstDaySuitable(data.currentMonth + 2, data.currentYear, max),\n                }"\n                [class]="\'change-month-button datepicker_\' + viewType"\n                (click)="changeMonth(data.currentMonth + 1, data.currentYear)"\n                palette="text"\n                view="ghost"\n              >\n                <teta-icon name="arrowRightKey" [palette]="\'text\'"></teta-icon>\n              </teta-button>\n            </div>\n            <div>\n              <teta-day-picker\n                [(hoveredDate)]="hoveredDate"\n                [range]="getFromTo()"\n                [viewType]="viewType"\n                (selectDate)="selectDate($event)"\n                [locale]="locale"\n                [calendar]="calendar.nextMonth"\n              ></teta-day-picker>\n            </div>\n          </div>\n        }\n      </div>\n    }\n    @if (data.selectedPicker === \'month\') {\n      <teta-month-picker\n        [localeMoths]="locale.months"\n        [currentYear]="data.currentYear"\n        (changeYear)="setYear($event)"\n        [selectedMonth]="data.currentMonth"\n        [viewType]="viewType"\n        (selectMonth)="selectMonth($event)"\n      ></teta-month-picker>\n    }\n    @if (data.selectedPicker === \'year\') {\n      <teta-year-picker\n        [minMax]="data.minMax"\n        [locale]="locale"\n        [viewType]="viewType"\n        (selectYear)="selectYear($event)"\n        [selectedYear]="data.currentYear"\n      ></teta-year-picker>\n    }\n  </div>\n}\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[button_component.Q,common.NgClass,icon_component.R,day_picker_component.Y,month_picker_component.U,year_picker_component.N,common.AsyncPipe],styles:[range_calendar_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],RangeCalendarComponent);var dropdown_content_directive=__webpack_require__("./projects/components/src/component/dropdown/dropdown-content.directive.ts"),input_component=__webpack_require__("./projects/components/src/component/input/input/input.component.ts"),dropdown_head_directive=__webpack_require__("./projects/components/src/component/dropdown/dropdown-head.directive.ts"),dropdown_component=__webpack_require__("./projects/components/src/component/dropdown/dropdown/dropdown.component.ts");const DATE_Range_CONTROL_VALUE_ACCESSOR={provide:fesm2022_forms.kq,useExisting:(0,core.forwardRef)((()=>DateRangeComponent)),multi:!0};let DateRangeComponent=class DateRangeComponent extends base_picker.i{constructor(_cdr,_elementRef,datePipe,localeService){super(_elementRef,_cdr,datePipe),this._cdr=_cdr,this._elementRef=_elementRef,this.datePipe=datePipe,this.localeService=localeService,this.date={from:null,to:null},this.showTime=!1,this.minDate=null,this.maxDate=null,this.invalid=!1,this.disabled=!1,this.align=align_enum.W.left,this.verticalAlign=vertical_align_enum.G.auto,this.viewType="rounded",this.allowNull=!0,this.selectDate=new core.EventEmitter,this.mask="",this.selectedDate=new ReplaySubject.m(1),this.classDaterange=!0,this.locale=this.localeService.locale}changeSelectedDate(date,selectedDate){if(selectedDate.from){const from=new Date(Math.min(new Date(selectedDate.from).getTime(),date.getTime())),to=new Date(Math.max(new Date(selectedDate.from).getTime(),date.getTime()));this.setDate({from,to}),this.selectedDate.next({from:null,to:null}),this.open=!1,this._cdr.detectChanges()}else this.setDate({from:date,to:null}),this.selectedDate.next({from:date,to:null})}checkNull(){return this.allowNull?null:this.datePipe.transform(new Date,"dd.MM.yyyy")+" - "+this.datePipe.transform(new Date,"dd.MM.yyyy")}prepareInput(){var _this=this;return(0,asyncToGenerator.A)((function*(){const config=yield(0,lastValueFrom.s)(_this.localeService.locale.pipe((0,take.s)(1)));let str=_this.getLocaleString(_this.date.from)+" - "+_this.getLocaleString(_this.date.to);_this.date?.from||(str=_this.allowNull?"":_this.getLocaleString(new Date)+" - "+_this.getLocaleString(new Date));const option={mode:"dd/mm/yyyy",separator:"."};_this.mask=config.dateRangeMask,_this.minDate&&(option.min=dayjs_min_default()(new Date(_this.minDate)).startOf("day")),_this.maxDate&&(option.max=dayjs_min_default()(new Date(_this.maxDate)).endOf("day")),_this.maskitoOptions=(0,index_esm.DX)(option),_this.changePlaceholder(str)}))()}onBlur(){if(this.allowNull&&""===this.inputText.trim())this.setDate({from:null,to:null}),this.selectedDate.next({from:null,to:null}),this.emitValue({from:null,to:null});else{const val=this.inputText.replace("–","-").split("-"),from=this.getDateFromStr(val[0].trim()),to=this.getDateFromStr(val[1]?.trim());if(to.day&&to.year&&to.month){let fromDate=this.getAvailableDate(this.minDate,this.maxDate,new Date(from.year,from.month-1,from.day)),toDate=this.getAvailableDate(this.minDate,this.maxDate,new Date(to.year,to.month-1,to.day));fromDate.getTime()>toDate.getTime()&&([fromDate,toDate]=[toDate,fromDate]),this.setDate({from:fromDate,to:toDate}),this.emitValue({from:fromDate,to:toDate}),this.selectedDate.next({from:null,to:null}),toDate&&fromDate&&(this.open=!1)}else this.setDate(this.date),this.selectedDate.next({from:null,to:null})}}setDate(range){if(range?.from||range?.to||!this.allowNull){const from=this.getLocaleString(range.from),to=range.from&&!range.to?"":this.getLocaleString(range.to);this.inputText=from+" - "+to,this.changePlaceholder(from+" - "+to)}else this.inputText="",this.changePlaceholder(""),this.selectedDate.next({from:range?.from||null,to:range?.to||null})}writeValue(obj){obj?.from?(this.date={from:new Date(obj.from),to:new Date(obj.to)},this.setDate({from:new Date(obj.from),to:new Date(obj.to)})):this.date={from:null,to:null},this.selectedDate.next({from:null,to:null})}isValueChange(value){return!(new Date(value.from).getTime()===new Date(this.date.from).getTime()&&new Date(value.to).getTime()===new Date(this.date.to).getTime())}registerOnChange(fn){this.onChange=fn}registerOnTouched(fn){}ngOnInit(){this.date?.from?this.setDate({from:this.allowNull?null:new Date(this.date?.from),to:this.allowNull?null:new Date(this.date?.to)}):this.setDate({from:this.allowNull?null:new Date,to:this.allowNull?null:new Date}),this.selectedDate.next({from:null,to:null}),this.prepareInput()}onChange(date){}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef},{type:core.ElementRef},{type:common.DatePipe},{type:teta_config_service.C}]}static{this.propDecorators={date:[{type:core.Input}],showTime:[{type:core.Input}],minDate:[{type:core.Input}],maxDate:[{type:core.Input}],invalid:[{type:core.Input}],disabled:[{type:core.Input}],align:[{type:core.Input}],verticalAlign:[{type:core.Input}],viewType:[{type:core.Input}],appendToBody:[{type:core.Input}],backdrop:[{type:core.Input}],allowNull:[{type:core.Input}],input:[{type:core.ViewChild,args:["input"]}],selectDate:[{type:core.Output}],classDaterange:[{type:core.HostBinding,args:["class.daterange"]}]}}};DateRangeComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"teta-date-range",template:'@if ({ selectedDate: selectedDate | async }; as data) {\n  <teta-dropdown\n    [appendToBody]="appendToBody"\n    [backdrop]="backdrop"\n    class="row row_auto"\n    [(open)]="open"\n    (openChange)="openChange($event)"\n    [viewType]="viewType"\n    [disabled]="disabled"\n    [verticalAlign]="verticalAlign"\n    [align]="align"\n    [autoCloseIgnore]="[\'esc\', \'inside\', \'enter\']"\n  >\n    <div\n      tetaDropdownHead\n      [class]="\'datepicker-head font-body-3 gap-8 datepicker_\' + viewType"\n      [ngClass]="{ \'datepicker-head_invalid\': invalid, \'datepicker-head_disabled\': disabled }"\n    >\n      <teta-input class="row row_auto flex">\n        <div [class]="\'row_auto row datepicker_\' + viewType">\n          <div class="row row_auto position-relative font-body-3 align-center">\n            <input\n              [ngClass]="{ \'color-text-90\': !disabled }"\n              [disabled]="disabled"\n              #input\n              style="z-index: 1"\n              class="border-0 color-text-90"\n              (keydown)="checkEnter($event)"\n              [(ngModel)]="inputText"\n              (ngModelChange)="changeInput($event)"\n              [maskito]="maskitoOptions"\n            />\n            @if (data.selectedDate || allowNull) {\n              <div\n                (click)="input.focus()"\n                class="position-absolute color-text-10"\n                style="cursor: text; user-select: none"\n              >\n                {{ placeholder }}\n              </div>\n            }\n          </div>\n          <teta-icon [name]="\'calendar\'" [palette]="\'text\'"></teta-icon>\n        </div>\n      </teta-input>\n    </div>\n    <div tetaDropdownContent class="scrollable" (click)="$event.preventDefault()">\n      @if (open) {\n        <div class="row">\n          <teta-range-calendar\n            [isDateNull]="date === null || (date?.from === null && date?.to === null)"\n            [open]="open"\n            [max]="maxDate"\n            [allowNull]="allowNull"\n            [min]="minDate"\n            (setDate)="changeSelectedDate($event, data.selectedDate)"\n            [selectedDate]="data.selectedDate"\n            [date]="date"\n            [viewType]="viewType"\n            [locale]="locale | async"\n          ></teta-range-calendar>\n        </div>\n      }\n    </div>\n  </teta-dropdown>\n}\n',providers:[DATE_Range_CONTROL_VALUE_ACCESSOR,common.DatePipe],changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[dropdown_component.P,dropdown_head_directive.z,common.NgClass,input_component.S,fesm2022_forms.YN,maskito_angular.rt,icon_component.R,dropdown_content_directive.K,RangeCalendarComponent,common.AsyncPipe],styles:[date_range_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef,core.ElementRef,common.DatePipe,teta_config_service.C])],DateRangeComponent);var icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts");const date_range_stories={title:"Component/Date_Range",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)()]})],argTypes:{minDate:{control:{type:"date"}},maxDate:{control:{type:"date"}},viewType:{options:["rounded","brick","circle"],control:{type:"select"}},allowNull:{control:{type:"boolean"}}},args:{viewType:"rounded",minDate:new Date((new Date).getFullYear()-3,(new Date).getMonth(),(new Date).getDate()),maxDate:new Date((new Date).getFullYear()+3,(new Date).getMonth(),(new Date).getDate()),allowNull:!0},component:DateRangeComponent,moduleMetadata:{imports:[fesm2022_forms.YN,maskito_angular.rt]}},baseDateRange=args=>({moduleMetadata:{imports:[fesm2022_forms.YN,maskito_angular.rt,DateRangeComponent,icon_sprite_directive._]},props:{...args,data:{from:new Date,to:new Date}},template:'<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>'}),disabledDateRange=args=>({moduleMetadata:{imports:[fesm2022_forms.YN,maskito_angular.rt,DateRangeComponent,icon_sprite_directive._]},props:{...args,data:{from:new Date,to:new Date}},template:'<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range [disabled]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>'}),invalidDateRange=args=>({moduleMetadata:{imports:[fesm2022_forms.YN,maskito_angular.rt,DateRangeComponent,icon_sprite_directive._]},props:{...args,data:{from:new Date,to:new Date}},template:'<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range  [invalid]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>'}),__namedExportsOrder=["baseDateRange","disabledDateRange","invalidDateRange"];baseDateRange.parameters={...baseDateRange.parameters,docs:{...baseDateRange.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    data: {\n      from: new Date(),\n      to: new Date()\n    }\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`\n})',...baseDateRange.parameters?.docs?.source}}},disabledDateRange.parameters={...disabledDateRange.parameters,docs:{...disabledDateRange.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    data: {\n      from: new Date(),\n      to: new Date()\n    }\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range [disabled]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`\n})',...disabledDateRange.parameters?.docs?.source}}},invalidDateRange.parameters={...invalidDateRange.parameters,docs:{...invalidDateRange.parameters?.docs,source:{originalSource:'args => ({\n  moduleMetadata: {\n    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective]\n  },\n  props: {\n    ...args,\n    data: {\n      from: new Date(),\n      to: new Date()\n    }\n  },\n  template: `<div [tetaIconSprite]="\'assets/icons.svg\'"><teta-date-range  [invalid]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`\n})',...invalidDateRange.parameters?.docs?.source}}}},"./projects/components/src/component/date-picker/date-range/date-range.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/components/src/component/date-picker/date-range/range-calendar/range-calendar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".change-month-button {\n  -webkit-user-select: none;\n          user-select: none;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);