import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyGridDemoComponent} from './property-grid-demo/property-grid-demo.component';
import {PropertyGridModule} from "../property-grid.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    exports: [
        PropertyGridDemoComponent
    ],
    imports: [
    CommonModule,
    PropertyGridModule,
    FormsModule,
    ReactiveFormsModule,
    PropertyGridDemoComponent
]
})
export class PropertyGridDemoModule {
}
