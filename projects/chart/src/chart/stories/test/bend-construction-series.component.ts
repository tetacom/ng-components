// import {Component, OnInit} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {Observable} from "rxjs";
// import {BasePoint, ChartService, SeriesBaseComponent} from "@tetacom/svg-charts";
//
//
// @Component({
//   selector: 'teta-bend-construction-series',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './bend-construction-series.component.html',
//   styleUrl: './bend-construction-series.component.css',
// })
// export class BendConstructionSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T>
//   implements OnInit {
//   x: Observable<any>;
//   y: Observable<any>;
//   casing: ConstructionPoint<WellCasingDto>[];
//   casingPart: ConstructionPoint<WellCasingDto>[];
//   casingOpenHole: ConstructionPoint<WellCasingDto>[];
//
//   nkt: ConstructionPoint<WellNktDto>[];
//   perforation: ConstructionPoint<WellPerforationDto>[];
//   bottom: ConstructionPoint<WellCasingDto>[];
//   packers: ConstructionPoint<WellPackerDto>[];
//   openHolePath: Observable<string>;
//   maxCasing: number;
//   wellColumnType = WellColumnType;
//   Math = Math;
//
//   constructor(
//     protected override svc: ChartService,
//     protected override cdr: ChangeDetectorRef,
//     protected override scaleService: ScaleService,
//     protected override zoomService: ZoomService,
//     protected override element: ElementRef
//   ) {
//     super(svc, cdr, scaleService, zoomService, element);
//   }
//
//   override ngOnInit(): void {
//     this.x = this.scaleService.scales.pipe(
//       map(_ => _.x.get(this.series.xAxisIndex).scale)
//     );
//     this.y = this.scaleService.scales.pipe(
//       map(_ => _.y.get(this.series.yAxisIndex).scale)
//     );
//
//     const seriesData: ReadonlyArray<ConstructionPoint<ConstructionItem>> =
//       this.series.data;
//
//     const isNkt = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellNktDto> => {
//       return obj.meta instanceof WellNktDto;
//     };
//
//     const isCasing = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellCasingDto> => {
//       return (
//         obj.meta instanceof WellCasingDto &&
//         obj.meta.type === WellColumnType.casing
//       );
//     };
//
//     const isCasingPart = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellCasingDto> => {
//       return (
//         obj.meta instanceof WellCasingDto &&
//         (obj.meta.type === WellColumnType.openHole ||
//           obj.meta.type === WellColumnType.productionLiner ||
//           obj.meta.type === WellColumnType.tightSpot)
//       );
//     };
//
//     const isOpenHole = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellCasingDto> => {
//       return (
//         obj.meta instanceof WellCasingDto &&
//         obj.meta.type === WellColumnType.openHole
//       );
//     };
//
//     const isPerforation = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellPerforationDto> => {
//       return obj.meta instanceof WellPerforationDto;
//     };
//
//     const isBottom = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellCasingDto> => {
//       return (
//         obj.meta instanceof WellCasingDto &&
//         obj.meta.type === WellColumnType.bottom
//       );
//     };
//
//     const isPacker = (
//       obj: ConstructionPoint<ConstructionItem>
//     ): obj is ConstructionPoint<WellPackerDto> => {
//       return obj.meta instanceof WellPackerDto;
//     };
//
//     this.casing = seriesData
//       .filter(isCasing)
//       .sort((a, b) => b.meta.intervalTopMd - a.meta.intervalTopMd);
//
//     this.casingPart = seriesData
//       .filter(isCasingPart)
//       .sort((a, b) => a.meta.columnOuterDiameter - b.meta.columnOuterDiameter);
//     this.maxCasing = d3.max(
//       this.casing ?? [],
//       (_: ConstructionPoint<WellCasingDto>) => _.meta.columnOuterDiameter
//     );
//     this.nkt = seriesData.filter(isNkt);
//     this.perforation = seriesData.filter(isPerforation);
//     this.bottom = seriesData.filter(isBottom);
//     this.packers = seriesData.filter(isPacker);
//     this.casingOpenHole = seriesData.filter(isOpenHole);
//
//     this.openHolePath = combineLatest([this.x, this.y]).pipe(
//       map((data: [any, any]) => {
//         const [x, y] = data;
//
//         const openHolePoints = [];
//         const openHoleLength = Math.abs(
//           this.casingOpenHole[0].y - this.casingOpenHole[0].y1
//         );
//         const openHoleStep =
//           openHoleLength > 100 ? 15 : Math.ceil(openHoleLength / 5);
//         d3.range(
//           this.casingOpenHole[0].y,
//           this.casingOpenHole[0].y1,
//           openHoleStep
//         ).forEach((depth, idx) => {
//           if (depth > this.casingOpenHole[0].y1) {
//             openHolePoints.push([]);
//             return;
//           }
//
//           if (idx % 2 === 0) {
//             openHolePoints.push([x(this.casingOpenHole[0].x), y(depth)]);
//           } else {
//             openHolePoints.push([x(this.casingOpenHole[0].x) - 12, y(depth)]);
//           }
//         });
//
//         openHolePoints.push([
//           openHolePoints[openHolePoints.length - 1][0],
//           y(this.casingOpenHole[0].y1),
//         ]);
//         openHolePoints.push([x(0), y(this.casingOpenHole[0].y1)]);
//
//         openHolePoints.push([
//           x(-this.casingOpenHole[0].x) + 12,
//           y(this.casingOpenHole[0].y1),
//         ]);
//
//         d3.range(
//           this.casingOpenHole[0].y,
//           this.casingOpenHole[0].y1,
//           openHoleStep
//         )
//           .sort((a, b) => b - a)
//           .forEach((depth, idx) => {
//             if (idx % 2 === 0) {
//               openHolePoints.push([
//                 x(-this.casingOpenHole[0].x) + 12,
//                 y(depth),
//               ]);
//             } else {
//               openHolePoints.push([x(-this.casingOpenHole[0].x), y(depth)]);
//             }
//           });
//         const line = d3.line().curve(d3.curveBumpY);
//         return line(openHolePoints);
//       })
//     );
//   }
// }
