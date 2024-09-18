(self.webpackChunk_ng_components_source=self.webpackChunk_ng_components_source||[]).push([[6451],{"./projects/chart/src/chart/stories/Chart.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,bandChart:()=>bandChart,basicChart:()=>basicChart,default:()=>Chart_stories,draggableChart:()=>draggableChart});var chart_component=__webpack_require__("./projects/chart/src/chart/chart/chart.component.ts");const src_int=function sourceRandomInt(source){function randomInt(min,max){return arguments.length<2&&(max=min,min=0),min=Math.floor(min),max=Math.floor(max)-min,function(){return Math.floor(source()*max+min)}}return randomInt.source=sourceRandomInt,randomInt}(Math.random),cssColorNames=["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];var series_type=__webpack_require__("./projects/chart/src/chart/model/enum/series-type.ts"),fill_type=__webpack_require__("./projects/chart/src/chart/model/enum/fill-type.ts"),tooltip_tracking=__webpack_require__("./projects/chart/src/chart/model/enum/tooltip-tracking.ts"),chart_bounds=__webpack_require__("./projects/chart/src/chart/model/chart-bounds.ts"),brush_type=__webpack_require__("./projects/chart/src/chart/model/enum/brush-type.ts"),zoom_type=__webpack_require__("./projects/chart/src/chart/model/enum/zoom-type.ts"),faker=__webpack_require__("./node_modules/faker/index.js"),drag_point_type=__webpack_require__("./projects/chart/src/chart/model/enum/drag-point-type.ts"),zoom_behavior_type=__webpack_require__("./projects/chart/src/chart/model/enum/zoom-behavior-type.ts"),scale_type=__webpack_require__("./projects/chart/src/chart/model/enum/scale-type.ts"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var bandseries_componentngResource=__webpack_require__("./projects/chart/src/chart/stories/bandseries/bandseries.component.scss?ngResource"),bandseries_componentngResource_default=__webpack_require__.n(bandseries_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),series_base_component=__webpack_require__("./projects/chart/src/chart/base/series-base.component.ts"),chart_service=__webpack_require__("./projects/chart/src/chart/service/chart.service.ts"),scale_service=__webpack_require__("./projects/chart/src/chart/service/scale.service.ts"),zoom_service=__webpack_require__("./projects/chart/src/chart/service/zoom.service.ts"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let BandseriesComponent=class BandseriesComponent extends series_base_component.c{constructor(svc,cdr,scaleService,zoomService,element){super(svc,cdr,scaleService,zoomService,element),this.svc=svc,this.cdr=cdr,this.scaleService=scaleService,this.zoomService=zoomService,this.element=element}ngOnInit(){this.x=this.scaleService.scales.pipe((0,map.T)((_=>_.x.get(this.series.xAxisIndex)?.scale))),this.y=this.scaleService.scales.pipe((0,map.T)((_=>_.y.get(this.series.yAxisIndex)?.scale)))}static#_=this.ctorParameters=()=>[{type:chart_service.u},{type:core.ChangeDetectorRef},{type:scale_service.e},{type:zoom_service.T},{type:core.ElementRef}]};BandseriesComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"svg:svg[teta-bandseries]",template:'@if ({x: x | async, y: y | async}; as scales) { @for (band of _series.data; track band) {\n<svg:rect\n  [attr.x]="scales.x(band.x)"\n  [attr.y]="scales.y(band.y) - scales.y.bandwidth() / 2"\n  [attr.width]="scales.x(band.x1) - scales.x(band.x)"\n  fill="red"\n  [attr.height]="scales.y.bandwidth()"\n></svg:rect>\n<svg:text\n  text-anchor="middle"\n  dominant-baseline="middle"\n  class="label font-caption fill-text-90"\n  [attr.x]="scales.x(band.x) + (scales.x(band.x1) - scales.x(band.x)) / 2"\n  [attr.y]="scales.y(band.y)"\n>\n  {{ band.y }}\n</svg:text>\n} }\n',standalone:!0,imports:[common.AsyncPipe],styles:[bandseries_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[chart_service.u,core.ChangeDetectorRef,scale_service.e,zoom_service.T,core.ElementRef])],BandseriesComponent);const randomColor=src_int(0,cssColorNames.length-1),seriesType=[series_type.O.line,series_type.O.line];faker.locale="ru";const createSeries=size=>seriesType.map(((type,index)=>({id:index,type,name:faker.address.cityName(),yAxisIndex:0,xAxisIndex:0,color:cssColorNames[randomColor()].toLowerCase(),fillType:fill_type.k.gradient,data:Array.from(Array(size).keys()).map(((key,index,arr)=>{const num=faker.datatype.number({min:0,max:6e3}),iconId=faker.datatype.number({min:1,max:14});return{x:num,y:type===series_type.O.block?0:faker.datatype.number({min:0,max:200}),iconId:`icon${iconId}`,text:faker.commerce.productMaterial()}})).sort(((a,b)=>a.x-b.x)).map(((_,index,arr)=>({..._,x:arr[index-1]?.x,x1:_.x})))}))),createDragSeries=size=>({id:"index",type:series_type.O.line,name:faker.address.cityName(),yAxisIndex:0,xAxisIndex:0,color:cssColorNames[randomColor()].toLowerCase(),fillType:fill_type.k.gradient,data:Array.from(Array(size).keys()).map(((key,index,arr)=>({x:index,y:faker.datatype.number({min:0,max:200}),marker:index%33==0?{draggable:!0,dragType:drag_point_type.D.xy,style:{strokeWidth:10,fill:"red"},label:{draggable:!1,text:"index"}}:null})))}),createBandSeries=size=>({id:"index",type:series_type.O.line,name:faker.address.cityName(),yAxisIndex:0,xAxisIndex:0,component:BandseriesComponent,color:cssColorNames[randomColor()].toLowerCase(),data:Array.from(Array(size).keys()).map(((key,index,arr)=>{const x=faker.date.between("2022-09-25T00:00:00.000Z","2022-10-10T00:00:00.000Z"),point={x,x1:new Date(x.getTime()+faker.datatype.number({min:864e4,max:10964e4})),y:faker.address.cityName()};return console.log(point),point}))}),createChart=(size,inverted=!0)=>({name:"123123123132",inverted,tooltip:{tracking:tooltip_tracking.V.y},bounds:new chart_bounds.C({}),xAxis:[{min:0,max:5e3,visible:!0,inverted:!1,niceTicks:!1,plotLines:[{value:1e3,draggable:!0}]}],yAxis:[{visible:!0}],brush:{type:brush_type.p.y},zoom:{enable:!0,type:zoom_type.C.y,syncChannel:"channelA",zoomBehavior:zoom_behavior_type.u.wheel,min:100,max:5e3,minTranslate:0,maxTranslate:7e3},legend:{enable:!1},series:createSeries(size)});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),icon_sprite_directive=__webpack_require__("./projects/components/src/component/icon/icon-sprite.directive.ts"),button_component=__webpack_require__("./projects/components/src/component/button/button/button.component.ts");const Chart_stories={title:"Component/Chart",decorators:[(0,dist.applicationConfig)({providers:[(0,http.$R)()]})],component:chart_component.Q,moduleMetadata:{imports:[chart_component.Q]}},basicChart=()=>({moduleMetadata:{imports:[chart_component.Q,icon_sprite_directive._,button_component.Q]},props:{config:createChart(200),createChart,setZoom:function(chart){console.log(chart),chart.scaleService.resetZoom()}},template:'\n\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="config=createChart(500);">\n          Create new Data\n        </button>\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="config=createChart(0); config2=createChart(0)">\n          Create empty data\n          config </button>\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="setZoom(chart)">Set zoom</button>\n\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart #chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n\n        </div>\n\n      </div>\n\n'}),draggableChart=()=>{return{moduleMetadata:{imports:[chart_component.Q,icon_sprite_directive._,button_component.Q]},props:{config:(size=400,{name:"123123123132",inverted:!0,tooltip:{tracking:tooltip_tracking.V.y},bounds:new chart_bounds.C({}),xAxis:[{niceTicks:!1}],yAxis:[{}],zoom:{enable:!0,type:zoom_type.C.y},legend:{enable:!1},series:[createDragSeries(size)]})},template:'\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n        </div>\n      </div>'};var size},bandChart=()=>{return{moduleMetadata:{imports:[chart_component.Q,icon_sprite_directive._]},props:{config:(size=50,{name:"Band Chart",tooltip:{tracking:tooltip_tracking.V.y},bounds:new chart_bounds.C({top:30}),xAxis:[{niceTicks:!1,opposite:!0,min:new Date("2022-09-25").getTime(),max:new Date("2022-09-30").getTime(),scaleType:{type:scale_type.b.time}}],yAxis:[{visible:!0,scaleType:{type:scale_type.b.band}}],zoom:{enable:!0,type:zoom_type.C.x},legend:{enable:!1},series:[createBandSeries(size)]})},template:'\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n        </div>\n      </div>'};var size},__namedExportsOrder=["basicChart","draggableChart","bandChart"];basicChart.parameters={...basicChart.parameters,docs:{...basicChart.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [ChartComponent, IconSpriteDirective, ButtonComponent]\n  },\n  props: {\n    config: createChart(200),\n    createChart: createChart,\n    setZoom: function (chart) {\n      console.log(chart);\n      chart.scaleService.resetZoom();\n    }\n  },\n  template: `\n\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="config=createChart(500);">\n          Create new Data\n        </button>\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="config=createChart(0); config2=createChart(0)">\n          Create empty data\n          config </button>\n        <button teta-button\n          [palette]="\'primary\'"\n          (click)="setZoom(chart)">Set zoom</button>\n\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart #chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n\n        </div>\n\n      </div>\n\n`\n})',...basicChart.parameters?.docs?.source}}},draggableChart.parameters={...draggableChart.parameters,docs:{...draggableChart.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [ChartComponent, IconSpriteDirective, ButtonComponent]\n  },\n  props: {\n    config: createDragChart(400)\n  },\n  template: `\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n        </div>\n      </div>`\n})',...draggableChart.parameters?.docs?.source}}},bandChart.parameters={...bandChart.parameters,docs:{...bandChart.parameters?.docs,source:{originalSource:'() => ({\n  moduleMetadata: {\n    imports: [ChartComponent, IconSpriteDirective]\n  },\n  props: {\n    config: createBandChart(50)\n  },\n  template: `\n      <div [tetaIconSprite]="[\'assets/icons.svg\', \'assets/lithotype-icons.svg\']"\n            class="font-body-3 padding-3 bg-global-bgmain"\n            style="width: 100%; height: 100vh">\n        <div class="row row_auto gap" style="height: 100%; width: 100%">\n            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>\n        </div>\n      </div>`\n})',...bandChart.parameters?.docs?.source}}}},"./projects/chart/src/chart/stories/bandseries/bandseries.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);