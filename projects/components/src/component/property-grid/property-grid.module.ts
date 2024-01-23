import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyGridComponent} from './property-grid/property-grid.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import {PropertyGridGroupComponent} from './property-grid/property-grid-group/property-grid-group.component';
import {PropertyGridItemComponent} from './property-grid/property-grid-item/property-grid-item.component';



import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';


import {PropertyGridItemDescriptionDirective} from './property-grid/property-grid-item-description.directive';

@NgModule({
    exports: [PropertyGridComponent, PropertyGridItemDescriptionDirective],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    PropertyGridComponent,
    PropertyGridGroupComponent,
    PropertyGridItemComponent,
    PropertyGridItemDescriptionDirective,
],
    providers: [
        {
            provide: TRANSLOCO_SCOPE,
            useValue: { scope: 'errors', alias: 'errors' },
            multi: true,
        },
    ],
})
export class PropertyGridModule {
}
